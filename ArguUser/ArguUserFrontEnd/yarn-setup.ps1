# yarn PATH 설정 스크립트 (PowerShell)
# 이 스크립트를 실행하면 yarn PATH가 영구적으로 추가됩니다.

$yarnPath = "C:\Users\User\AppData\Roaming\npm"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")

if ($currentPath -notlike "*$yarnPath*") {
    $newPath = $currentPath + ";$yarnPath"
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "yarn PATH가 영구적으로 추가되었습니다!" -ForegroundColor Green
    Write-Host "새 터미널을 열어야 변경사항이 적용됩니다." -ForegroundColor Yellow
} else {
    Write-Host "yarn PATH가 이미 설정되어 있습니다." -ForegroundColor Yellow
}

# 현재 세션에도 추가
$env:PATH += ";$yarnPath"

Write-Host ""
Write-Host "yarn 버전 확인:" -ForegroundColor Cyan
try {
    yarn --version
    Write-Host ""
    Write-Host "이제 yarn 명령어를 사용할 수 있습니다!" -ForegroundColor Green
    Write-Host "예: yarn install, yarn start, yarn dev" -ForegroundColor Cyan
} catch {
    Write-Host "새 터미널을 열어야 yarn이 인식됩니다." -ForegroundColor Yellow
}




