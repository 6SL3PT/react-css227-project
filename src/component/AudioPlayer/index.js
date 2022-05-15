import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded'
import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded'
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'

import { setCurrentTrack } from '../../redux/player/playerSlice'
import useClickOutside from '../useClickOutside'
import FavoriteButton from '../FavoriteButton'
import AddTrackToPlaylist from '../AddTrackToPlaylist'
import style from './style.module.css'

const AudioPlayer = () => {
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState('')
    const [maxTime, setMaxTime] = useState('')
    const [volume, setVolume] = useState(60)
    const [queueAddress, setQueueAddress] = useState(0)
    const [volumeBarActive, setVolumeBarActive] = useState(false)
    const [isHoverProgress, setIsHoverProgress] = useState(false)
    const [isHoverVolume, setIsHoverVolume] = useState(false)
    const { userData } = useSelector((state) => state.user)
    const { currentTrack, queue } = useSelector((state) => state.player)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const audioRef = useRef()
    const intervalRef = useRef()

    const startTimer = () => {
        clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            if (audioRef.current) {
                if (audioRef && audioRef.current.ended) {
                    if (queue && queueAddress < queue.length - 1) {
                        setQueueAddress(queueAddress + 1)
                    } else {
                        setProgress(0)
                        dispatch(setCurrentTrack({ ...currentTrack, action: 'pause' }))
                    }
                } else if (audioRef) {
                    setProgress(audioRef.current.currentTime)
                    audioRef.current.duration && setDuration(audioRef.current.duration)
                } else {
                    setProgress(0)
                    setQueueAddress(0)
                }
            }
        }, [1000])
    }

    const formatTime = (time) => {
        const minute = Math.floor(time / 60)
        const second = Math.floor(time - minute * 60)
        const formattedSecond = ('0' + second).slice(-2)
        return `${minute}:${formattedSecond}`
    }

    const currentProgress = duration ? `${(progress / duration) * 100}%` : '0%'
    const progressStyle = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentProgress}, ${
        isHoverProgress ? '#ff8c00' : '#fff'
    }), color-stop(${currentProgress}, #777))`
    const volumeStyle = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${volume}%,  ${
        isHoverVolume ? '#ff8c00' : '#fff'
    }), color-stop(${volume}%, #777))`

    useEffect(() => {
        currentTrack.action === 'play' ? audioRef.current.play() : audioRef.current.pause()
    }, [currentTrack])

    useEffect(() => {
        audioRef.current && (audioRef.current.volume = volume / 100)
    }, [volume])

    useEffect(() => {
        currentTrack.action &&
            currentTrack.action === 'play' &&
            (startTimer(), setMaxTime(formatTime(duration)))
        progress !== 0 && setCurrentTime(formatTime(progress))
    })

    useEffect(() => {
        queue[queueAddress] && queue[queueAddress].playlist
            ? dispatch(
                  setCurrentTrack({
                      track: queue[queueAddress].track,
                      playlist: queue[queueAddress].playlist,
                      action: `${currentTrack.action ? currentTrack.action : 'play'}`,
                  }),
              )
            : dispatch(
                  setCurrentTrack({
                      track: queue[queueAddress],
                      action: `${currentTrack.action ? currentTrack.action : 'play'}`,
                  }),
              )
    }, [queue, queueAddress, dispatch])

    const handleProgressChange = (value) => {
        if (userData && userData.isPremium) {
            clearInterval(intervalRef.current)
            audioRef.current.currentTime = value
            setProgress(audioRef.current.currentTime)
        } else {
            toast.warn('This function is available for premium user only')
        }
    }

    const handlePlay = () => {
        currentTrack.action === 'play'
            ? dispatch(setCurrentTrack({ ...currentTrack, action: 'pause' }))
            : dispatch(setCurrentTrack({ ...currentTrack, action: 'play' }))
    }

    const handleForward = () => {
        if (userData && userData.isPremium) {
            if (queue && queueAddress < queue.length - 1) {
                setQueueAddress(queueAddress + 1)
            }
        } else {
            toast.warn('This function is available for premium user only')
        }
    }

    const handleBackward = () => {
        if (userData && userData.isPremium) {
            if (queue && queueAddress > 0) {
                setQueueAddress(queueAddress - 1)
            }
        } else {
            toast.warn('This function is available for premium user only')
        }
    }

    const domNode = useClickOutside(() => {
        setVolumeBarActive(false)
    })

    return (
        <div id={style.MediaPlayer}>
            <div className={style.MediaPlayer_container}>
                {currentTrack.track && (
                    <>
                        <div className={style.MediaPlayer_leftElementWrapper}>
                            <div className={style.MediaPlayer_btnWrapper}>
                                <IconButton id={style.PrevBtn} onClick={() => handleBackward()}>
                                    <SkipPreviousIcon />
                                </IconButton>
                                <IconButton id={style.PlayBtn} onClick={handlePlay}>
                                    {currentTrack.action === 'play' ? (
                                        <PauseIcon />
                                    ) : (
                                        <PlayArrowIcon />
                                    )}
                                </IconButton>
                                <IconButton id={style.NextBtn} onClick={() => handleForward()}>
                                    <SkipNextIcon />
                                </IconButton>
                            </div>
                            <div className={style.MediaPlayer_progressBarWrapper}>
                                <p id={style.CurrentTime}>{currentTime ? currentTime : '0:00'}</p>
                                <input
                                    type="range"
                                    value={progress}
                                    step="1"
                                    min="0"
                                    max={duration ? duration : 0}
                                    onChange={(e) => handleProgressChange(e.target.value)}
                                    onMouseEnter={() => setIsHoverProgress(true)}
                                    onMouseLeave={() => setIsHoverProgress(false)}
                                    style={{ background: progressStyle }}
                                    id={style.ProgressBar}
                                />
                                <p id={style.MaxTime}>{maxTime ? maxTime : '0:00'}</p>
                            </div>
                            <audio
                                src={currentTrack.track.track}
                                ref={audioRef}
                                onError={() =>
                                    toast.error('This track is not available at the moment.')
                                }
                            />
                        </div>
                        <div className={style.MediaPlayer_rightElementWrapper}>
                            <div className={style.MediaPlayer_trackWrapper}>
                                <div className={style.TrackWrapper_trackDetail}>
                                    <div className={style.TrackDetail_trackText}>
                                        <p
                                            id={style.TrackName}
                                            onClick={() =>
                                                navigate(`/track/${currentTrack.track._id}`)
                                            }
                                        >
                                            {currentTrack.track.name}
                                        </p>
                                        <p id={style.TrackArtist}>{currentTrack.track.artist}</p>
                                    </div>
                                    <img src={currentTrack.track.img} />
                                </div>
                                <div className={style.TrackWrapper_controlBtn}>
                                    <FavoriteButton trackId={currentTrack.track._id} />
                                    <AddTrackToPlaylist
                                        trackId={currentTrack.track._id}
                                        dropdownTranslate={'-45%, -85px'}
                                        fixedHeight={false}
                                    />
                                    <div className={style.TrackWrapper_verticalLine}>&nbsp;</div>
                                    <div
                                        className={style.TrackWrapper_soundControlBtnWrapper}
                                        ref={domNode}
                                    >
                                        <div
                                            id={style.VolumeBtn}
                                            onClick={() => setVolumeBarActive(!volumeBarActive)}
                                        >
                                            {volume > 66 ? (
                                                <VolumeUpRoundedIcon />
                                            ) : volume > 33 ? (
                                                <VolumeDownRoundedIcon />
                                            ) : volume != 0 ? (
                                                <VolumeMuteRoundedIcon />
                                            ) : (
                                                <VolumeOffRoundedIcon />
                                            )}
                                        </div>
                                        {volumeBarActive && (
                                            <input
                                                type="range"
                                                value={volume}
                                                step="1"
                                                min="0"
                                                max="100"
                                                onChange={(e) => setVolume(e.target.value)}
                                                onMouseEnter={() => setIsHoverVolume(true)}
                                                onMouseLeave={() => setIsHoverVolume(false)}
                                                id={style.VolumeBar}
                                                style={{ background: volumeStyle }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AudioPlayer
