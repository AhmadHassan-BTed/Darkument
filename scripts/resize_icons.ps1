# PowerShell Script to resize extension icons using System.Drawing
Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param (
        [string]$SourcePath,
        [string]$DestinationPath,
        [int]$Width,
        [int]$Height
    )

    try {
        $srcBitmap = New-Object System.Drawing.Bitmap($SourcePath)
        $destBitmap = New-Object System.Drawing.Bitmap($Width, $Height)
        $graphic = [System.Drawing.Graphics]::FromImage($destBitmap)

        # Set high quality resizing parameters
        $graphic.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphic.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphic.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphic.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        # Draw the image
        $graphic.DrawImage($srcBitmap, 0, 0, $Width, $Height)

        # Save the new bitmap
        $destBitmap.Save($DestinationPath, [System.Drawing.Imaging.ImageFormat]::Png)

        # Clean up resources
        $graphic.Dispose()
        $destBitmap.Dispose()
        $srcBitmap.Dispose()
        Write-Host "Resized $SourcePath -> $DestinationPath ($Width x $Height)"
    } catch {
        Write-Error "Failed to resize image $SourcePath : $_"
    }
}

# Source images
$icons = @(
    @{ Name = "icon"; Src = "src/icons/icon.png" },
    @{ Name = "icon1"; Src = "src/icons/icon1.png" },
    @{ Name = "icon2"; Src = "src/icons/icon2.png" }
)

# Standard sizes
$sizes = @(16, 32, 48, 128)

foreach ($icon in $icons) {
    if (Test-Path $icon.Src) {
        foreach ($size in $sizes) {
            $destName = "src/icons/$($icon.Name)_$size.png"
            Resize-Image -SourcePath $icon.Src -DestinationPath $destName -Width $size -Height $size
        }
    } else {
        Write-Warning "Source file not found: $($icon.Src)"
    }
}
