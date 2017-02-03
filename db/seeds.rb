# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
module SeedData

  def self.extended(object)
    object.instance_exec do
      user = User.create(email: "lightning@asgard.gov", password: "mjollnir", account_type: "hunter") unless User.find_by(email: "lightning@asgard.gov")
      Hunter.create(first_name: "Thor", last_name: "Odinson", user_id: user.id) unless Hunter.find_by(first_name: "Thor")
    end
  end

end

extend SeedData if ARGV.include?("db:seed")
