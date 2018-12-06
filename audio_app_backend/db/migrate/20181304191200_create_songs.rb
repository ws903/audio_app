class CreateSongs < ActiveRecord::Migration[5.2]
	def change
		create_table :songs do |t|
			t.string :song_file
			t.timestamps
		end
	end
end