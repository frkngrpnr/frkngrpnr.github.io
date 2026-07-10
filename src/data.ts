/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Publication {
  type: "Journal Paper" | "Conference Paper" | "Book Chapter";
  authors: string;
  title: string;
  venue: string;
  year: number;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Reference {
  name: string;
  email: string;
  phone?: string;
  institution: string;
}

export interface CVData {
  name: string;
  email: string;
  googleScholar: string;
  education: Education[];
  academicExperience: Experience[];
  workExperience: Experience[];
  skills: {
    backend: string[];
    frontend: string[];
    mobile: string[];
    gameDev: string[];
    scientific: string[];
    other: string[];
  };
  awards: {
    title: string;
    detail: string;
    venue: string;
    year: number;
  }[];
  publications: Publication[];
  references: Reference[];
}

export const cvData: CVData = {
  name: "Furkan Gürpınar",
  email: "gurpinarfurkan@gmail.com",
  googleScholar: "Furkan Gürpınar",
  education: [
    {
      degree: "M.S. Computational Science & Engineering",
      institution: "Boğaziçi University",
      period: "2014-2017"
    },
    {
      degree: "B.S. Mechanical Engineering",
      institution: "Boğaziçi University",
      period: "2007-2012"
    }
  ],
  academicExperience: [
    {
      role: "Researcher",
      organization: "Boğaziçi University Media Laboratory",
      period: "2014-2017",
      bullets: [
        "Video and image based deep transfer learning for face analysis",
        "Developed neural networks for high-impact emotion and personality expression recognition."
      ]
    },
    {
      role: "Research & Teaching Assistant",
      organization: "Kadir Has University",
      period: "2014-2015",
      bullets: [
        "Time series analysis for market trend prediction",
        "Support in teaching Competitive Intelligence and Discrete Mathematics"
      ]
    },
    {
      role: "Teaching Assistant",
      organization: "Boğaziçi University Mechanical Engineering",
      period: "2010",
      bullets: [
        "Support in teaching MATLAB and C for numerical analysis"
      ]
    }
  ],
  workExperience: [
    {
      role: "Freelance Software Developer",
      organization: "Independent",
      period: "2010 - Present",
      bullets: [
        "Web design, development and search engine optimization (SEO)",
        "Android native application development (Java, Kotlin)",
        "Smart contract development on the Ethereum blockchain (Solidity, Web3.js)",
        "An image processing system for a smart public transport application"
      ]
    }
  ],
  skills: {
    backend: ["PHP", "Python", "Django", "SQL", "Node.js", "MongoDB"],
    frontend: ["HTML", "CSS", "JavaScript", "jQuery", "AngularJS", "React", "Vue", "NW.js (node-webkit)", "Electron", "Tauri"],
    mobile: ["Android (Java, Kotlin)", "iOS (Objective-C, Swift)"],
    gameDev: ["Unity3D", "ActionScript", "Phaser.js", "Three.js", "Babylon.js"],
    scientific: ["MATLAB", "R", "Prolog", "Julia"],
    other: ["Visual Basic", "C#", "C++", "C", "Web3.js"]
  },
  awards: [
    {
      title: "1st place in ChaLearn Explainable Job Candidate Screening challenge",
      detail: "Winner in both quantitative and qualitative challenges",
      venue: "IEEE Conference on Computer Vision and Pattern Recognition Workshops (CVPRW)",
      year: 2017
    },
    {
      title: "1st place in ChaLearn First Impressions challenge",
      detail: "International multi-modal machine learning challenge",
      venue: "International Conference on Pattern Recognition (ICPR)",
      year: 2016
    },
    {
      title: "2nd place in Emotion Recognition in the Wild (EmotiW) challenge",
      detail: "High-performance multimodal wild emotion classification",
      venue: "ACM International Conference on Multimodal Interaction (ICMI)",
      year: 2015
    }
  ],
  publications: [
    {
      type: "Journal Paper",
      authors: "H.J. Escalante, H. Kaya, A.A. Salah, S. Escalera, Y. Güçlütürk, U. Güçlü, X. Baró, I. Guyon, J.C.S.J. Junior, M. Madadi, S. Ayache, E. Viegas, F. Gürpınar, A. S. Wicaksana, C.C.S. Liem, M.A.J. Van Gerven, R.J. Van Lier",
      title: "Modeling, recognizing, and explaining apparent personality from videos",
      venue: "IEEE Transactions on Affective Computing",
      year: 2020
    },
    {
      type: "Journal Paper",
      authors: "Kaya, H., F. Gürpınar, A.A. Salah",
      title: "Video Based Emotion Recognition in the Wild using Deep Transfer Learning and Score Fusion",
      venue: "Image and Vision Computing",
      year: 2017
    },
    {
      type: "Conference Paper",
      authors: "Kaya H., F. Gürpınar, A.A. Salah",
      title: "Multi-modal Score Fusion and Decision Trees for Explainable Automatic Job Candidate Screening from Video CVs",
      venue: "IEEE Conf. on Computer Vision and Pattern Recognition Workshops (CVPRW)",
      year: 2017
    },
    {
      type: "Conference Paper",
      authors: "Gürpınar, F., H. Kaya, A.A. Salah",
      title: "Multimodal Fusion of Audio, Scene, and Face Features for First Impression Estimation",
      venue: "International Conference on Pattern Recognition (ICPR)",
      year: 2016
    },
    {
      type: "Conference Paper",
      authors: "Gürpınar, F., H. Kaya, A.A. Salah",
      title: "Combining Deep Facial and Ambient Features for First Impression Estimation",
      venue: "European Conference on Computer Vision Workshops (ECCVW)",
      year: 2016
    },
    {
      type: "Conference Paper",
      authors: "Gürpınar, F., H. Kaya, H. Dibeklioğlu, A.A. Salah",
      title: "Kernel ELM and CNN based Facial Age Estimation",
      venue: "IEEE Conference on Computer Vision and Pattern Recognition Workshops",
      year: 2016
    },
    {
      type: "Conference Paper",
      authors: "Kaya, H., F. Gürpınar, S. Afshar, A.A. Salah",
      title: "Contrasting and Combining Least Squares Based Learners for Emotion Recognition in the Wild",
      venue: "ACM International Conference on Multimodal Interaction (ICMI)",
      year: 2015
    },
    {
      type: "Conference Paper",
      authors: "Gürpınar, F., H. Kaya, S. Afshar, H. Dibeklioğlu, A.A. Salah",
      title: "Kernel ELM based Age Estimation",
      venue: "Int. Conf. on Computer Graphics, Animation and Gaming Technologies (Eurasia Graphics), Istanbul",
      year: 2015
    },
    {
      type: "Book Chapter",
      authors: "Dibeklioğlu, H., A.A. Salah, F. Gürpınar",
      title: "Measurement of Facial Dynamics for Soft Biometrics",
      venue: "Int. Workshop on Face and Facial Expression Recognition from Real World Videos, Springer Verlag",
      year: 2015
    }
  ],
  references: [
    
    {
      name: "Prof. Dr. Albert Ali Salah",
      email: "a.a.salah@uu.nl",
      institution: "Utrecht University"
    },
    {
      name: "Dr. Heysem Kaya",
      email: "h.kaya@uu.nl",
      phone: "+31 30253754",
      institution: "Utrecht University"
    },
    {
      name: "Prof. Dr. Çetin Yılmaz",
      email: "cetin.yilmaz@boun.edu.tr",
      phone: "+90 212 359 6436",
      institution: "Boğaziçi University"
    }
  ]
};
