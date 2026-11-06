import sys,subprocess,numpy as np,statistics,os
from faster_whisper import WhisperModel
FF=r"C:\Users\LENOVO\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
m=WhisperModel("small",device="cpu",compute_type="int8")
show='-t' in sys.argv
for p in [x for x in sys.argv[1:] if x!='-t']:
    raw=subprocess.run([FF,"-v","quiet","-i",p,"-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout
    a=np.frombuffer(raw,dtype=np.int16).astype(np.float32)/32768.0
    segs,_=m.transcribe(a,language="ar",word_timestamps=True,vad_filter=False)
    segs=list(segs); w=[x for s in segs for x in s.words]
    span=w[-1].end-w[0].start
    gaps=[b.start-a_.end for a_,b in zip(w,w[1:]) if b.start-a_.end>0.25]
    print(f"{os.path.basename(p):28} dur {len(a)/16000:5.2f} span {span:5.2f} words {len(w):3d} WPM {len(w)/span*60:4.0f} pauses {len(gaps):2d} avg {statistics.mean(gaps) if gaps else 0:.2f}")
    if show: print("   "," ".join(s.text.strip() for s in segs))
