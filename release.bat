@echo off
xcopy "./source" "./crypto-com-nft-rank-displayer" /e /i /y /s
for /r ./crypto-com-nft-rank-displayer/data/js %%f in (*.js) do call uglifyjs %%f -o %%f
"%ProgramFiles%\WinRAR\WinRAR.exe" a -afzip -ep1 -ibck -r -y crypto-com-nft-rank-displayer.zip crypto-com-nft-rank-displayer/*
@RD /S /Q "./crypto-com-nft-rank-displayer"
