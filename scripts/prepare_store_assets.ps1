# PowerShell script to prepare Web Store compliant assets
Add-Type -AssemblyName System.Drawing

function Convert-To-24bppPng {
    param (
        [string]$SourcePath,
        [string]$DestinationPath,
        [int]$Width,
        [int]$Height
    )

    try {
        if (-not (Test-Path $SourcePath)) {
            Write-Warning "Source file not found: $SourcePath"
            return
        }

        # Ensure destination directory exists
        $destDir = Split-Path -Path $DestinationPath
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Force -Path $destDir | Out-Null
        }

        $srcBitmap = New-Object System.Drawing.Bitmap($SourcePath)
        
        # Create a new 24bpp RGB bitmap (No Alpha Channel)
        $destBitmap = New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        $graphic = [System.Drawing.Graphics]::FromImage($destBitmap)

        # Set high quality resizing parameters
        $graphic.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphic.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphic.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphic.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        # Fill background with Black (in case there's any transparency)
        $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Black)
        $graphic.FillRectangle($brush, 0, 0, $Width, $Height)
        $brush.Dispose()

        # Draw the image
        $graphic.DrawImage($srcBitmap, 0, 0, $Width, $Height)

        # Save the new bitmap
        $destBitmap.Save($DestinationPath, [System.Drawing.Imaging.ImageFormat]::Png)

        # Clean up resources
        $graphic.Dispose()
        $destBitmap.Dispose()
        $srcBitmap.Dispose()
        Write-Host "Processed 24bpp PNG: $SourcePath -> $DestinationPath ($Width x $Height)"
    } catch {
        Write-Error "Failed to process image $SourcePath : $_"
    }
}

function Create-StoreIcon {
    param (
        [string]$SourcePath,
        [string]$DestinationPath
    )

    try {
        if (-not (Test-Path $SourcePath)) {
            Write-Warning "Source file not found: $SourcePath"
            return
        }

        # Ensure destination directory exists
        $destDir = Split-Path -Path $DestinationPath
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Force -Path $destDir | Out-Null
        }

        $srcBitmap = New-Object System.Drawing.Bitmap($SourcePath)
        
        # Store icon can have alpha (Format32bppArgb is standard for icons)
        $destBitmap = New-Object System.Drawing.Bitmap(128, 128, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $graphic = [System.Drawing.Graphics]::FromImage($destBitmap)

        # High quality resizing
        $graphic.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphic.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphic.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphic.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        # Draw image transparently
        $graphic.DrawImage($srcBitmap, 0, 0, 128, 128)

        # Save the new bitmap
        $destBitmap.Save($DestinationPath, [System.Drawing.Imaging.ImageFormat]::Png)

        # Clean up
        $graphic.Dispose()
        $destBitmap.Dispose()
        $srcBitmap.Dispose()
        Write-Host "Created Store Icon: $SourcePath -> $DestinationPath (128 x 128)"
    } catch {
        Write-Error "Failed to create store icon: $_"
    }
}

# Create base folders
New-Item -ItemType Directory -Force -Path "store_assets" | Out-Null
New-Item -ItemType Directory -Force -Path "store_assets/screenshots" | Out-Null

# Convert Screenshots (Exact 1280x800, Format24bppRgb)
Convert-To-24bppPng -SourcePath "assets/screenshots/image 1.png" -DestinationPath "store_assets/screenshots/screenshot1.png" -Width 1280 -Height 800
Convert-To-24bppPng -SourcePath "assets/screenshots/image 2.png" -DestinationPath "store_assets/screenshots/screenshot2.png" -Width 1280 -Height 800
Convert-To-24bppPng -SourcePath "assets/screenshots/image 3.png" -DestinationPath "store_assets/screenshots/screenshot3.png" -Width 1280 -Height 800

# Convert Small Promo Tile (Exact 440x280, Format24bppRgb)
Convert-To-24bppPng -SourcePath "assets/promo/Promotional Banner.png" -DestinationPath "store_assets/small_promo_tile.png" -Width 440 -Height 280

# Convert Marquee Promo Tile (Exact 1400x560, Format24bppRgb)
Convert-To-24bppPng -SourcePath "assets/promo/Tile.png" -DestinationPath "store_assets/marquee_promo_tile.png" -Width 1400 -Height 560

# Convert Store Icon (Exact 128x128, Format32bppArgb)
Create-StoreIcon -SourcePath "assets/icons/Darkument-Logo.png" -DestinationPath "store_assets/store_icon.png"
