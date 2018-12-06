class Song < ApplicationRecord
	# has_one_attached :song_file
	validates :song_file, uniqueness: true
end