export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    role: 'Creative Director, Vogue',
    quote: "Habiba has been an absolute joy to work with. Her unique vision and remarkable talent make her an exceptional photographer.",
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 't2',
    name: 'Michael Chen',
    role: 'Fashion Designer',
    quote: "I'm constantly amazed by her ability to capture the essence of each moment. Her work is simply breathtaking.",
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 't3',
    name: 'Emma Williams',
    role: 'Event Coordinator',
    quote: 'Working with Habiba was a dream. She has an incredible eye for detail and knows exactly how to bring a story to life through her lens.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 't4',
    name: 'David Martinez',
    role: 'Film Director',
    quote: 'Her cinematographic eye translates beautifully to stills. Every frame tells a story. Absolutely world-class work.',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 't5',
    name: 'Olivia Thompson',
    role: 'Brand Manager, Nike',
    quote: "The way she captures movement and energy is unmatched. Our campaign came alive through her lens.",
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 't6',
    name: 'James Wilson',
    role: 'Wedding Planner',
    quote: 'She has a gift for capturing those fleeting moments that make memories eternal. Our couples are always thrilled.',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 't7',
    name: 'Sophia Lee',
    role: 'Social Media Influencer',
    quote: 'Her short form content expertise is incredible. She understands vertical storytelling like no one else.',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 't8',
    name: 'Marcus Brown',
    role: 'Music Video Producer',
    quote: 'Working with Habiba elevated our entire production. Her lighting and composition skills are exceptional.',
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
];
