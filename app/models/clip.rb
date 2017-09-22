class Clip < ApplicationRecord
  mount_uploader :audio_file, AudioUploader
end
