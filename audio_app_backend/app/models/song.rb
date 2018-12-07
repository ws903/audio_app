class Song < ApplicationRecord
	# has_one_attached :song_file
	validates :song_file, uniqueness: true

# def song_json
#   {
#     name: self.name,
#     song: self.song_file
#   }
# end

end
