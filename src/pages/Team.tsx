import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Heart, Award, Users, Mail, Linkedin, Twitter } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

// Enhanced team data with more details
const teamMembers = [
  {
    id: 1,
    name: 'Ava Rodriguez',
    role: 'Head Barista',
    image: '/images/team-ava.jpg',
    bio: 'With 8 years of experience, Ava crafts the perfect espresso and leads our team with passion.',
    speciality: 'Espresso Art',
    experience: '8 years',
    quote: 'Every cup tells a story, and I love being the storyteller.',
    social: {
      email: 'ava@coffeecraft.com',
      linkedin: '#',
      twitter: '#'
    },
    achievements: ['Latte Art Champion 2023', 'Coffee Masters Certified', 'Team Leadership Award']
  },
  {
    id: 2,
    name: 'Liam Chen',
    role: 'Senior Barista',
    image: '/images/team-liam.jpg',
    bio: 'Liam specializes in cold brew techniques and innovative coffee brewing methods.',
    speciality: 'Cold Brew Master',
    experience: '5 years',
    quote: 'Innovation in brewing creates the perfect balance of flavor and aroma.',
    social: {
      email: 'liam@coffeecraft.com',
      linkedin: '#',
      twitter: '#'
    },
    achievements: ['Cold Brew Specialist', 'Innovation Award 2022', 'Customer Choice Award']
  },
  {
    id: 3,
    name: 'Noah Williams',
    role: 'Coffee Roaster',
    image: '/images/team-noah.jpg',
    bio: 'Noah ensures every bean reaches its perfect roast, bringing out unique flavors from around the world.',
    speciality: 'Bean Roasting',
    experience: '6 years',
    quote: 'The magic happens in the roast – each bean has its perfect moment.',
    social: {
      email: 'noah@coffeecraft.com',
      linkedin: '#',
      twitter: '#'
    },
    achievements: ['Master Roaster Certified', 'Quality Excellence Award', 'Sustainability Champion']
  },
  {
    id: 4,
    name: 'Maya Patel',
    role: 'Pastry Chef',
    image: '/images/team-maya.jpg',
    bio: 'Maya creates delicious pastries and treats that perfectly complement our coffee offerings.',
    speciality: 'Artisan Pastries',
    experience: '4 years',
    quote: 'The perfect pastry elevates the coffee experience to pure bliss.',
    social: {
      email: 'maya@coffeecraft.com',
      linkedin: '#',
      twitter: '#'
    },
    achievements: ['Pastry Innovation Award', 'Customer Favorite 2023', 'Culinary Excellence']
  }
]

// Stats data
const teamStats = [
  { icon: Users, label: 'Team Members', value: '12+' },
  { icon: Coffee, label: 'Cups Made Daily', value: '500+' },
  { icon: Award, label: 'Awards Won', value: '15+' },
  { icon: Heart, label: 'Happy Customers', value: '1000+' }
]

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [teamData, setTeamData] = useState(teamMembers)

  // Simulate API call to fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      // In real implementation, this would be:
      // const response = await fetch('/api/team')
      // const data = await response.json()
      // setTeamData(data)
      
      // For now, using static data
      setTeamData(teamMembers)
    }

    fetchTeamData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream">
        
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12 lg:py-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-6 py-2 mb-6"
          >
            <Coffee className="text-accent" size={20} />
            <span className="text-accent font-medium">Meet Our Team</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-coffee mb-6">
            The Heart of{' '}
            <motion.span
              className="text-accent"
              animate={{ color: ['#C69C6D', '#4B2E2E', '#C69C6D'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              CoffeeCraft
            </motion.span>
          </h1>
          
          <p className="text-lg lg:text-xl text-coffee/70 max-w-3xl mx-auto leading-relaxed">
            Our passionate team of coffee artisans, roasters, and creators work together 
            to bring you the perfect coffee experience every single day.
          </p>
        </motion.section>

        {/* Team Stats */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-12 mb-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto px-4">
            {teamStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl mb-4">
                  <stat.icon className="text-accent" size={24} />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-coffee mb-1">
                  {stat.value}
                </div>
                <div className="text-coffee/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
            {teamData.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                whileHover="hover"
                onClick={() => setSelectedMember(member.id)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback for missing images
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-${1500000000000 + member.id}?w=400&h=400&fit=crop&crop=face`;
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-coffee/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <div className="flex space-x-2">
                      <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                        <Mail size={16} className="text-white" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                        <Linkedin size={16} className="text-white" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                        <Twitter size={16} className="text-white" />
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-coffee mb-1">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-coffee/70 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-coffee/60">
                    <span className="bg-accent/10 rounded-full px-3 py-1">
                      {member.speciality}
                    </span>
                    <span>{member.experience}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Member Detail Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-coffee/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const member = teamData.find(m => m.id === selectedMember);
                  if (!member) return null;
                  
                  return (
                    <div className="p-8">
                      {/* Close Button */}
                      <button
                        onClick={() => setSelectedMember(null)}
                        className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                      >
                        <Coffee className="text-coffee" size={20} />
                      </button>

                      {/* Member Details */}
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full rounded-2xl shadow-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://images.unsplash.com/photo-${1500000000000 + member.id}?w=400&h=400&fit=crop&crop=face`;
                            }}
                          />
                        </div>
                        
                        <div className="md:w-2/3">
                          <h2 className="text-3xl font-bold text-coffee mb-2">{member.name}</h2>
                          <p className="text-accent text-lg font-medium mb-4">{member.role}</p>
                          
                          <div className="bg-accent/5 rounded-xl p-4 mb-6">
                            <p className="text-coffee/80 italic">"{member.quote}"</p>
                          </div>
                          
                          <p className="text-coffee/70 leading-relaxed mb-6">{member.bio}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                              <h4 className="font-semibold text-coffee mb-2">Speciality</h4>
                              <p className="text-accent">{member.speciality}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-coffee mb-2">Experience</h4>
                              <p className="text-accent">{member.experience}</p>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h4 className="font-semibold text-coffee mb-3">Achievements</h4>
                            <div className="flex flex-wrap gap-2">
                              {member.achievements.map((achievement, index) => (
                                <span
                                  key={index}
                                  className="bg-accent/10 text-coffee px-3 py-1 rounded-full text-sm"
                                >
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex space-x-4">
                            <button className="flex items-center space-x-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-full transition-colors">
                              <Mail size={16} />
                              <span>Contact</span>
                            </button>
                            <button className="flex items-center space-x-2 border border-accent text-accent hover:bg-accent hover:text-white px-4 py-2 rounded-full transition-colors">
                              <Linkedin size={16} />
                              <span>LinkedIn</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 text-center"
        >
          <div className="bg-gradient-to-r from-coffee to-accent rounded-3xl p-12 mx-4 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join Our Team</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Are you passionate about coffee? We're always looking for talented individuals 
              to join our growing family of coffee enthusiasts.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-coffee px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
            >
              View Openings
            </motion.button>
          </div>
        </motion.section>
      </div>
    </PageWrapper>
  )
}