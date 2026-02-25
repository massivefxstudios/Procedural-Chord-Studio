# create_shortcut.ps1
# Bu script masaustune ozel ikonlu bir kisayol olusturur

$Target = "d:\Music_MassiveProduct\Chord_Program\start.bat"
$IconPath = "d:\Music_MassiveProduct\Chord_Program\icon.ico"
$ShortcutPath = "d:\Music_MassiveProduct\Chord_Program\procedural-realtime.lnk"
$WorkDir = "d:\Music_MassiveProduct\Chord_Program"

$WScript = New-Object -ComObject WScript.Shell
$Shortcut = $WScript.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $Target
$Shortcut.WorkingDirectory = $WorkDir
$Shortcut.IconLocation = $IconPath
$Shortcut.Description = "procedural-realtime Chord Studio"
$Shortcut.WindowStyle = 1
$Shortcut.Save()

Write-Host ""
Write-Host "  Kisayol olusturuldu: $ShortcutPath"
Write-Host "  Artik masaustunden tek tikla acabilirsiniz!"
Write-Host ""
