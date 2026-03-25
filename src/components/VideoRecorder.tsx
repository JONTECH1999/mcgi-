import { useState, useRef } from 'react'
import { Video, Play, Square, Trash2, Check } from 'lucide-react'

export default function VideoRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [error, setError] = useState<string>('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  const startRecording = async () => {
    try {
      setError('')
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      })

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      chunksRef.current = []
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        setRecordedBlob(blob)

        stream.getTracks().forEach((track) => track.stop())
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to access camera')
      console.error('Camera access error:', err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const resetRecording = () => {
    setRecordedBlob(null)
    setError('')
  }

  const downloadVideo = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `video-${Date.now()}.webm`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="py-6 md:py-8 space-y-4 animate-slide-up">
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <Video className="text-red-600" size={24} />
          </div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900">Record Your Message</h2>
        </div>

        {error && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm md:text-base">
            {error}
          </div>
        )}

        {/* Video Preview */}
        <div className="mb-4 md:mb-6 bg-black rounded-xl overflow-hidden">
          {!recordedBlob ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-48 md:h-72 object-cover"
            />
          ) : (
            <video
              src={URL.createObjectURL(recordedBlob)}
              controls
              className="w-full h-48 md:h-72 object-cover"
            />
          )}
        </div>

        {/* Recording Status */}
        {isRecording && (
          <div className="mb-4 md:mb-6 flex items-center justify-center gap-2 text-red-600 font-semibold">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            Recording...
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-3">
          {!recordedBlob ? (
            <>
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 md:py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Play size={18} />
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 md:py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Square size={18} />
                  Stop Recording
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={downloadVideo}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 md:py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Check size={18} />
                Download Video
              </button>
              <button
                onClick={resetRecording}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 md:py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Trash2 size={18} />
                Record Again
              </button>
            </>
          )}
        </div>

        <p className="text-xs md:text-sm text-gray-500 text-center mt-4 md:mt-6">
          📱 Make sure to grant camera and microphone permissions
        </p>
      </div>
    </div>
  )
}
