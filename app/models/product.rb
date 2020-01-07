class Product < ApplicationRecord
  mount_uploader :image, ImageUploader


  validate def check_image_dimensions
    if geometry[:width] < 400 || geometry[:height] < 400
      errors.add :image, '400x400ピクセル以上のサイズの画像をアップロードしてください'
    end
  end

  def geometry
    @geometry ||= _geometry
  end

  private

  def _geometry
    if image.file and File.exists?(image.file.file)
      img = ::Magick::Image::read(image.file.file).first
      { width: img.columns, height: img.rows }
    end
  end
end

