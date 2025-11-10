@echo off
REM yarn PATH 설정 스크립트
REM 이 스크립트를 실행하면 yarn PATH가 영구적으로 추가됩니다.

setx PATH "%PATH%;C:\Users\User\AppData\Roaming\npm"
echo.
echo yarn PATH가 영구적으로 추가되었습니다!
echo 새 터미널을 열어야 변경사항이 적용됩니다.
echo.
REM 현재 세션에도 추가
set PATH=%PATH%;C:\Users\User\AppData\Roaming\npm
echo 현재 세션에서 yarn 버전 확인:
yarn --version
echo.
echo 이제 새 터미널에서 yarn 명령어를 사용할 수 있습니다.
echo 예: yarn install, yarn start, yarn dev




