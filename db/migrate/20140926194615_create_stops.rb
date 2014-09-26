class CreateStops < ActiveRecord::Migration
  def change
    create_table :stops do |t|
      t.integer :code
      t.string :name
      t.string :vix_name
      t.integer :easting
      t.integer :northing
      t.decimal :latitude, precision: 11, scale: 8
      t.decimal :longitude, precision: 11, scale: 8

      t.timestamps
    end
  end
end
