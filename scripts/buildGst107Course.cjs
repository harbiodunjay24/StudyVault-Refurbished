const fs = require('fs');

const gst107CourseContent = `import { Course, PastQuestionDocument, StudyModule, PastExamQuestionItem } from '../types';
import {
  GST107_UPLOADED_PQ_DOCUMENTS,
  AUTHENTIC_GST107_EXTRACTED_PAST_QUESTIONS
} from './gst107PastQuestionsData';

export {
  GST107_UPLOADED_PQ_DOCUMENTS,
  AUTHENTIC_GST107_EXTRACTED_PAST_QUESTIONS
} from './gst107PastQuestionsData';

export const GST107_COURSE: Course = {
  id: 'course-gst107',
  code: 'GST 107',
  title: 'A Study Guide for the Distance Learner',
  department: 'General Studies Unit (GST) / Directorate of Learner Support Services',
  description:
    'National Open University of Nigeria (NOUN) foundational compulsory 2-credit course developed by Prof. Olubiyi Adewale, Dr. Johnson Opateye, Dr. Chidinma Onwubere, and Miss Nora Onwumelu; edited by Dr. Juliet O. Inegbedion. Covers the history and philosophy of Open and Distance Learning (ODL), learner demography and characteristics, the learning environment as third teacher, the four foundational study skills (Listening, Speaking, Reading, Writing), study strategies and mnemonic devices (SQ3R, Cornell note-taking, SMART, SWOT), instructional and summative assessment modes (CMA, TMA, POP, e-Examination), assessment of non-examinable courses (SIWES, practicum, teaching practice, research projects), and the comprehensive learners support services framework.',
  createdAt: '2026-10-24T08:30:00Z',
  documents: [
    {
      id: 'doc-gst107-textbook',
      name: 'GST107_A_STUDY_GUIDE_FOR_DISTANCE_LEARNER_3a4d0ed2.pdf',
      fileType: 'pdf',
      fileSize: 1850000,
      uploadedAt: '2026-10-24T08:30:00Z',
      extractedHeadingsCount: 16,
      pageCount: 132,
      status: 'ready',
      processingStatus: 'fully_processed',
      summary:
        'Official NOUN primary course textbook for GST 107: A Study Guide for the Distance Learner (First Edition 2018, ISBN: 978-978-8521-90-7) developed by Prof. Olubiyi Adewale, Dr. Johnson Opateye, Dr. Chidinma Onwubere, and Miss Nora Onwumelu.'
    },
    {
      id: 'doc-gst107-psalmdata-summary',
      name: 'NOUN-NOU107_STUDY_GUIDE_FOR_THE_DISTANCE_LEARNER_SUMMARY_1826c371.pdf',
      fileType: 'pdf',
      fileSize: 1250000,
      uploadedAt: '2026-10-24T08:30:00Z',
      extractedHeadingsCount: 16,
      pageCount: 84,
      status: 'ready',
      processingStatus: 'fully_processed',
      summary:
        'Comprehensive examination summary and 1,039 verified past-question and assessment items with official model solutions for NOU 107 / GST 107 by Psalmdata Telecom and Computer Café.'
    }
  ],
  pastQuestionDocuments: GST107_UPLOADED_PQ_DOCUMENTS,
  modules: [
    {
      id: 'mod-gst107-1',
      moduleNumber: 1,
      title: 'Module 1: Introduction to the Open and Distance Learning (ODL) System',
      description:
        'Evolution, definition, philosophical tenets, characteristics, teaching-learning dynamic, and learner profiles in Open and Distance Learning.',
      units: [
        {
          id: 'unit-gst107-m1-u1',
          unitNumber: '1.0',
          title: 'Unit 1: History of the Open and Distance Learning System',
          pageRange: '9-17',
          overview:
            'Traces the historical trajectory of distance education through three developmental stages: Correspondence, Sound and Video Signal, and Computer Technology. Analyzes the evolution of ODL in Nigeria from 1947 extra-mural studies, the 1977 National Policy on Education, the suspension of NOU in 1984, to the 2002 re-establishment of NOUN under President Olusegun Obasanjo.',
          objectives: [
            'Define Open and Distance Learning according to the Commonwealth of Learning (COL 2015)',
            'Identify and describe the three major developmental stages of distance education',
            'Differentiate between distance education and the philosophy of open learning',
            'Chronicle the evolution and policy foundation of Open and Distance Learning in Nigeria',
            'Explain the institutional necessity and carrying capacity pressures motivating ODL in Nigeria'
          ],
          unitRecapPoints: [
            'ODL combines two distinct concepts: Distance Education (separation of teacher and learner) and Open Learning (flexibility, open access, and learner autonomy).',
            'COL (2015) defines ODL as a system characterized by separation of teacher and learner in time and/or space, using multiple media, two-way communication, and occasional face-to-face tutorials.',
            'Distance education evolved through three distinct stages: (1) Correspondence Stage (mid-19th century mail distribution, Sir Isaac Pitman 1840s shorthand); (2) Sound and Video Signal Stage (WWI radio broadcasts 1916, TV experiments 1932-1934); and (3) Computer Technology Stage (1980s space age, internet in 1990s).',
            'In Nigeria, University College Ibadan pioneered extra-mural studies with Oxford in 1947; NBC introduced English by Radio in 1960; ABU started University of the Air in 1972; UNILAG founded COSU in 1974 (later COSIT/DLI).',
            'National Open University Act was signed into law on 22 July 1983 by President Shehu Shagari with Prof. Afolabi Ojo as first VC. Suspended on 25 April 1984 by Maj.-Gen. Muhammadu Buhari; re-established in 2002 by President Olusegun Obasanjo (who later earned PhD in Christian Theology at NOUN).',
            'RETRIDOL (Regional Training and Research Institute for Distance and Open Learning) was established in 2003 through NOUN-COL partnership.'
          ],
          topics: [
            {
              id: 'top-gst107-1-1',
              title: '3.1 Definition of Open and Distance Learning (ODL)',
              readingMinutes: 12,
              content:
                'The term open and distance learning is made up of two distinct educational concepts: distance education and open learning. While distance education has a history spanning over 170 years, open learning is a more recent movement that gained momentum in the 1970s. The Commonwealth of Learning (COL, 2015) defines ODL as a system of teaching and learning characterized by the separation of teacher and learner in time and/or space, using multiple media for instructional delivery, two-way communication, and occasional face-to-face meetings for tutorials and peer collaboration.',
              summaryPoints: [
                'ODL synthesizes distance delivery with open access philosophies.',
                'Key elements: separation in time/space, multi-media delivery, two-way communication, and learner interaction.',
                'Authoritative definition established by Commonwealth of Learning (COL 2015).'
              ],
              keyTerms: ['Distance Education', 'Open Learning', 'COL 2015 Definition', 'Two-Way Communication'],
              textbookDefinitions: [
                {
                  term: 'Open and Distance Learning (ODL)',
                  definition:
                    'A system of teaching and learning characterized by separation of teacher and learner in time and/or space, using multiple media for delivery of instruction, two-way communication, and occasional face-to-face meetings for tutorials and learner-to-learner interaction (COL, 2015).'
                }
              ]
            },
            {
              id: 'top-gst107-1-2',
              title: '3.2 Three Developmental Stages of Distance Education',
              readingMinutes: 15,
              content:
                'Schultz, Schultz and Embry-Riddle (2008) categorize the development of distance education into three distinct phases: (1) The Correspondence Stage, beginning in the mid-19th century in Great Britain, France, Germany, and the US, where printed materials were distributed via postal mail (Sir Isaac Pitman shorthand courses in 1840s; University of London External Programme chartered in 1858); (2) The Sound and Video Signal Stage, initiated during World War I through educational radio (University of Wisconsin 1916 broadcast) and educational television (Iowa and Kansas 1932-1934); (3) The Computer Technology Stage, emerging in the 1980s space age with computers, satellites, and the widespread adoption of the Internet and World Wide Web in the 1990s.',
              summaryPoints: [
                'Stage 1: Correspondence Stage (print & postal mail, Pitman shorthand 1840s).',
                'Stage 2: Sound and Video Signal Stage (radio 1916, educational TV 1930s).',
                'Stage 3: Computer Technology Stage (1980s computers/satellites, 1990s Web/LMS).'
              ],
              keyTerms: ['Correspondence Stage', 'Sound and Video Signal Stage', 'Computer Technology Stage', 'Pitman Shorthand']
            },
            {
              id: 'top-gst107-1-3',
              title: '3.3 Open and Distance Learning in Nigeria',
              readingMinutes: 18,
              content:
                'The development of ODL in Nigeria is grounded in the 1977 National Policy on Education (NPE). Historical milestones include: Oxford University extra-mural studies at University College Ibadan (1947); Rapid Results College and Wolsey Hall correspondence courses; NBC English by Radio (1960); Ahmadu Bello University University of the Air (1972) for teachers in-service; and University of Lagos Correspondence and Open Studies Unit (COSU 1974, later COSIT and DLI), making UNILAG the first dual-mode university in Nigeria. In 1980, the Presidential Planning Committee chaired by Prof. Afolabi Ojo was inaugurated. The Open University Act was passed on 20 April 1983 and signed on 22 July 1983 by President Shehu Shagari. NOU began screening students in 1984 but was suspended on 25 April 1984 by Maj.-Gen. Muhammadu Buhari. In 2002, President Olusegun Obasanjo re-established NOUN as Nigerias only single-mode ODL university. In 2003, RETRIDOL was launched with COL. Conventional universities absorbed only ~20-30% of qualified candidates (Umar 2006), making ODL essential to democratize education and satisfy lifelong learning needs.',
              summaryPoints: [
                'Policy roots: 1977 National Policy on Education.',
                'Key precursors: Ibadan extra-mural (1947), ABU (1972), UNILAG COSU (1974).',
                'NOU established 1983 (Prof. Afolabi Ojo VC), suspended 1984, re-established 2002 by Obasanjo.',
                'RETRIDOL created 2003 with Commonwealth of Learning.',
                'Carrying capacity gap: conventional universities left over 70% of qualified applicants unabsorbed.'
              ],
              keyTerms: ['National Policy on Education 1977', 'COSU/DLI', 'Prof. Afolabi Ojo', 'Chief Olusegun Obasanjo', 'RETRIDOL', 'Carrying Capacity']
            }
          ]
        },
        {
          id: 'unit-gst107-m1-u2',
          unitNumber: '2.0',
          title: 'Unit 2: Characteristics of the Open and Distance Learning System',
          pageRange: '18-26',
          overview:
            'Explores the distinctive dimensions that define ODL: separation of teacher and learner in time and place, the three facets of openness (people, place, ideas), flexibility (time, place, pace), accessibility (reaching marginalized populations including prisoners and women in purdah), affordability, technology-driven delivery, mixed media courseware, four types of interactivity, and learner-centeredness.',
          objectives: [
            'Explain the separation of teacher and learner across time and place planes',
            'Analyze the three dimensions of openness: people, place, and ideas (Kanwar 2015)',
            'Discuss the three areas of flexibility: time, place, and pace (Musingafi et al. 2015)',
            'Identify marginalized groups benefiting from ODL accessibility in Nigeria',
            'Examine the four types of interactivity in distance education (Moore, Sher, Dabbagh)'
          ],
          unitRecapPoints: [
            'Teacher and learner are separated in two planes: place (geographical separation) and time (asynchronous schedules).',
            'Openness (Kanwar 2015): (1) Openness to people (flexible entry requirements); (2) Openness to place (anywhere/anytime via smartphones/laptops); (3) Openness to ideas (David Wiley 1998 open content, OER, and MOOCs).',
            'Flexibility (Musingafi et al. 2015): Time (convenient hours), Place (job transfers, portability), and Pace (minimum 10 credit units/semester).',
            'Accessibility: Empowers prisoners (study centres in Nigerian correctional centres), women restricted by cultural/family roles (purdah), and visually impaired learners (Braille courseware).',
            'Affordability: 90% of students consider ODL affordable (Rupanda & Nyenya 2014) due to flexible instalment payments and local study centres eliminating distant travel.',
            '4 Types of Interactivity: (1) Learner-to-content; (2) Learner-to-instructor; (3) Learner-to-learner (Sher 2009); (4) Learner-to-technology/interface (Hillman et al. 1994).'
          ],
          topics: [
            {
              id: 'top-gst107-2-1',
              title: '3.1 Separation, Openness, and Flexibility',
              readingMinutes: 15,
              content:
                'The separation between instructor and student occurs in place (geographical detachment) and time (asynchronous study). Openness encompasses three dimensions: people (widening access, flexible admissions), place (borderless learning via mobile and internet), and ideas (David Wiley coined "open content" in 1998, giving rise to Open Educational Resources [OER] and Massive Open Online Courses [MOOCs]). Flexibility spans time (study when convenient), place (relocation without academic interruption), and pace (customizable semester credit load with minimum 10 credit units).',
              summaryPoints: [
                'Separation in place and time.',
                'Openness to people, place, and ideas (David Wiley 1998 Open Content).',
                'Flexibility in time, place, and pace (minimum 10 credits).'
              ],
              keyTerms: ['Separation in Place & Time', 'Open Content', 'David Wiley', 'OER', 'MOOCs', 'Flexibility']
            },
            {
              id: 'top-gst107-2-2',
              title: '3.2 Accessibility, Affordability, and Technology',
              readingMinutes: 15,
              content:
                'ODL guarantees accessibility to historically excluded groups: correctional centre inmates, women restricted by socio-cultural obligations, and physically challenged learners (Brailled courseware). Affordability is corroborated by Rupanda and Nyenya (2014) where 90% affirmed affordability through NOUNs instalment payment structure. Fourth-generation distance education incorporates e-Learning, m-Learning (mobile), and u-Learning (ubiquitous) as described by Pena-Bandalaria (2007). Mixed media courseware includes print, radio, TV broadcasts, computer-based instruction, and telematics.',
              summaryPoints: [
                'Inclusivity: Prison inmates, women in purdah, Braille materials for visually impaired.',
                'Affordability: 90% positive rating (Rupanda & Nyenya 2014); instalment fee payment.',
                'Technology: 4th generation e/m/u-learning (Pena-Bandalaria 2007).'
              ],
              keyTerms: ['Inclusivity', 'Braille Courseware', 'Affordability', 'u-Learning', 'Mixed Media']
            },
            {
              id: 'top-gst107-2-3',
              title: '3.3 Interactivity and Learner-Centeredness',
              readingMinutes: 14,
              content:
                'Interactivity counters the physical separation between stakeholders. Four major interactions exist: (1) Learner-to-content (reading, viewing videos, exploring LMS); (2) Learner-to-instructor (academic guidance, feedback, clarification); (3) Learner-to-learner (peer collaboration, knowledge sharing, group discussion; Sher 2009); and (4) Learner-to-technology or learner-to-interface (mastery of LMS, portal, and software; Hillman et al. 1994). Learner-centeredness (Mykra 2015) shifts the instructional focus from teacher transmission to learner knowledge construction.',
              summaryPoints: [
                '4 Interactions: Content, Instructor, Learner, Technology/Interface.',
                'Active peer collaboration enhances critical thinking (Sher 2009).',
                'Learner-centered paradigm shifts control to the student (Mykra 2015).'
              ],
              keyTerms: ['Learner-to-Content', 'Learner-to-Instructor', 'Learner-to-Learner', 'Learner-to-Technology', 'Learner-Centeredness']
            }
          ]
        },
        {
          id: 'unit-gst107-m1-u3',
          unitNumber: '3.0',
          title: 'Unit 3: Teaching and Learning in the Open and Distance Learning System',
          pageRange: '27-35',
          overview:
            'Analyzes the ODL learning environment as the "third teacher" (Fraser 2012, Hall 2001). Examines the evolving roles of the ODL teacher (creator/manager, instructor, facilitator) and learner demographics at NOUN (Adewale 2014 study: 40% male, 60% female; 70% working-class; youthfulness). Details the seven essential learning characteristics: independence, intrinsic motivation, technological adaptation, self-discipline, active participation, effective communication, and reflective skills.',
          objectives: [
            'Define the ODL learning environment as the "third teacher"',
            'Outline the three fundamental roles of the ODL teacher (Berge 1995, Bull 2013)',
            'Describe the demographic profile of NOUN learners based on empirical studies (Adewale 2014)',
            'Enumerate and apply the seven core characteristics of successful distance learners'
          ],
          unitRecapPoints: [
            'The learning environment is the "third teacher" (Fraser 2012), encompassing physical, virtual, social, and psychological conditions (Hall 2001, Warger & Dobbin 2009).',
            'Teacher Roles: (1) Creator and Manager of the Learning Environment (Berge 1995; Bull 2013 "tour guide"); (2) Instructor (Pereira 2005; academic calendar, rubrics, feedback); (3) Facilitator (collaborative learning manager and discussion compere).',
            'NOUN Learner Demographics (Adewale 2014): 40% male, 60% female; 40% aged 21-30, 25% aged 31-40; 70% employed/self-employed, 30% unemployed.',
            '7 Core Learner Characteristics: (1) Independence versus Collaboration; (2) Intrinsic Motivation; (3) Adaptation to Technology; (4) Self-Discipline; (5) Active Participation; (6) Effective Communication (avoiding monosyllabic replies); (7) Reflective Skills (Dabbagh 2007).'
          ],
          topics: [
            {
              id: 'top-gst107-3-1',
              title: '3.1 The Learning Environment as Third Teacher',
              readingMinutes: 12,
              content:
                'Hall (2001) defines a learning environment as an all-in-one software solution that facilitates online learning. Beyond software, Fraser (2012) and Warger & Dobbin (2009) note that it encompasses social, technological, and psychological conditions, functioning as a "third teacher" that influences how students interact, collaborate, and think critically.',
              summaryPoints: [
                'Learning environment transcends physical space to become the "third teacher".',
                'Combines digital platforms, resources, social context, and emotional support.'
              ],
              keyTerms: ['Third Teacher', 'Learning Environment', 'Hall 2001', 'Fraser 2012']
            },
            {
              id: 'top-gst107-3-2',
              title: '3.2 Roles of the Teacher in ODL',
              readingMinutes: 14,
              content:
                'The teacher in ODL shifts from the traditional "dispenser of information" (ONeil 2006) to three specialized roles: (1) Creator and Manager of the Learning Environment (Berge 1995; Bull 2013 compares the online teacher to a "tour guide" directing attention to key ideas); (2) Instructor (Pereira 2005; clarifying content, setting explicit learning targets, and evaluating outcomes); and (3) Facilitator (managing discussions in forums as a compere).',
              summaryPoints: [
                'Teacher transitions from dispenser to tour guide and facilitator.',
                'Key roles: Environment manager, content instructor, forum facilitator.'
              ],
              keyTerms: ['Tour Guide Metaphor', 'Berge 1995', 'Bull 2013', 'Pereira 2005', 'Facilitator']
            },
            {
              id: 'top-gst107-3-3',
              title: '3.3 Demographics and Characteristics of ODL Learners',
              readingMinutes: 16,
              content:
                'Empirical research by Adewale (2014) at NOUN Lagos Study Centre revealed that 60% of students are female and 40% male; 65% are aged 21-40 (supporting Gao 2012); and 70% are working class (45.2% employed, 24.8% self-employed, 30% unemployed). Successful ODL learners exhibit seven behavioral characteristics: Independence and collaboration (Anderson & Garrison 1998), intrinsic motivation, technological adaptability, self-discipline (Cheurprakobkit et al. 2002), active participation (Seckel 2007), dialogical communication skills (Dabbagh 2007), and reflective skills.',
              summaryPoints: [
                'Demographics: 60% female, 65% aged 21-40, 70% working-class in NOUN.',
                '7 behavioral hallmarks: Independence, Motivation, Tech skills, Self-Discipline, Active Participation, Dialogical Communication, Reflective Skills.'
              ],
              keyTerms: ['Adewale 2014', 'Gao 2012', 'Self-Discipline', 'Netiquette', 'Reflective Skills']
            }
          ]
        }
      ]
    },
    {
      id: 'mod-gst107-2',
      moduleNumber: 2,
      title: 'Module 2: Study Skills for the Distance Learner',
      description:
        'The four fundamental study and communication skills (Listening, Speaking, Reading, Writing) and specialized study methods for academic excellence.',
      units: [
        {
          id: 'unit-gst107-m2-u1',
          unitNumber: '1.0',
          title: 'Unit 1: Listening',
          pageRange: '36-44',
          overview:
            'Explores listening as the primary learning medium and first fundamental language skill. Distinguishes hearing (passive, physiological) from listening (active, cognitive). Details efficient listening strategies, the four purposes of listening, the five essential listening components, barriers, and note-taking systems (Linear, Cornell Method, Outline, Mapping, Charting, Sentence Method).',
          objectives: [
            'Differentiate between physiological hearing and cognitive listening',
            'Apply strategies for efficient listening in academic settings',
            'Identify and distinguish the four major types of listening',
            'Recognize physical, physiological, psychological, linguistic, and perceptual barriers',
            'Apply the six note-taking methods, specifically the Cornell two-column format'
          ],
          unitRecapPoints: [
            'Hearing is passive and physiological; listening is active, mental, and cognitive.',
            'Strategies for efficient listening: Stop talking and pay attention; maintain eye contact; empathize with the speaker; remove physical/mental distractions; watch for non-verbal cues; take notes.',
            '4 Types of Listening: (1) Active/Attentive (listening to learn); (2) Critical/Analytical (evaluating arguments and evidence); (3) Empathic/Therapeutic (providing emotional support); (4) Appreciative (enjoyment, music, poetry).',
            '5 Essential Components: Hearing/Receiving, Comprehending/Understanding, Remembering, Evaluating, Responding/Feedback.',
            'Note-Taking Methods: Linear notes; Cornell Method (two unequal columns: narrow left for cues/keywords, wide right for descriptions/notes, bottom for summary); Outline Method; Mapping Method (spider diagram/concept map); Charting Method (rows and columns); Sentence Method.'
          ],
          topics: [
            {
              id: 'top-gst107-2-1-1',
              title: '3.1 Listening vs. Hearing and Listening Strategies',
              readingMinutes: 14,
              content:
                'Listening is an active, cognitive process that involves receiving sound, interpreting messages, evaluating meaning, and responding appropriately. In contrast, hearing is merely a passive physiological response where sounds filter into the ears. Efficient listening requires: stopping talking, maintaining eye contact, empathizing with an open mind, removing distractions, observing non-verbal cues (posture, facial expressions), and taking structured notes.',
              summaryPoints: [
                'Listening is cognitive; hearing is physiological.',
                '6 core strategies for efficient listening.'
              ],
              keyTerms: ['Cognitive Process', 'Physiological Process', 'Active Listening', 'Non-Verbal Cues']
            },
            {
              id: 'top-gst107-2-1-2',
              title: '3.2 Types, Barriers, and Components of Listening',
              readingMinutes: 15,
              content:
                'Four types of listening: Active/Attentive (academic lectures), Critical/Analytical (debates, research critique), Empathic/Therapeutic (counseling, emotional support), and Appreciative (recreational listening). Barriers include: Physical (noise, hearing loss), Physiological (fatigue, illness), Psychological (anxiety, bias), Linguistic (jargon, speech pace), and Perceptual (differing viewpoints). The five components are: Hearing/Receiving, Comprehending, Remembering, Evaluating, and Responding/Feedback.',
              summaryPoints: [
                '4 listening types: Active, Critical, Empathic, Appreciative.',
                '5 barriers: Physical, Physiological, Psychological, Linguistic, Perceptual.',
                '5 stages: Receive, Comprehend, Remember, Evaluate, Feedback.'
              ],
              keyTerms: ['Critical Listening', 'Empathic Listening', 'Perceptual Barriers', 'Feedback']
            },
            {
              id: 'top-gst107-2-1-3',
              title: '3.3 Note-Taking Methods in Distance Learning',
              readingMinutes: 15,
              content:
                'Note-taking significantly reinforces retention and creates permanent study records. Six major systems: (1) Linear notes (simple sentences/lists); (2) Cornell Method (two unequal columns: narrow left column for cues/keywords, wider right column for notes, and lower margin for page summary); (3) Outline Method (bullet points, numbering, and indentation); (4) Mapping Method (concept maps radiating from central idea); (5) Charting Method (rows and columns for comparison/contrast); (6) Sentence Method (numbered individual sentences).',
              summaryPoints: [
                'Cornell Method: narrow cue column, wide notes column, bottom summary.',
                'Mapping Method: visual spider/branching diagrams.',
                'Charting: structured comparison tables.'
              ],
              keyTerms: ['Cornell Method', 'Mapping Method', 'Outline Method', 'Charting Method']
            }
          ]
        },
        {
          id: 'unit-gst107-m2-u2',
          unitNumber: '2.0',
          title: 'Unit 2: Speaking',
          pageRange: '45-50',
          overview:
            'Explores speaking as a productive study and communication skill. Covers speech types (Informative, Persuasive, Entertainment), overcoming challenges (inhibition, lack of knowledge, mother tongue interference), the four essential components (Grammar, Vocabulary, Pronunciation, Fluency), and the traits of a confident speaker.',
          objectives: [
            'Discuss speaking as an indispensable study skill in distance education',
            'Distinguish informative, persuasive, and entertainment speaking',
            'Address common speaking challenges including mother tongue interference',
            'Master the four components of speaking: grammar, vocabulary, pronunciation, fluency',
            'Develop personal confidence through preparation, practice, and integrity'
          ],
          unitRecapPoints: [
            'Speaking conveys ideas, thoughts, and feelings through verbal language.',
            '3 Types of Speaking: (1) Informative (sharing objective, factual knowledge without bias); (2) Persuasive (influencing attitudes, beliefs, or actions); (3) Entertainment (amusing and engaging while delivering a message).',
            'Challenges: Inhibition/anxiety, lack of subject matter knowledge (overcome by preparation), and accents/mother tongue interference (overcome by listening to proficient speakers and reading aloud).',
            '4 Components: Grammar (structural rules), Vocabulary (stock of appropriate words), Pronunciation (articulation, stress, intonation), and Fluency (smooth, confident speed without frequent pauses).',
            'Confident Speaker Traits: Integrity, authenticity (be yourself), focusing on contributing rather than approval, frequent practice, and deep content knowledge.'
          ],
          topics: [
            {
              id: 'top-gst107-2-2-1',
              title: '3.1 Speaking as a Study Skill and Types of Speaking',
              readingMinutes: 12,
              content:
                'Speaking is essential for seeking clarification, presenting seminar papers, and participating in tutorials. Informative speaking educates objectively without bias (e.g. course lectures). Persuasive speaking uses evidence, logic, and testimony to influence beliefs (e.g. academic debates). Entertainment speaking uses humor and storytelling to engage audiences during ceremonies and events.',
              summaryPoints: [
                'Speaking enables active academic collaboration.',
                'Informative (facts), Persuasive (influence), Entertainment (enjoyment).'
              ],
              keyTerms: ['Informative Speaking', 'Persuasive Speaking', 'Entertainment Speaking']
            },
            {
              id: 'top-gst107-2-2-2',
              title: '3.2 Components, Challenges, and Speaker Confidence',
              readingMinutes: 14,
              content:
                'Four components dictate effective speech: Grammar, Vocabulary, Pronunciation (stress, intonation, rhythm), and Fluency (natural speech flow). Overcoming stage fright requires thorough preparation, frequent practice, and focusing on audience value rather than seeking applause.',
              summaryPoints: [
                'Grammar, vocabulary, pronunciation, fluency constitute core speech competencies.',
                'Confidence stems from preparation, practice, and integrity.'
              ],
              keyTerms: ['Mother Tongue Interference', 'Fluency', 'Pronunciation', 'Speaker Integrity']
            }
          ]
        },
        {
          id: 'unit-gst107-m2-u3',
          unitNumber: '3.0',
          title: 'Unit 3: Reading',
          pageRange: '51-62',
          overview:
            'Examines reading as a receptive cognitive skill (Dadzie 2008). Covers reading purposes (pleasure, information, study reading, general understanding), four reading approaches (Previewing, Skimming, Scanning, Detailed Reading), the 5-step SQ3R methodology (Survey, Question, Read, Recite, Review), five components of reading, and eliminating bad reading habits.',
          objectives: [
            'Define reading and reading comprehension according to Dadzie (2008)',
            'Differentiate previewing, skimming, scanning, and detailed reading',
            'Execute the 5 stages of the SQ3R study reading method',
            'Explain the five components of reading: phonics, phonemics, vocabulary, fluency, comprehension',
            'Eliminate regression, vocalization, sub-vocalization, and word-by-word reading'
          ],
          unitRecapPoints: [
            'Reading is the ability to understand words and apply knowledge for personal growth (Dadzie 2008). Comprehension is the ultimate goal.',
            '4 Approaches: (1) Previewing (examining headings, outlines, summaries); (2) Skimming (rapid selective reading for gist); (3) Scanning (rapid eye movements to locate specific data like dates, names, formulas); (4) Detailed Reading (slow, concentrated, deep study).',
            'SQ3R Method: Survey (overview of titles, headings, summaries); Question (turn headings into questions); Read (read actively to find answers); Recite/Recall (summarize in own words); Review (revisit notes periodically to prevent cramming).',
            '5 Components: Phonics (letter-sound relationships in print), Phonemics (individual spoken sound units), Vocabulary, Fluency, Comprehension.',
            'Bad Habits to Overcome: Regression (unnecessary re-reading), Vocalization (reading aloud), Sub-vocalization (mental pronunciation), and Reading one word at a time (should read in chunks).'
          ],
          topics: [
            {
              id: 'top-gst107-2-3-1',
              title: '3.1 Nature of Reading and Four Approaches',
              readingMinutes: 14,
              content:
                'Reading involves both perception and thought. The four approaches to reading suit different purposes: Previewing gains an overview; Skimming extracts the essence of vast materials; Scanning swiftly locates specific pieces of information; Detailed Reading examines complex academic texts and theoretical proofs.',
              summaryPoints: [
                'Reading is active cognitive decoding and comprehension.',
                'Previewing (orientation), Skimming (gist), Scanning (specific facts), Detailed reading (mastery).'
              ],
              keyTerms: ['Dadzie 2008', 'Previewing', 'Skimming', 'Scanning', 'Detailed Reading']
            },
            {
              id: 'top-gst107-2-3-2',
              title: '3.2 The SQ3R Method and Reading Components',
              readingMinutes: 16,
              content:
                'SQ3R (Survey, Question, Read, Recite, Review) transforms passive reading into active inquiry. Turning section headings into questions creates clear study goals. Reciting in ones own words cements memory. Five reading components: Phonics (grapheme-phoneme rules), Phonemics (sound units like b-e-n-t = 4 phonemes), Vocabulary, Fluency, and Comprehension.',
              summaryPoints: [
                'SQ3R: Survey, Question, Read, Recite/Recall, Review.',
                'Phonics (written) vs Phonemics (spoken sounds).',
                'Comprehension is the core objective of academic reading.'
              ],
              keyTerms: ['SQ3R', 'Survey', 'Recite', 'Phonics', 'Phonemes', 'Comprehension']
            },
            {
              id: 'top-gst107-2-3-3',
              title: '3.3 Overcoming Bad Reading Habits',
              readingMinutes: 12,
              content:
                'Bad reading habits reduce reading speed and impair comprehension: (1) Regression (skipping backwards repeatedly); (2) Vocalization (pronouncing words aloud); (3) Sub-vocalization (pronouncing words internally in the throat/head); (4) Reading one word at a time. Learners must train their eyes to read in word chunks and eliminate internal/external distractions.',
              summaryPoints: [
                'Avoid regression, vocalization, and sub-vocalization.',
                'Read in chunks to accelerate speed and comprehension.'
              ],
              keyTerms: ['Regression', 'Vocalization', 'Sub-vocalization', 'Chunking Text']
            }
          ]
        },
        {
          id: 'unit-gst107-m2-u4',
          unitNumber: '4.0',
          title: 'Unit 4: Writing',
          pageRange: '63-74',
          overview:
            'Introduces academic and professional writing as a process of discovery and channel of communication. Covers four basic essay types, note-taking versus note-making, the five stages of the writing process, and the structural anatomy of paragraphs (topic sentences, transitional linking devices, unity, and coherence).',
          objectives: [
            'Explain writing as a process of discovery and communication',
            'Differentiate the four essay forms: descriptive, narrative, argumentative, expository',
            'Distinguish note-taking from note-making (Northedge 2010)',
            'Execute the 5 stages of writing: prewriting, first draft, revision, editing, final draft',
            'Construct unified, coherent paragraphs using effective transitional devices'
          ],
          unitRecapPoints: [
            'Writing is both a process of discovery (clarifying thought) and a means of communication to an audience.',
            '4 Essay Types: Descriptive (sensory details), Narrative (storytelling, usually 1st person), Argumentative (persuading reader to accept viewpoint), Expository (research-based factual explanation and evaluation).',
            'Note-Taking vs Note-Making: Note-taking occurs during listening (lectures); Note-making is an individual activity during private reading ("thinking on paper or screen" - Northedge).',
            '5 Writing Stages: (1) Prewriting/Outlining (brainstorming); (2) Writing First Draft; (3) Revision (strengthening central ideas and organization); (4) Editing (pruning words, correcting grammar/punctuation); (5) Final Draft.',
            'Paragraph Structure: Must possess unity (one controlling idea), coherence (smooth logical connection), and adequate development. Uses topic sentences and transitional devices (result: therefore; contrast: however; sequence: first, second).'
          ],
          topics: [
            {
              id: 'top-gst107-2-4-1',
              title: '3.1 Writing as Discovery, Communication, and Essay Types',
              readingMinutes: 14,
              content:
                'Writing clarifies what one knows. Four fundamental essay categories: (1) Descriptive (appeals to senses); (2) Narrative (chronological storytelling in first person); (3) Argumentative (presents logical evidence to convince); (4) Expository (objective explanation and evaluation of concepts).',
              summaryPoints: [
                'Writing is discovery and audience-directed communication.',
                'Descriptive, Narrative, Argumentative, and Expository essays.'
              ],
              keyTerms: ['Process of Discovery', 'Descriptive Essay', 'Narrative Essay', 'Argumentative Essay', 'Expository Essay']
            },
            {
              id: 'top-gst107-2-4-2',
              title: '3.2 Note-Taking vs. Note-Making and The Writing Stages',
              readingMinutes: 15,
              content:
                'Note-taking involves listening and paraphrasing spoken ideas. Note-making is done during private reading and reflection ("thinking on paper" - Northedge). The five writing stages: Prewriting (brainstorming and outlining), First Draft (free-flowing ideas), Revision (evaluating thesis and argument strength), Editing (pruning redundancy and fixing errors), and Final Draft.',
              summaryPoints: [
                'Note-taking is receptive (listening); note-making is generative (reading & reflecting).',
                'Writing cycle: Prewrite -> Draft -> Revise -> Edit -> Finalize.'
              ],
              keyTerms: ['Note-Taking', 'Note-Making', 'Northedge', 'Prewriting', 'Revision', 'Editing']
            },
            {
              id: 'top-gst107-2-4-3',
              title: '3.3 Paragraphing, Transitional Devices, Unity, and Coherence',
              readingMinutes: 15,
              content:
                'A paragraph is a unit of thought governed by a topic sentence. Good paragraphs demonstrate: Unity (oneness of subject matter), Coherence (logical flow linking sentences), and Adequate Development. Transitional devices link ideas: Result (therefore, consequently), Example (for instance, specifically), Contrast (however, on the other hand), Sequence (first, second, finally), and Addition (furthermore, moreover).',
              summaryPoints: [
                'Paragraph anatomy: Topic sentence, supporting details, concluding link.',
                'Unity (one central idea) and Coherence (logical transitional ties).'
              ],
              keyTerms: ['Topic Sentence', 'Unity', 'Coherence', 'Transitional Devices']
            }
          ]
        },
        {
          id: 'unit-gst107-m2-u5',
          unitNumber: '5.0',
          title: 'Unit 5: Study Strategies',
          pageRange: '75-87',
          overview:
            'Guides learners to identify their optimal learning style (Visual, Auditory/Aural, Verbal/Reading-Writing, Tactile/Kinaesthetic). Evaluates effective study techniques (social learning, teaching others, deducing, mock tests), mnemonic devices (acronyms SMART/SWOT, rhymes, chunking, visual imagery), and systematic examination preparation.',
          objectives: [
            'Identify personal learning styles: visual, auditory, verbal, and kinaesthetic',
            'Utilize memory and mnemonic devices (acronyms, rhymes, chunking, visual imagery)',
            'Establish productive study habits: time management, distraction-free environment, study daily',
            'Prepare effectively for semester examinations using past questions and revision timetables'
          ],
          unitRecapPoints: [
            '4 Learning Styles: (1) Visual (learns via images, diagrams, color coding, mind maps); (2) Auditory (learns via listening, recording notes, discussions); (3) Verbal/Reading-Writing (learns via textbooks, rewriting notes, lists); (4) Tactile/Kinaesthetic (learns by doing, physical activity, building models).',
            'Mnemonic Devices: Acronyms (e.g. SMART: Specific, Measurable, Attainable, Relevant, Timely; SWOT: Strengths, Weaknesses, Opportunities, Threats); Rhymes (e.g. "30 days hath September"); Chunking (breaking phone numbers/data into bite-sized units); Visual Imagery (associating mental pictures).',
            'Effective Habits: Pick a dedicated space and time, study daily to prevent cramming, plan time with wall planners/alarms, review weekly, take short regular breaks.',
            'Exam Preparation: Create realistic revision timetables, practice authentic past examination questions under timed conditions, stay hydrated, eat nutritious foods (fish, nuts, yoghurt, fruits), and review answer booklets before submission.'
          ],
          topics: [
            {
              id: 'top-gst107-2-5-1',
              title: '3.1 Learning Styles and Study Techniques',
              readingMinutes: 14,
              content:
                'No learning style is superior to another; learners often blend styles based on task demands. Visual learners utilize flowcharts and mind maps; auditory learners benefit from podcasts and lecture playback; verbal learners thrive on note rewriting; kinaesthetic learners require active role-play and physical breaks.',
              summaryPoints: [
                'Visual, Auditory, Verbal, Kinaesthetic profiles.',
                'Tailor study methods to personal cognitive strengths.'
              ],
              keyTerms: ['Visual Learner', 'Auditory Learner', 'Verbal Learner', 'Kinaesthetic Learner']
            },
            {
              id: 'top-gst107-2-5-2',
              title: '3.2 Memory and Mnemonic Devices',
              readingMinutes: 14,
              content:
                'Mnemonics encode and trigger retrieval of complex data: Acronyms (SMART goals, SWOT analysis, UNICEF); Rhymes; Chunking (grouping digits or lists into manageable chunks); and Visual Imagery (associating vivid mental pictures with abstract historical or theoretical concepts).',
              summaryPoints: [
                'Mnemonics accelerate encoding and long-term retention.',
                'Acronyms, rhymes, chunking, and visual imagery.'
              ],
              keyTerms: ['Mnemonic Devices', 'SMART Acronym', 'SWOT', 'Chunking', 'Mental Imagery']
            },
            {
              id: 'top-gst107-2-5-3',
              title: '3.3 Time Management and Examination Preparation',
              readingMinutes: 15,
              content:
                'Success requires daily study sessions to prevent last-minute cramming. Prioritize difficult topics early in sessions. Preparing for exams involves: practicing past exam papers under timed conditions, using summary one-page diagrams, taking short breaks, maintaining hydration and nutrition, and reading all instructions carefully on exam day.',
              summaryPoints: [
                'Daily revision eliminates examination panic.',
                'Practice past questions to master pacing and question formats.'
              ],
              keyTerms: ['Time Management', 'Past Question Practice', 'Study Breaks', 'Exam Day Strategy']
            }
          ]
        }
      ]
    },
    {
      id: 'mod-gst107-3',
      moduleNumber: 3,
      title: 'Module 3: Assessment and Evaluation Modes in Open and Distance Learning (ODL)',
      description:
        'Comprehensive assessment architecture in ODL: formative vs. summative evaluation, continuous assessment (TMA & CMA), semester examinations (POP & e-Exam), and assessment of non-examinable courses.',
      units: [
        {
          id: 'unit-gst107-m3-u1',
          unitNumber: '1.0',
          title: 'Unit 1: Overview of Assessment in ODL',
          pageRange: '88-94',
          overview:
            'Clarifies the distinction between assessment (gathering evidence of learning) and evaluation (value judgments for decision-making). Analyzes six major purposes of assessment (instructional management, selection, placement, classification, guidance, certification) and three assessment paradigms (for learning, of learning, as learning).',
          objectives: [
            'Differentiate between assessment (evidence gathering) and evaluation (value judgment)',
            'Examine Falayajo (2004) conditions for learning improvement through assessment',
            'Identify the six major purposes of assessment in educational institutions',
            'Distinguish Assessment for Learning (formative), Assessment of Learning (summative), and Assessment as Learning (metacognitive)'
          ],
          unitRecapPoints: [
            'Assessment provides the evidence; evaluation determines the worth/value of that evidence to guide decisions.',
            'Purposes of Assessment: (1) Instructional Management (planning instruction, monitoring progress); (2) Selection (WAEC/NECO/admissions where candidates are accepted or rejected); (3) Placement (assigning all learners to ordered instructional levels without rejection); (4) Classification (assigning learners to unordered categories); (5) Guidance and Counselling; (6) Credentialing and Certification.',
            '3 Types of Classroom Assessment: (1) Assessment for Learning (Formative: continuous, diagnostic, provides remediation); (2) Assessment of Learning (Summative: cumulative, conducted at end of semester/session for grading and degrees); (3) Assessment as Learning (fosters metacognitive reflection and self-monitoring).'
          ],
          topics: [
            {
              id: 'top-gst107-3-1-1',
              title: '3.1 Concept of Assessment and Evaluation',
              readingMinutes: 14,
              content:
                'Assessment occupies a vital role in teaching, learning, and certification. Nitko and Brookhart (2007) describe assessment as obtaining information for decision-making. Evaluation is the process of making value judgments about the worth of a students performance. According to Falayajo (2004), assessment improves learning only when test outcomes align with stated curricular objectives.',
              summaryPoints: [
                'Assessment = data collection; Evaluation = qualitative judgment.',
                'Falayajo (2004) alignment principle.'
              ],
              keyTerms: ['Assessment', 'Evaluation', 'Falayajo 2004', 'Nitko & Brookhart']
            },
            {
              id: 'top-gst107-3-1-2',
              title: '3.2 Six Major Purposes of Assessment',
              readingMinutes: 15,
              content:
                'Six major functions: (1) Instructional Management; (2) Selection (acceptance or rejection based on entrance exams); (3) Placement (assigning learners to ordered instructional levels without rejection; Cronbach 1990); (4) Classification (assignment to unordered categories/programs); (5) Guidance and Counselling (aptitude tests, interest inventories); (6) Credentialing and Certification (minimum competency verification).',
              summaryPoints: [
                'Selection accepts/rejects; Placement orders without rejection; Classification assigns to unordered categories.',
                'Certification confirms minimum competence.'
              ],
              keyTerms: ['Instructional Management', 'Selection', 'Placement', 'Classification', 'Certification']
            },
            {
              id: 'top-gst107-3-1-3',
              title: '3.3 Three Types of Classroom Assessment',
              readingMinutes: 15,
              content:
                'Classroom assessment is divided into: (1) Assessment FOR Learning (Formative assessment: diagnostic, ongoing feedback, remediation to improve learning); (2) Assessment OF Learning (Summative assessment: cumulative judgment at semester end for marks, grades, and degree awards); (3) Assessment AS Learning (metacognition where learners self-monitor, self-assess, and direct their learning journey).',
              summaryPoints: [
                'Formative (for learning), Summative (of learning), Metacognitive (as learning).'
              ],
              keyTerms: ['Assessment for Learning', 'Assessment of Learning', 'Assessment as Learning', 'Metacognition']
            }
          ]
        },
        {
          id: 'unit-gst107-m3-u2',
          unitNumber: '2.0',
          title: 'Unit 2: Instructional-Based Assessment Modes',
          pageRange: '95-97',
          overview:
            'Focuses on embedded instructional assessments in ODL: self-assessment exercises (in-text questions that provide immediate formative feedback without contributing to final grades) and continuous assessment assignments (TMA and CMA). In NOUN, continuous assessment consists of four CMAs (80 multiple-choice questions total, 20 per assignment), accounting for 30% of the total course grade.',
          objectives: [
            'Explain the role and value of in-text self-assessment in ODL',
            'Contrast Tutor-Marked Assignments (TMAs) with Computer-Marked Assignments (CMAs)',
            'Detail NOUNs continuous assessment structure (4 CMAs, 80 MCQs, 30% weight)'
          ],
          unitRecapPoints: [
            'Self-assessment provides immediate feedback, builds learner autonomy, and diagnoses gaps without affecting final grades.',
            'TMA involves human facilitator marking with personalized comments.',
            'CMA is computer-administered and automatically graded on the university portal.',
            'At NOUN, continuous assessment comprises 4 CMAs of 20 multiple-choice questions each (80 MCQs total per course), accounting for 30% of the course grade.'
          ],
          topics: [
            {
              id: 'top-gst107-3-2-1',
              title: '3.1 In-Text and Self-Assessment',
              readingMinutes: 12,
              content:
                'Self-assessment activities embedded in study texts enable learners to evaluate understanding independently. Honest self-testing reveals learning gaps, promotes self-reflection, and prepares students for formal assessments without fear of grade penalties.',
              summaryPoints: [
                'Self-assessment is formative, private, and ungraded.',
                'Encourages metacognitive awareness and active study.'
              ],
              keyTerms: ['Self-Assessment', 'In-Text Exercises', 'Formative Feedback']
            },
            {
              id: 'top-gst107-3-2-2',
              title: '3.2 Tutor-Marked (TMA) and Computer-Marked (CMA) Assignments',
              readingMinutes: 14,
              content:
                'Tutor-Marked Assignments (TMAs) are graded by human facilitators who provide detailed qualitative commentary. Computer-Marked Assignments (CMAs) are uploaded to the online portal and automatically scored. In NOUN, continuous assessment requires students to complete 4 CMAs of 20 items each (80 questions total), contributing 30% to the semester grade.',
              summaryPoints: [
                'TMAs provide qualitative facilitator feedback.',
                'NOUN CMAs: 4 tests x 20 MCQs = 80 questions (30% weight).'
              ],
              keyTerms: ['TMA', 'CMA', 'Continuous Assessment', '30% Weight']
            }
          ]
        },
        {
          id: 'unit-gst107-m3-u3',
          unitNumber: '3.0',
          title: 'Unit 3: Semester Examination',
          pageRange: '98-101',
          overview:
            'Examines semester summative examinations at NOUN. Analyzes the two examination modes: Pen-on-Paper (POP) for 300-800 level students and Law, and Electronic Examinations (e-Exam) for 100-200 level students and all GST courses. Details examination preparation strategies, revision tips (Northedge 2010), and common pitfalls to avoid.',
          objectives: [
            'Distinguish between Pen-on-Paper (POP) and Electronic Examination (e-Exam) modes at NOUN',
            'Explain the structure of POP questions for 300-level (answer 3 of 5) and 400-500 level (answer 4 of 6)',
            'Apply Northedges (2010) examination revision principles',
            'Identify key examination mistakes: misinterpreting instruction words, poor time management, malpractice'
          ],
          unitRecapPoints: [
            'NOUN conducts semester examinations through two modes: Pen-on-Paper (POP) and e-Examination.',
            'e-Examination: Objective multiple-choice items on computers; taken by 100 and 200 level students, and all GST courses across all levels including postgraduate.',
            'Pen-on-Paper (POP): Essay-type written in answer booklets; taken by 300 to 800 level undergraduates and postgraduate students (except GST). 300-level students typically answer 3 out of 5 questions; 400-500 level answer 4 out of 6 questions.',
            'Final exam contributes 70% of the total course mark (combined with 30% continuous assessment = 100%).',
            'Revision Advice (Northedge 2010): Start early, use past questions, summarize notes, avoid memorizing every sentence without understanding.',
            'Pitfalls to Avoid: Not answering the specific question, failing to use approved course concepts, stuffing answers with memorized names, poor presentation, illegible handwriting, and examination malpractice.'
          ],
          topics: [
            {
              id: 'top-gst107-3-3-1',
              title: '3.1 Structure of NOUN Semester Examinations',
              readingMinutes: 14,
              content:
                'NOUN operates a dual-mode exam architecture: (1) e-Examinations for 100/200 levels and all GST courses; (2) Pen-on-Paper (POP) essay exams for 300-level (3 of 5 questions) and 400-500/postgraduate levels (4 of 6 questions). The semester examination accounts for 70% of the total course grade.',
              summaryPoints: [
                'e-Exam: 100/200 level and all GST courses.',
                'POP: 300-800 levels (Law, PG). 300-level answers 3 of 5; 400+ answers 4 of 6.',
                'Final examination weight = 70%.'
              ],
              keyTerms: ['e-Examination', 'Pen-on-Paper (POP)', '3 of 5 Rule', '4 of 6 Rule', '70% Final Weight']
            },
            {
              id: 'top-gst107-3-3-2',
              title: '3.2 Preparation Tips and Examination Pitfalls',
              readingMinutes: 15,
              content:
                'Northedge (2010) highlights that successful examinees begin revision weeks ahead, construct summary notes, and practice past examination questions under timed conditions. Students must analyze instructional command words (discuss, explain, compare, evaluate, justify) and manage time proportionally according to mark allocations.',
              summaryPoints: [
                'Northedge (2010) revision strategies.',
                'Parse command verbs: discuss, compare, evaluate, justify.',
                'Avoid examination malpractice and poor presentation.'
              ],
              keyTerms: ['Northedge 2010', 'Command Verbs', 'Time Management', 'Exam Malpractice']
            }
          ]
        },
        {
          id: 'unit-gst107-m3-u4',
          unitNumber: '4.0',
          title: 'Unit 4: Assessment of Non-Examinable Courses',
          pageRange: '102-113',
          overview:
            'Focuses on practical, experiential courses evaluated without written semester examinations: final-year undergraduate research projects (5-chapter structure, Faculty of Education rubric), practicums (6-week field placement), Students Industrial Work Experience Scheme (SIWES, 24 weeks / 6 months funded by ITF, 1:10 staff-student ratio, logbooks, Form 8), seminar presentations, teaching practice (6 weeks, 2 supervisor visits), and science practicals.',
          objectives: [
            'Describe the five-chapter structure of academic research projects',
            'Differentiate between practicums, internships, and SIWES',
            'Explain SIWES operational requirements: ITF Form 8, 24-week minimum duration, 1:10 supervisor ratio',
            'Detail the assessment criteria for teaching practice (Faculty of Education) and science laboratory practicals'
          ],
          unitRecapPoints: [
            'Non-examinable courses evaluate authentic real-life application through research projects, practicums, SIWES, teaching practice, and seminars.',
            'Research Projects: Standard 5-chapter format (Ch 1: Introduction; Ch 2: Literature Review; Ch 3: Methodology; Ch 4: Data Analysis & Discussion; Ch 5: Summary, Conclusion & Recommendations). Faculty of Education allocates 5 marks for preliminary pages.',
            'Practicum: 6-week supervised field experience (common in Education, Nursing, Social Work) assessed by internal/external supervisors via assessment sheets.',
            'SIWES (ITF Programme): Minimum 24 weeks (6 months) duration for funding; 1:10 trainer-to-student supervision ratio; mandatory logbooks, ITF Form 8, and formal technical reports.',
            'Teaching Practice: 6 weeks in approved schools, evaluated over 2 supervisory visits on lesson notes, instructional materials, delivery, and evaluation.',
            'Science Laboratory Practicals: Assessed on experimental procedure, observation, precautions, inferences, accuracy, and reports.'
          ],
          topics: [
            {
              id: 'top-gst107-3-4-1',
              title: '3.1 Research Project Structure and Assessment',
              readingMinutes: 15,
              content:
                'Every undergraduate must submit an independent research project. Standard 5 chapters: Chapter 1 (Introduction, problem statement, hypotheses, objectives); Chapter 2 (Literature review, theoretical/conceptual framework); Chapter 3 (Methodology: design, population, sample, instruments, validity/reliability, analysis methods); Chapter 4 (Data analysis and discussion); Chapter 5 (Summary, conclusion, recommendations). Evaluation covers preliminary pages (5 marks), methodology (20 marks), data analysis (20 marks), introduction (15 marks), literature review (10 marks), referencing (10 marks APA), and neatness (10 marks).',
              summaryPoints: [
                '5 chapters: Introduction, Literature Review, Methodology, Analysis, Conclusion.',
                'Assessed via standard Faculty rubrics with APA referencing.'
              ],
              keyTerms: ['5 Chapters', 'Methodology', 'Data Analysis', 'APA Referencing']
            },
            {
              id: 'top-gst107-3-4-2',
              title: '3.2 Practicum and SIWES Guidelines',
              readingMinutes: 16,
              content:
                'Practicum is a 6-week supervised field placement where students observe and apply theories in workplace settings. SIWES (Students Industrial Work Experience Scheme) is an Industrial Training Fund (ITF) initiative designed to bridge theory and practice for occupationally related courses. Minimum duration is 24 weeks (6 months). Employers assign trainers at a 1:10 ratio. Students must maintain daily logbooks, submit ITF Form 8, and write a comprehensive technical report.',
              summaryPoints: [
                'Practicum: 6 weeks supervised field application.',
                'SIWES: 24 weeks (6 months) ITF funded; 1:10 supervision ratio; logbooks & Form 8.'
              ],
              keyTerms: ['Practicum', 'SIWES', 'ITF Form 8', 'Logbook', '24 Weeks']
            },
            {
              id: 'top-gst107-3-4-3',
              title: '3.3 Teaching Practice, Seminars, and Science Practicals',
              readingMinutes: 14,
              content:
                'Teaching practice lasts 6 weeks in schools of choice, with 2 assessment visits by university supervisors assessing lesson notes, objectives, presentation, and class management. Seminars require research reports defended before external assessors at Study Centres. Science laboratory practicals are graded on precision, experimental precautions, observations, and inference.',
              summaryPoints: [
                'Teaching practice: 6 weeks, 2 supervisor visits.',
                'Seminars defended before external assessors at Study Centres.',
                'Laboratory reports graded on experimental accuracy and scientific inferences.'
              ],
              keyTerms: ['Teaching Practice', 'Lesson Notes', 'Seminar Defense', 'Science Practicals']
            }
          ]
        }
      ]
    },
    {
      id: 'mod-gst107-4',
      moduleNumber: 4,
      title: 'Module 4: Learners Support Services',
      description:
        'The comprehensive support infrastructure in ODL: definitions, cognitive/affective/systemic functions, classifications, institutional delivery sources (Study Centres, DICT, Registry, Library), and empirical benefits on student retention.',
      units: [
        {
          id: 'unit-gst107-m4-u1',
          unitNumber: '1.0',
          title: 'Unit 1: Definition and Purposes of Learners Support Services',
          pageRange: '114-117',
          overview:
            'Examines foundational definitions of learner support (Garrison & Bayton 1987, Tait 1995, SAIDE 1999, Simpson 2002). Analyzes Taits (2000) three functions: Cognitive (mastering course materials), Affective (emotional resilience and community belonging), and Systemic (transparent administrative and student records processes).',
          objectives: [
            'Define learners support services according to Garrison, Tait, SAIDE, and Simpson',
            'Contrast academic support with non-academic support (Simpson 2002)',
            'Explain the Cognitive, Affective, and Systemic functions of learner support (Tait 2000)',
            'Identify the five elements of effective support services'
          ],
          unitRecapPoints: [
            'Garrison & Bayton (1987): Resources accessible to learners to facilitate the educational transaction.',
            'Tait (1995): Range of activities complementing mass-produced materials (tutoring, counselling, study centre organisation).',
            'Simpson (2002) distinguishes Academic Support (defining course territory, explaining concepts, feedback, numeracy/literacy) from Non-Academic Support (advising, advocacy, administration, practical help).',
            '3 Functions (Tait 2000): (1) Cognitive (helps students understand, acquire, and apply knowledge); (2) Affective (supports emotional well-being, minimizes isolation, builds self-esteem); (3) Systemic (establishes transparent, learner-friendly administrative processes).',
            'Elements of Effective Support: Responsiveness, Interactivity, Context Specificity, Learner Development, Openness to Change.'
          ],
          topics: [
            {
              id: 'top-gst107-4-1-1',
              title: '3.1 Definitions and Academic vs. Non-Academic Support',
              readingMinutes: 14,
              content:
                'Learner support complements mass-produced curriculum materials (Tait 1995). Simpson (2002) divides support into: Academic Support (concept explanation, learning feedback, study skills) and Non-Academic Support (counseling, administrative problem resolution, advocacy, and welfare).',
              summaryPoints: [
                'Support complements mass-produced courseware.',
                'Simpson (2002): Academic vs. Non-Academic division.'
              ],
              keyTerms: ['Learner Support', 'Simpson 2002', 'Academic Support', 'Non-Academic Support']
            },
            {
              id: 'top-gst107-4-1-2',
              title: '3.2 Cognitive, Affective, and Systemic Functions',
              readingMinutes: 14,
              content:
                'Tait (2000) categorizes support functions into: (1) Cognitive Function (assisting learners to comprehend difficult concepts through facilitation and tutorials); (2) Affective Function (nurturing confidence, motivation, and reducing loneliness/isolation); (3) Systemic Function (establishing efficient registration, examination, and administrative systems from admission to graduation).',
              summaryPoints: [
                'Cognitive: content comprehension and academic performance.',
                'Affective: emotional resilience and peer belonging.',
                'Systemic: seamless administrative and IT services.'
              ],
              keyTerms: ['Cognitive Function', 'Affective Function', 'Systemic Function', 'Tait 2000']
            }
          ]
        },
        {
          id: 'unit-gst107-m4-u2',
          unitNumber: '2.0',
          title: 'Unit 2: Types of Learners Support Services',
          pageRange: '118-121',
          overview:
            'Classifies support services according to Rumajogee (2002) and Nonyongo (2002): (1) Teaching and Learning Services; (2) Social and Personal Support Services; (3) Information Support Services. Details administrative, technical, library, and counselling support channels.',
          objectives: [
            'Classify learner support activities into the three Rumajogee/Nonyongo categories',
            'Examine academic/tutorial support combining face-to-face and online facilitation',
            'Identify social and personal support activities for distance learners',
            'Describe information support services required prior to admission and throughout study'
          ],
          unitRecapPoints: [
            'Classification (Rumajogee 2002; Nonyongo 2002): (1) Teaching and Learning Services; (2) Social and Personal Support Services; (3) Information Support Services.',
            'Teaching & Learning Services: Core support including tutorials, academic advising, TMA feedback, facilitation, and exam administration.',
            'Social & Personal Support: Pre-course counseling, peer groups, career guidance, disability support, minority support, adult learner assistance.',
            'Information Support: Timely fees information, admissions, course registration, exam timetables, student records (Lee 2003).',
            'Sub-categories: Administrative support (web-based portal services), Technical support (ICT troubleshooting), Library support (access to e-books/databases), and Counselling support (academic and psychological advising).'
          ],
          topics: [
            {
              id: 'top-gst107-4-2-1',
              title: '3.1 Three Classifications of Support Services',
              readingMinutes: 14,
              content:
                'Rumajogee (2002) and Nonyongo (2002) group services into: Teaching and Learning (tutorials, facilitation, assessment feedback); Social and Personal (counseling, peer communities, disability accommodation); and Information Support (academic rules, financial guidance, timetables).',
              summaryPoints: [
                'Teaching/learning, social/personal, information support.',
                'Integrated delivery to serve the whole student.'
              ],
              keyTerms: ['Rumajogee 2002', 'Nonyongo 2002', 'Teaching & Learning', 'Social & Personal Support']
            },
            {
              id: 'top-gst107-4-2-2',
              title: '3.2 Administrative, Technical, Library, and Counselling Services',
              readingMinutes: 14,
              content:
                'Administrative support covers admission, registration, and student transcripts (Lee 2003). Technical support monitors media delivery and resolves portal errors. Library support enables access to digital databases, books, and past research projects. Academic counselling at Study Centres assists with curriculum navigation and study challenges.',
              summaryPoints: [
                'Administrative (records/fees), Technical (connectivity/LMS), Library (e-resources), Counselling (academic/personal).'
              ],
              keyTerms: ['Administrative Support', 'Technical Support', 'Library Support', 'Academic Counselling']
            }
          ]
        },
        {
          id: 'unit-gst107-m4-u3',
          unitNumber: '3.0',
          title: 'Unit 3: Sources of Learners Support Services',
          pageRange: '122-129',
          overview:
            'Surveys institutional units delivering support across NOUN: Study Centres (headed by Directors, staffed with Counsellors, ICT, and Administrative officers), Directorate of ICT (DICT), Faculties and Departments (curriculum, exam moderation, result queries), the Registry (admission letters, introductory letters, degree certificates, transcripts), and the University Library.',
          objectives: [
            'Identify the primary role and administrative structure of NOUN Study Centres',
            'Detail the rules governing face-to-face facilitation (50 student minimum, 200 student split)',
            'Examine the functions of the Directorate of ICT (DICT)',
            'Describe the services rendered by Faculties, Departments, and the Registry'
          ],
          unitRecapPoints: [
            'Study Centre is the primary decentralized source of learner support in NOUN, headed by a senior academic staff (Professor, Associate Professor, Senior Lecturer) or senior officer.',
            'Study Centre Staff: Director, Counsellors (graduates of Guidance & Counselling), Administrative Officers, Accountants, ICT staff, Clerical officers.',
            'Facilitation Rules: Face-to-face facilitation takes place when >= 50 students are registered for a course at the centre; divided into two classes if > 200 students. Allocation: 2-unit course = 8 hours; 3-unit course = 12 hours; 4-unit course = 16 hours.',
            'Directorate of ICT (DICT): Provides portal access, password resets, computer labs, and e-examination administration. At least 1 ICT staff per centre (Lagos has 9).',
            'Faculties & Departments: Manage curricula, result reviews, exam moderation, and research project supervision.',
            'Registry: Signs provisional admission letters (Registrar), issues introductory letters (visas/research via Deputy Registrar Academics), issues degree certificates signed by VC and Registrar, and verifies/dispatches academic transcripts directly to requesting institutions.',
            'Library: Provides physical study space, e-library subscriptions, information literacy training, and past student project archives.'
          ],
          topics: [
            {
              id: 'top-gst107-4-3-1',
              title: '3.1 The Study Centre and Facilitation Guidelines',
              readingMinutes: 16,
              content:
                'The Study Centre is the heart of NOUNs decentralized delivery. It coordinates pre-admission guidance, course/exam registration, orientation, matriculation, face-to-face facilitation, and exam administration. Facilitation occurs when at least 50 students register for a course at a centre (split into two classes if > 200). 2-unit courses receive 8 hours; 3-unit courses receive 12 hours; 4-unit courses receive 16 hours.',
              summaryPoints: [
                'Study Centre is the physical bridge between students and NOUN.',
                'Facilitation rules: minimum 50 students, class split at 200, 8-16 hours by credit units.'
              ],
              keyTerms: ['Study Centre', 'Facilitation Thresholds', 'Credit Unit Hours', 'Matriculation']
            },
            {
              id: 'top-gst107-4-3-2',
              title: '3.2 DICT, Faculties, Registry, and Library Operations',
              readingMinutes: 15,
              content:
                'The DICT maintains computing labs and resolves portal issues. Faculties oversee academic curricula and investigate result queries. The Registry handles admission letters, introductory letters for research/visas, degree certificates, and official academic transcripts. The Library delivers e-resources, research databases, and quiet study environments.',
              summaryPoints: [
                'DICT: Portal and e-examination infrastructure.',
                'Registry: Admission letters, certificates, and academic transcripts.',
                'Library: Physical study space and electronic research databases.'
              ],
              keyTerms: ['DICT', 'Registry', 'Transcripts', 'Introductory Letters', 'e-Library']
            }
          ]
        },
        {
          id: 'unit-gst107-m4-u4',
          unitNumber: '4.0',
          title: 'Unit 4: Benefits of Learners Support Services',
          pageRange: '130-132',
          overview:
            'Synthesizes empirical evidence on the impact of support services: (1) Promotion of Academic Achievement (Farajollahi & Moenikia 2010); (2) Mediation of Distance and reduction of isolation (Baloyi 2014, Tait 2003); (3) Reduction of Drop-Out and Attrition Rates (Bowa 2008, Open University of Malaysia 30% first-semester drop-out, NOUN early MBA 86.3% attrition study by Adewale & Inegbedion 2008).',
          objectives: [
            'Analyze empirical links between support services and academic performance (Farajollahi & Moenikia 2010)',
            'Explain how support services mediate physical and psychological distance',
            'Examine attrition and drop-out rates in ODL institutions globally and in Nigeria',
            'Evaluate how prompt administrative and counseling support boosts completion rates'
          ],
          unitRecapPoints: [
            '3 Major Benefits: Promotion of Academic Achievement, Mediation of Distance, Reduction of Drop-Out Rate.',
            'Farajollahi & Moenikia (2010) demonstrated a positive, statistically significant correlation between support services utilization and student academic performance.',
            'Mediation of Distance: Reduces psychological isolation and builds connection, self-esteem, and belonging within the university community (Tait 2003, Baloyi 2014).',
            'Attrition Rates in ODL: Open University of Malaysia reported ~30% first-semester non-re-registration; NOUN early MBA programme suffered an 86.3% attrition rate (Adewale & Inegbedion 2008; only 60 of 439 students completed).',
            'Bowa (2008) and Tait (2003) proved that tutor support, counselling, and prompt administrative information dramatically reduce drop-outs and empower learners to persist to graduation.'
          ],
          topics: [
            {
              id: 'top-gst107-4-4-1',
              title: '3.1 Academic Achievement and Mediating Distance',
              readingMinutes: 14,
              content:
                'Independent study can induce feelings of loneliness and isolation (Baloyi 2014). Quality support services mediate this distance by providing interactive facilitation, peer study groups, and responsive counselling. Farajollahi and Moenikia (2010) confirmed that learners who actively use support services achieve significantly higher grades.',
              summaryPoints: [
                'Support bridges physical and psychological separation.',
                'Direct empirical correlation with academic success (Farajollahi & Moenikia 2010).'
              ],
              keyTerms: ['Mediation of Distance', 'Isolation', 'Farajollahi & Moenikia 2010', 'Belonging']
            },
            {
              id: 'top-gst107-4-4-2',
              title: '3.2 Combating Attrition and Promoting Retention',
              readingMinutes: 14,
              content:
                'Distance education institutions often suffer high attrition. At Open University of Malaysia, 30% dropped out after semester one. In NOUNs early MBA cohort, 86.3% withdrew (Adewale & Inegbedion 2008). Bowa (2008) showed that proactive counselling, tutor feedback, and timely administrative information reverse attrition and foster persistence to graduation.',
              summaryPoints: [
                'ODL experiences higher attrition (OUM 30%, NOUN MBA 86.3%).',
                'Comprehensive support systems dramatically boost completion rates.'
              ],
              keyTerms: ['Attrition Rate', 'Adewale & Inegbedion 2008', 'Bowa 2008', 'Retention']
            }
          ]
        }
      ]
    }
  ]
};

export const GST107_QUESTIONS: PastExamQuestionItem[] = AUTHENTIC_GST107_EXTRACTED_PAST_QUESTIONS;
`;

fs.writeFileSync('src/services/gst107Data.ts', gst107CourseContent);
console.log('src/services/gst107Data.ts created successfully!');
