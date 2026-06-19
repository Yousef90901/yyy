export interface Profile {
  name: string;
  title: string;
  titleEn: string;
  bio: string;
  photo: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: { platform: string; url: string; icon: string }[];
  resumeUrl: string;
  aboutTitle: string;
  aboutText: string[];
  stats: { label: string; value: string; icon: string }[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  github?: string;
  featured: boolean;
  date: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  testimonials: Testimonial[];
  theme: { primary: string; secondary: string; accent: string; darkBg: string; lightBg: string; font: string };
  adminPassword: string;
  _version?: number;
}

export const defaultData: PortfolioData & { _version: number } = {
  profile: {
    name: 'يوسف رجب عويس',
    title: 'مهندس زراعي | خبير ذكاء اصطناعي',
    titleEn: 'Agricultural Engineer | AI Specialist',
    bio: 'مهندس زراعي شغوف بتوظيف الذكاء الاصطناعي في تطوير الحلول الزراعية الذكية. أملك خبرة في بناء تطبيقات ويب تفاعلية، برامج دردشة ذكية، وأنظمة تشخيص أمراض النبات باستخدام تقنيات التعلم العميق.',
    photo: '/yyy/images/profile.png',
    email: 'yousefrajabaweis@gmail.com',
    phone: '+20 01119547709',
    location: 'مصر',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/youssefragab', icon: 'fab fa-linkedin-in' },
      { platform: 'GitHub', url: 'https://github.com/youssefragab', icon: 'fab fa-github' },
      { platform: 'Twitter', url: 'https://twitter.com/youssefragab', icon: 'fab fa-twitter' },
      { platform: 'WhatsApp', url: 'https://wa.me/201119547709', icon: 'fab fa-whatsapp' }
    ],
    resumeUrl: '#',
    aboutTitle: 'نبذة عني',
    aboutText: [
      'مهندس زراعي متخصص في توظيف الذكاء الاصطناعي وتقنيات البرمجة الحديثة في المجال الزراعي. أؤمن بأن التكنولوجيا هي المفتاح لتحقيق الأمن الغذائي والتنمية الزراعية المستدامة.',
      'أعمل على تطوير تطبيقات ومواقع ذكية تخدم المزارعين والشركات الزراعية، من برامج محادثة ذكية إلى أنظمة متقدمة لتشخيص أمراض النبات عبر تحليل الصور.'
    ],
    stats: [
      { label: 'مشروع مكتمل', value: '15+', icon: 'fas fa-project-diagram' },
      { label: 'سنة خبرة', value: '2', icon: 'fas fa-calendar-alt' },
      { label: 'عميل سعيد', value: '20+', icon: 'fas fa-smile' },
      { label: 'تطبيق زراعي', value: '7+', icon: 'fas fa-leaf' }
    ]
  },
  skills: [
    { id: 's1', name: 'HTML & CSS', category: 'تطوير ويب', level: 95, icon: 'fab fa-html5' },
    { id: 's2', name: 'JavaScript', category: 'تطوير ويب', level: 90, icon: 'fab fa-js' },
    { id: 's3', name: 'React.js', category: 'تطوير ويب', level: 85, icon: 'fab fa-react' },
    { id: 's4', name: 'Python', category: 'برمجة', level: 80, icon: 'fab fa-python' },
    { id: 's5', name: 'TensorFlow', category: 'ذكاء اصطناعي', level: 75, icon: 'fas fa-brain' },
    { id: 's6', name: 'Computer Vision', category: 'ذكاء اصطناعي', level: 78, icon: 'fas fa-eye' },
    { id: 's7', name: 'NLP', category: 'ذكاء اصطناعي', level: 82, icon: 'fas fa-language' },
    { id: 's8', name: 'Node.js', category: 'تطوير ويب', level: 72, icon: 'fab fa-node-js' },
    { id: 's9', name: 'UI/UX Design', category: 'تصميم', level: 80, icon: 'fas fa-paint-brush' },
    { id: 's10', name: 'الاستشعار عن بعد', category: 'زراعة ذكية', level: 70, icon: 'fas fa-satellite' },
    { id: 's11', name: 'SQL/Databases', category: 'برمجة', level: 75, icon: 'fas fa-database' },
    { id: 's12', name: 'IoT', category: 'زراعة ذكية', level: 65, icon: 'fas fa-microchip' }
  ],
  projects: [
    {
      id: 'p1',
      title: 'شات بوت زراعي ذكي - AgriChat',
      description: 'برنامج محادثة ذكي متخصص في المجال الزراعي، يجيب على استفسارات المزارعين حول زراعة المحاصيل، التسميد، الري، ومكافحة الآفات باستخدام تقنيات NLP والذكاء الاصطناعي.',
      technologies: ['React'],
      image: '/yyy/images/agri_chatbot.png',
      link: '#',
      github: '#',
      featured: true,
      date: '2025-12'
    },
    {
      id: 'p2',
      title: 'نظام تشخيص أمراض النبات - PlantDoc',
      description: 'نظام متقدم لفحص وتشخيص أمراض النبات عن طريق رفع صورة النبات المصاب. يستخدم تقنيات الرؤية الحاسوبية والتعلم العميق لتحديد المرض وتقديم توصيات العلاج.',
      technologies: ['React'],
      image: '/yyy/images/plantdoc.png',
      link: '#',
      github: '#',
      featured: true,
      date: '2025-10'
    },
    {
      id: 'p3',
      title: 'المساعد الزراعي الصوتي - AgriVoice',
      description: 'مساعد صوتي ذكي متخصص في المجال الزراعي يتيح للمزارعين التفاعل الصوتي للحصول على استشارات فورية حول الممارسات الزراعية المثلى.',
      technologies: ['React'],
      image: '/yyy/images/agri_voice.png',
      link: '#',
      github: '#',
      featured: true,
      date: '2025-08'
    },
    {
      id: 'p4',
      title: 'برنامج حساب وتصميم شبكات الري',
      description: 'برنامج متخصص لحساب وتصميم شبكات الري الحديثة، يدعم حسابات التدفق والضغط وأقطار المواسير، مع إخراج تقارير فنية متكاملة.',
      technologies: ['React'],
      image: '/yyy/images/irrigation_design.png',
      link: '#',
      github: '#',
      featured: true,
      date: '2025-06'
    },

  ],
  experiences: [
    {
      id: 'e1',
      title: 'مهندس ذكاء اصطناعي زراعي',
      company: 'خاص',
      description: 'تطوير حلول الذكاء الاصطناعي للمجال الزراعي، بناء أنظمة تشخيص الأمراض، والإشراف على مشاريع التحول الرقمي الزراعي.',
      startDate: '2023-03',
      endDate: '',
      current: true
    },
    {
      id: 'e2',
      title: 'مطور ويب Front-End',
      company: 'Freelance',
      description: 'بناء وتطوير مواقع وتطبيقات ويب باستخدام React وJavaScript، مع تخصص في المشاريع الزراعية والتجارية.',
      startDate: '2022-01',
      endDate: '',
      current: true
    },
    {
      id: 'e3',
      title: 'مهندس زراعي',
      company: 'خاص',
      description: 'تقديم استشارات زراعية للمزارعين، الإشراف على عمليات الإنتاج الزراعي، وتطبيق نظم الري الحديثة.',
      startDate: '2020-06',
      endDate: '2023-02',
      current: false
    },
    {
      id: 'e4',
      title: 'Member of IAENG Society of Artificial Intelligence',
      company: 'International Association of Engineers - Hong Kong',
      description: 'Membership No: 563933 - عضو في جمعية IAENG للذكاء الاصطناعي التابعة للاتحاد الدولي للمهندسين.',
      startDate: '2025-01',
      endDate: '',
      current: true
    }
  ],
  testimonials: [
    {
      id: 't1',
      name: 'أحمد علي',
      role: 'مدير شركة GreenScape',
      text: 'عمل رائع ومهنية عالية. يوسف أنشأ لنا موقعاً متكاملاً يعكس هوية شركتنا بشكل احترافي. أنصح بالتعامل معه.',
      avatar: ''
    },
    {
      id: 't2',
      name: 'محمد حسن',
      role: 'مزارع - صاحب مزرعة نموذجية',
      text: 'نظام تشخيص أمراض النبات الذي طوره يوسف ساعدني كثيراً في اكتشاف أمراض محاصيلي مبكراً. تقنية مذهلة!',
      avatar: ''
    },
    {
      id: 't3',
      name: 'سارة أحمد',
      role: 'مهندسة برمجيات',
      text: 'يوسف مبدع حقيقي في ربط التكنولوجيا بالزراعة. شات بوت AgriChat أحد أفضل الحلول الذكية التي رأيتها.',
      avatar: ''
    }
  ],
  theme: {
    primary: '#2d6a4f',
    secondary: '#1b4332',
    accent: '#52b788',
    darkBg: '#0d1f16',
    lightBg: '#f0f7f4',
    font: 'Cairo'
  },
  adminPassword: 'yousef',
  _version: 2
};
