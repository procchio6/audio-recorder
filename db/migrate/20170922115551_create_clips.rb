class CreateClips < ActiveRecord::Migration[5.1]
  def change
    create_table :clips do |t|
      t.string :title
      t.string :audio_file

      t.timestamps
    end
  end
end
