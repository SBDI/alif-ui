'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Upload, Play, Pause, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useRecord } from "@/hooks/useRecord";

interface RecordContainerProps {
  folderId: string;
  activityId?: string;
}

export function RecordContainer({ folderId, activityId }: RecordContainerProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { transcription, transcribe, isLoading, error } = useRecord(folderId, activityId);

  // Mock recording timer
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // In a real implementation, this would save the recording
      // For now, just simulate having a recording
      setAudioFile(new File([], "recording.mp3"));
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      // Start timer
      const timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      // Store timer ID to clear it later
      return () => clearInterval(timer);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleTranscribe = () => {
    if (audioFile) {
      transcribe(audioFile);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would play/pause the audio
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Record</h1>
      <p className="text-muted-foreground">
        Record and transcribe lectures or notes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Record or Upload Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-lg">
                {!audioFile ? (
                  <>
                    <Button
                      variant={isRecording ? "destructive" : "default"}
                      size="lg"
                      className="h-16 w-16 rounded-full"
                      onClick={toggleRecording}
                    >
                      {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    </Button>
                    <p className="text-sm font-medium">
                      {isRecording ? `Recording... ${formatTime(recordingTime)}` : "Click to Start Recording"}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={togglePlayback}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {audioFile.name}
                    </p>
                  </>
                )}
              </div>

              <div className="flex items-center">
                <div className="flex-1 h-px bg-border"></div>
                <p className="px-2 text-xs text-muted-foreground">OR</p>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="audio-upload"
                  className="hidden"
                  accept="audio/*"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="audio-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Upload className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">
                    Click to upload audio
                  </span>
                  <span className="text-xs text-muted-foreground">
                    MP3, WAV, or M4A (max. 50MB)
                  </span>
                </label>
              </div>

              <Button
                className="w-full"
                disabled={!audioFile || isLoading}
                onClick={handleTranscribe}
              >
                {isLoading ? "Transcribing..." : "Transcribe Audio"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transcription</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
                {error.message}
              </div>
            )}

            {transcription ? (
              <div className="space-y-4">
                <Textarea
                  className="min-h-[300px]"
                  value={transcription}
                  readOnly
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Copy</Button>
                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Save as Note
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center border rounded-lg p-4">
                <p className="text-muted-foreground">
                  {isLoading
                    ? "Transcribing your audio..."
                    : "Your transcription will appear here"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
