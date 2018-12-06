module Api
	module V1
		class SongsController < ApplicationController
			def create
				song = Song.new(song_params)
				if song.save
					
				end
			end

			def index
				render json: Song.all
			end

			private
			def song_params
				params.require(:song).permit(:song_file)
			end

		end
	end
end