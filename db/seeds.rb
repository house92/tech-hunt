# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Job.destroy_all

module SeedData

  def self.extended(object)
    object.instance_exec do
      user1 = User.create(email: "lightning@asgard.gov", password: "mjollnir", account_type: "hunter") unless User.find_by(email: "lightning@asgard.gov")
      Hunter.create(first_name: "Thor", last_name: "Odinson", user_id: user1.id) unless Hunter.find_by(first_name: "Thor")
      user2 = User.create(email: "charles.xavier@xschool.com", password: "cerebro", account_type: "employer") unless User.find_by(email: "charles.xavier@xschool.com")
      employer1 = Employer.create(company_name: "Professor Xavier's School For Gifted Youngsters", user_id: user2.id) unless Employer.find_by(company_name: "Professor Xavier's School For Gifted Youngsters")

      job1 = Job.create(title: "Tech Wizard", description: "A highly skilled web developer for part-time role. Must be mutant-friendly.", salary: 42000, location: "New York, USA", lat: 40.7141667, lng: -74.0063889, grading: "Senior", full_time: false, contract: false, offers_visa: false, employer_id: employer1.id) unless Job.find_by(title: "Tech Wizard")

      job2 = Job.create(title: "Junior web developer", description: "We have an exciting opportunity for a junior web developer to join our enthusiastic and dynamic creative team. The ideal candidate will be up-beat, hard-working and a team player.\n\nThe successful candidate should have front end skills (HTML5, CSS and bootstrap), backend skills (PHP or ASP.net) and have experience using Adobe products (Dreamweaver, Photoshop, InDesign and Illustrator)", salary: 22000, location: "Hillingdon, UK", lat: 51.5329, lng: -0.455, grading: "Junior", full_time: true, contract: false, offers_visa: false, employer_id: employer1.id) unless Job.find_by(title: "Junior web developer")

      job3 = Job.create(title: "Web developer", description: "As Metro Bank continues its fantastic growth in the market there is an exciting opportunity to join our digital development team as a Web Developer. We are looking for a passionate developer who will be able to able to design, develop, and deploy new and enhanced digital features and products for our commercial and retail banking platforms. Reporting directly to the digital web development lead this is an integral role in ensuring that we continue to deliver an excellent service to our customers and colleagues as well as ensuring that we are following industry best practices.", salary: 50000, location: "Central London, UK", lat: 51.5076, lng: -0.1278, grading: "Mid-level", full_time: true, contract: false, offers_visa: true, employer_id: employer1.id) unless Job.find_by(title: "Web developer")

      job4 = Job.create(title: "Lead Front End Developer", description: "The position in question is for a high tech software development house based in the heart of London. They focus on delivering cutting edge software for both business and personal use, as well as building proof-of-concept, completely greenfield applications. The company in question are looking for Senior developers that have extensive experience building complex, scalable applications in React and Node, and have a real desire to be part of a bleeding edge, agile and challenging company. It's an incredible position to be in at the moment, not only for the projects, but for the potential for growth and personal development. Packages available are also very strong, offering competitive permanent salaries, even in comparison to similiar contract roles.", salary: 90000, location: "London, UK", lat: 51.5176, lng: -0.1478, grading: "Senior", full_time: true, contract: false, offers_visa: true, employer_id: employer1.id) unless Job.find_by(title: "Lead Front End Developer")

      job5 = Job.create(title: "JavaScript Developer (ES6, ReactJS)", description: "We have an exciting opportunity for a JavaScript Developer / Software Developer, who has a passion for JavaScript development and enjoys working with different JavaScript Frameworks especially ReactJS to join a leading Media company in their Manchester (Salford) HQ.\n\nWorking as a JavaScript Developer / Engineer (ReactJS, NodeJS) you will be responsible for developing, designing and supporting the businesses interactive services. As a JS Developer you will be a creative person who enjoys working in an innovative TDD, BDD environment that is always open to new ideas.\n\nAn understanding of engineering processes and past experience of product creation is essential. An ideal candidate would have previous experience of hybrid app development.\n\n400.​00 - 450.​00 £ /​per day", salary: 100000, location: "Manchester, UK", lat: 53.4793, lng: -2.2479, grading: "Senior", full_time: true, contract: true, offers_visa: false, employer_id: employer1.id) unless Job.find_by(title: "JavaScript Developer (ES6, ReactJS)")

      job6 = Job.create(title: "Web Developer - LAMP Stack", description: "Our company is seeking a web developer with strong full stack programming experience and an eye for web layout and design. You will be a part of a team of industry veterans developing sites, building custom content management system modules and performing client-side maintenance tasks on hundreds of sites across several industries. The successful candidate is someone who is passionate about developing the best possible technical solutions for our clients and for the web.\n\nBS and/or Masters in CS, CogSci or Math, or equivalent work experience (2+ years)\nJavaScript Proficiency\nStrong, compliant HTML and CSS\nJavaScript library familiarity (AngularJS or similar, jQuery, etc)\nServer-side experience (node.js, PHP)\nDatabase familiarity (mongoDB or other NoSQL variants, especially) \nSolid command of HTTP protocol and security measures\nStrong understanding of web application UI principals", salary: 70000, location: "San Diego, USA", lat: 32.7153, lng: -117.1573, grading: "Mid-level", full_time: true, contract: false, offers_visa: true, employer_id: employer1.id) unless Job.find_by(title: "Web Developer - LAMP Stack")
    end
  end

end

extend SeedData if ARGV.include?("db:seed")
