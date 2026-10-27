import { Course, PastExamQuestionItem, StudyModule } from '../types';
import { BUS330_UPLOADED_PQ_DOCUMENTS } from './bus330PastQuestionsData';

export const BUS330_COURSE: Course = {
  id: "course-bus330",
  code: "BUS 330",
  title: "Management Theory",
  department: "Business Administration",
  description: "National Open University of Nigeria (NOUN) Master and Undergraduate curriculum in Management Theory: concepts of administration, classical administrative principles (Taylor, Fayol, Weber, Gulick, Urwick), neo-classical human relations (Mayo, Follett, Barnard, Simon decision-making), communication systems, organizational conflict, modern motivation models (Theories X/Y, Maslow, Alderfer, Herzberg, Vroom, Adams, McClelland), systems and contingency theories, and Management by Objectives (MBO).",
  createdAt: "2026-10-22T08:53:14.072Z",
  documents: [
    {
      id: "doc-bus330-textbook",
      name: "BUS330_8f9154d9.pdf",
      fileType: "pdf",
      fileSize: 2450000,
      uploadedAt: "2026-10-22T08:53:14.071Z",
      extractedHeadingsCount: 15,
      pageCount: 106,
      status: "ready",
      processingStatus: "fully_processed",
      summary: "Official NOUN primary course guide for BUS 330: Management Theory by Dr. Ibrahim Adamu and Prof. Victor Ekhator covering all 4 Modules and 15 Units."
    },
    {
      id: "doc-bus330-psalmdata-pop",
      name: "BUS330_MANAGEMENT_THEORY_PSALMDATA_POP_SUMMARY.pdf",
      fileType: "pdf",
      fileSize: 1250000,
      uploadedAt: "2026-10-23T07:15:00Z",
      extractedHeadingsCount: 15,
      pageCount: 30,
      status: "ready",
      processingStatus: "fully_processed",
      summary: "Official NOUN POP examination past questions and verified marking schemes spanning 2018–2024 from Psalmdata Telecom & Computer Cafe."
    },
    {
      id: "doc-bus330-lagoldmine-summary",
      name: "BUS330_MANAGEMENT_THEORY_SUMMARY_LA_GOLDMINE_SOLUTIONS.pdf",
      fileType: "pdf",
      fileSize: 1845000,
      uploadedAt: "2026-10-23T07:14:00Z",
      extractedHeadingsCount: 15,
      pageCount: 49,
      status: "ready",
      processingStatus: "fully_processed",
      summary: "Comprehensive POP exam summary and detailed academic solutions guide for BUS 330 from La Goldmine Solutions."
    }
  ],
  pastQuestionDocuments: BUS330_UPLOADED_PQ_DOCUMENTS,
  modules: [
    {
      id: "mod-bus330-1",
      moduleNumber: 1,
      title: "Module 1: The Concepts of Administration, Management and Theory",
      description: "Foundational concepts, administrative dimensions, science vs. art, systems perspective, universality, and the architecture of theoretical construction.",
      units: [
        {
          id: "unit-bus330-1",
          unitNumber: "1.0",
          title: "Unit 1: Concepts of Administration and Management",
          objectives: [
            "Define administration from both the integral and managerial perspectives",
            "Explain the four basic characteristics of modern administration: coordination, search for better ways, functions, and control",
            "Analyze management as an art and as a science",
            "Evaluate management as a system and explain the universality of management"
          ],
          unitRecapPoints: [
            "Administration is derived from Latin 'adminis-trare' meaning to care for or look after people to manage affairs.",
            "According to Professor Dwight Waldo (1956), administration is the organization and management of human and material resources to achieve a stated objective.",
            "Integral view regards administration as the sum total of all activities (manual, clerical, technical, managerial); managerial view restricts it to superior supervisory personnel.",
            "Management is both an art (creative application of skill and vision) and a science (systematic procedures and empirical testing).",
            "The systems approach views the enterprise as an integrated whole of interdependent sub-systems (production, finance, marketing, personnel)."
          ],
          topics: [
            {
              id: "top-bus330-1-1",
              title: "The Concept and Nature of Administration",
              readingMinutes: 12,
              sourceReference: "BUS 330 Course Guide, Module 1, Unit 1, Section 3.1, pp. 6–10",
              textbookDefinitions: [
                {
                  term: "Administration (Dwight Waldo, 1956)",
                  definition: "Organization and management of human and material resources to achieve a stated objective. If public oriented, it is public administration; if private oriented, it is private administration.",
                  sourceAuthor: "Professor Dwight Waldo (1956)"
                },
                {
                  term: "Integral View vs. Managerial View",
                  definition: "Integral view considers all personnel (from errand boy to general manager) as engaged in administration; managerial view holds that only supervisory and directing staff constitute administration.",
                  sourceAuthor: "Administrative Theory Literature"
                }
              ],
              content: "The word 'administer', derived from the Latin words adminis-trare, means to care for or to look after people to manage affairs. Administration is a universal process permeating all collective efforts, be it public or private, civil or military, large scale or otherwise. It is a cooperative effort directed towards the realization of a consciously laid down objective.\n\nAccording to Professor Dwight Waldo (1956), administration is the organization and management of human and material resources to achieve a stated objective. If the objective is public oriented, then it is public administration; if the objective is private oriented, then it is private administration. Specifically, if the set objective is profit maximization, then it is business administration. Thus Administration is the umbrella covering organization and management:\n- Organization is the structure, the skeleton, the anatomy of administration.\n- Management is the process, the flesh and the physiology of administration.\nHence: Administration = Organization + Management. None of them in isolation can form administration without the other.\n\nIn common parlance, administration bears four different meanings:\n1. Cabinet or governing council in supreme charge of affairs.\n2. A branch of learning or intellectual discipline (e.g., public administration as a social science).\n3. The sum total of activities undertaken to implement public policy or deliver services.\n4. The art of management.\n\nScholars divide administration into two prominent views:\n- The Integral View: Administration is the sum total of all activities (manual, clerical, technical, and managerial) undertaken to realize the objective. Under this view, every employee contributes to administration.\n- The Managerial View: Administration is restricted solely to the managerial techniques of planning, organizing, coordinating, directing, and controlling. Only executives, managers, and foremen who get things done through others are considered administrators.",
              summaryPoints: [
                "Administration = Organization (structure/skeleton) + Management (process/physiology).",
                "Integral view encompasses all operational personnel; Managerial view restricts administration to supervisory coordinators."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-2",
          unitNumber: "2.0",
          title: "Unit 2: Concept of Theory and Scientific Research",
          objectives: [
            "Define theory and deconstruct its operational elements",
            "Explain the characteristics of an empirical scientific theory",
            "Analyze the 6 steps involved in theory construction",
            "Differentiate inductive from deductive methods of theoretical inquiry"
          ],
          unitRecapPoints: [
            "A theory is a scientifically, generally acceptable set of principles used to explain a phenomenon.",
            "Elements: 'Scientifically' (systematic empirical testing), 'Generally Acceptable' (statistical/logical consensus), 'Set of Principles' (rules and causal laws).",
            "6 Steps: (1) Problem selection, (2) Data collection, (3) Classification, (4) Formulation of hypothesis, (5) Hypothesis testing, (6) Verification into universal law.",
            "Deductive method moves from general principles to specific cases; inductive method builds general laws from specific empirical observations."
          ],
          topics: [
            {
              id: "top-bus330-2-1",
              title: "Nature of Theory and the Logic of Scientific Formulation",
              readingMinutes: 14,
              sourceReference: "BUS 330 Course Guide, Module 1, Unit 2, Sections 3.1–3.5, pp. 24–33",
              textbookDefinitions: [
                {
                  term: "Theory (BUS 330)",
                  definition: "A scientifically, generally acceptable set of principles used to explain a phenomenon and predict outcomes under specified conditions.",
                  sourceAuthor: "BUS 330 Course Guide"
                },
                {
                  term: "Hypothesis",
                  definition: "A tentative proposition or educated proposition put forward for empirical testing to determine its validity.",
                  sourceAuthor: "Scientific Methodology"
                }
              ],
              content: "A theory provides an organized framework of concepts and verified laws to understand complex reality.\n\nComponents of the Definition:\n- Scientifically: Based on systematic observation, controlled experimentation, and verifiable measurement rather than superstition or intuition.\n- Generally Acceptable: Endorsed by the preponderance of empirical evidence and peer consensus within the scholarly community.\n- Set of Principles: A coherent network of interrelated concepts, propositions, and operational rules.\n\nSix Steps in Theory Construction:\n1. Problem Identification: Formulating a clear, researchable question addressing an administrative anomaly.\n2. Data Collection: Gathering objective empirical evidence using rigorous instruments.\n3. Classification: Grouping and enumerating observations into meaningful analytical categories.\n4. Hypothesis Formulation: Establishing tentative statements specifying hypothesized causal relationships.\n5. Hypothesis Testing: Applying logical analysis and statistical tools to corroborate or falsify the hypothesis.\n6. Verification and Law Formulation: Confirming findings through repeated replications until propositions attain status as general principles.",
              summaryPoints: [
                "Theories convert disconnected empirical facts into predictive causal frameworks.",
                "Rigorous 6-step construction guarantees empirical validity and generalizability.",
                "The scientific method ensures administration functions as a verifiable social science."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mod-bus330-2",
      moduleNumber: 2,
      title: "Module 2: Scientific Management and Classical Management Theory",
      description: "Historical evolution of administration, F.W. Taylor scientific management, Fayol administrative principles, Luther Gulick POSDCORB, and Max Weber bureaucratic theory.",
      units: [
        {
          id: "unit-bus330-3",
          unitNumber: "1.0",
          title: "Unit 1: Early Development of Administration and Management",
          objectives: [
            "Trace the historical evolution of administration from ancient civilizations to the modern era",
            "Examine ancient administrative contributions (Kautilya Arthashastra, Sun Tzu, Roman Empire)",
            "Analyze Cameralism and the impact of the Industrial Revolution on factory management",
            "Evaluate early pioneers: Charles Babbage, Robert Owen, and James Watt Jr."
          ],
          unitRecapPoints: [
            "Administration is ancient: Egyptian pyramids, Roman provincial organization, and Chinese civil service examinations.",
            "Kautilya (Arthashastra, 4th century BC) formulated administrative statecraft, public finance, and personnel management in ancient India.",
            "Cameralism (16th–18th century German/Austrian civil servants) systematized public management and fiscal budgeting.",
            "The Industrial Revolution shifted production from home handicraft to mechanization, creating the modern factory system and demanding formal administrative discipline."
          ],
          topics: [
            {
              id: "top-bus330-3-1",
              title: "Historical Milestones in Administrative Evolution",
              readingMinutes: 14,
              sourceReference: "BUS 330 Course Guide, Module 2, Unit 1, Sections 3.1–3.5, pp. 38–50",
              textbookDefinitions: [
                {
                  term: "Cameralism",
                  definition: "A German school of public administrative thought from the 16th to 18th centuries concerned with managing the finances, administration, and public welfare of the royal state.",
                  sourceAuthor: "Historical Administration"
                }
              ],
              content: "Administrative practice long preceded administrative theory. From antiquity, complex civilizations developed systematic techniques to organize human cooperation.\n\nEarly Historical Milestones:\n- Ancient Egypt: Centralized construction management, logistics, and resource allocation for monumental public works.\n- Ancient India (Kautilya's Arthashastra): Detailed treatises on taxation, public bureaucracy, departmental division, and judicial governance.\n- Roman Empire: Scalar hierarchy, decentralized provincial governors, and standardized legal administration.\n- The Industrial Revolution (1760–1840): Transition from agrarian handicraft to factory-based mechanized production, necessitating work scheduling, standardized labor discipline, and cost accounting.",
              summaryPoints: [
                "Administration evolved through millennia of societal and military governance.",
                "Cameralists laid the groundwork for systematic public finance and bureaucratic recruitment.",
                "Industrial factory production necessitated formal scientific managerial organization."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-4",
          unitNumber: "2.0",
          title: "Unit 2: The Scientific Management Theory (Taylorism)",
          objectives: [
            "Examine Frederick Winslow Taylor work at Midvale and Bethlehem Steel",
            "Explain Taylor four fundamental principles of scientific management",
            "Analyze Frank and Lillian Gilbreth contributions to time and motion studies",
            "Evaluate the achievements and weaknesses of scientific management"
          ],
          unitRecapPoints: [
            "Taylor attacked rule-of-thumb methods and systemic soldiering (underworking) by developing the 'one best way' through scientific measurement.",
            "Bethlehem Steel shoveling experiments proved that optimal shovel load is 21.5 pounds, increasing daily tonnage by over 300%.",
            "Taylor 4 Principles: (1) Science of work, (2) Scientific selection and training of workmen, (3) Bringing science and workmen together, (4) Equal division of work between management and labor.",
            "Frank & Lillian Gilbreth pioneered Time and Motion Studies (bricklaying increased from 120 to 360 bricks/hr) and three-position plan of promotion.",
            "Criticisms: Mechanistic machine theory, neglect of human psychology, and over-reliance on financial incentives."
          ],
          topics: [
            {
              id: "top-bus330-4-1",
              title: "Principles of Taylorism, Shoveling Experiments and Gilbreth Studies",
              readingMinutes: 15,
              sourceReference: "BUS 330 Course Guide, Module 2, Unit 2, Sections 3.1–3.6, pp. 51–61",
              textbookDefinitions: [
                {
                  term: "Scientific Management",
                  definition: "The use of scientific methods (observation, experimentation, measurement) to define the one best way for a job to be done, replacing rule-of-thumb intuition.",
                  sourceAuthor: "Frederick Winslow Taylor (1911)"
                },
                {
                  term: "Systematic Soldiering",
                  definition: "Deliberate restriction of output by workers reacting to arbitrary piece-rate cuts and management lack of standards.",
                  sourceAuthor: "F.W. Taylor"
                }
              ],
              content: "Frederick Winslow Taylor (1856–1915), the father of Scientific Management, observed that workers engaged in systematic soldiering (deliberate underworking) because management had no clear concept of worker responsibilities, lacked work standards, and arbitrarily cut piece rates.\n\nThe Bethlehem Steel Shoveling Experiment:\nTaylor observed that shovelers handled materials ranging from light rice coal to heavy iron ore using the same shovel, with loads varying from 4 to 38 pounds. Through systematic experimentation, Taylor found that maximum productivity occurred at a shovel load of 21.5 pounds. By providing sized shovels for specific materials and scheduling regulated rest periods, daily output jumped from 16 to 59 tons per man, wages rose by 60%, and unit handling costs fell by 50%.\n\nTaylor's Four Principles:\n1. Science of Work: Developing a true science for each task with clear daily task standards.\n2. Scientific Selection & Training: Scientifically selecting and systematically developing the workman into a 'first-class man'.\n3. Bringing Science and Men Together: Ensuring work conforms to scientific methods.\n4. Equal Division of Work: Management handles planning, preparation, and supervision, while workers execute operations.",
              summaryPoints: [
                "Taylor replaced rule-of-thumb with the scientific discovery of the optimal 21.5 lb shovel load.",
                "Taylor four principles called for a complete mental revolution between management and workers.",
                "Gilbreths perfected time and motion analysis, reducing fatigue and waste."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-5",
          unitNumber: "3.0",
          title: "Unit 3: The Main Classical Theorists (Fayol, Gulick, Urwick, Mooney & Reiley)",
          objectives: [
            "Explain Henry Fayol 5 elements of management, 6 operational activities, and 14 principles of management",
            "Detail Luther Gulick POSDCORB acronym and 4P-Formula of departmentalization",
            "Review Lyndall Urwick 8 principles of organization",
            "Analyze Mooney and Reiley 4 principles: Coordination, Scalar Process, Functionalism, Line and Staff"
          ],
          unitRecapPoints: [
            "Fayol identified 6 industrial operations: Technical, Commercial, Financial, Security, Accounting, and Administration (the umbrella function).",
            "Fayol 14 Principles: Division of work, Authority & responsibility, Discipline, Unity of command, Unity of direction, Subordination of individual interest, Remuneration, Centralization, Scalar chain, Order, Equity, Stability of tenure, Initiative, Esprit de corps.",
            "Gulick coined POSDCORB: Planning, Organising, Staffing, Directing, Coordinating, Reporting, Budgeting; and the 4Ps: Purpose, Process, Persons, Place.",
            "Mooney & Reiley established Coordination as the first principle of organization operating through the scalar process and functional differentiation."
          ],
          topics: [
            {
              id: "top-bus330-5-1",
              title: "Classical Administrative Thought: Fayol, Gulick, Urwick and Mooney",
              readingMinutes: 16,
              sourceReference: "BUS 330 Course Guide, Module 2, Unit 3, Sections 3.1–3.5, pp. 62–73",
              textbookDefinitions: [
                {
                  term: "POSDCORB (Luther Gulick, 1937)",
                  definition: "Planning, Organising, Staffing, Directing, COordinating, Reporting, Budgeting—the seven core functions of the chief executive.",
                  sourceAuthor: "Luther Gulick"
                },
                {
                  term: "4P-Formula (Gulick)",
                  definition: "Bases of departmental organization: Purpose (function), Process (skills), Persons (clientele), and Place (geographical area).",
                  sourceAuthor: "Luther Gulick"
                }
              ],
              content: "Henry Fayol (1841–1925), a French mining engineer and managing director of Commentry-Fourchambault, is the father of modern operational management. Fayol divided all industrial activities into six categories:\n1. Technical, 2. Commercial, 3. Financial, 4. Security, 5. Accounting, 6. Administration (planning, organizing, commanding, coordinating, controlling).\n\nFayol's 14 Principles of Management:\n1. Division of Work, 2. Authority and Responsibility, 3. Discipline, 4. Unity of Command, 5. Unity of Direction, 6. Subordination of Individual Interest, 7. Remuneration, 8. Centralization, 9. Scalar Chain (with Fayol's gangplank for lateral speed), 10. Order, 11. Equity, 12. Stability of Tenure, 13. Initiative, 14. Esprit de Corps.\n\nGulick and Urwick (1937):\nFormulated POSDCORB to summarize executive tasks and established the 4P-Formula for departmentalization: Purpose, Process, Persons, and Place.",
              summaryPoints: [
                "Fayol established administration as the vital umbrella over operational activities.",
                "POSDCORB and 4P-Formula provide the architectural framework for formal departmentalization.",
                "Classical administrative theory emphasized formal structure, unity of command, and functional coordination."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-6",
          unitNumber: "4.0",
          title: "Unit 4: Bureaucracy Theory (Max Weber)",
          objectives: [
            "Define bureaucracy and explain Vincent de Gourney coining of the term",
            "Contrast Max Weber three types of legitimate authority: Charismatic, Traditional, and Legal-Rational",
            "List the 10 characteristics of Weber ideal-type monocratic bureaucracy",
            "Examine bureaucratic pathologies and dysfunctions (Merton red tape, goal displacement)"
          ],
          unitRecapPoints: [
            "Max Weber (1864–1920) conceptualized Bureaucracy as the most rational, efficient, and technically superior form of formal organization.",
            "Three Types of Authority: Charismatic (personal devotion to extraordinary leader), Traditional (sanctity of age-old customs), Legal-Rational (belief in legality of enacted rules and official office).",
            "Key Characteristics: Fixed jurisdiction, hierarchy of offices, written documentation (files), expert training, career tenure with fixed salary, separation of office from private property.",
            "Dysfunctions (Robert K. Merton): Trained incapacity, rigidity, ritualistic adherence to rules, and displacement of goals (rules becoming ends in themselves)."
          ],
          topics: [
            {
              id: "top-bus330-6-1",
              title: "Weberian Legal-Rational Authority and Bureaucratic Ideal Type",
              readingMinutes: 15,
              sourceReference: "BUS 330 Course Guide, Module 2, Unit 4, Sections 3.1–3.6, pp. 74–86",
              textbookDefinitions: [
                {
                  term: "Legal-Rational Authority (Max Weber)",
                  definition: "Authority based on impersonal, legally enacted norms where obedience is owed not to the individual ruler, but to the legally established impersonal office.",
                  sourceAuthor: "Max Weber (1922)"
                },
                {
                  term: "Goal Displacement (Robert K. Merton)",
                  definition: "A bureaucratic dysfunction where procedural rules, originally designed as means to an end, become transformed into sacred ends in themselves.",
                  sourceAuthor: "Robert K. Merton (1940)"
                }
              ],
              content: "Max Weber formulated the ideal-type bureaucracy as the structural foundation of modern complex enterprise.\n\nThree Authority Types:\n- Traditional Authority: Legitimacy rests on ancient customs, hereditary succession, and customary personal loyalty.\n- Charismatic Authority: Rests on extraordinary devotion to the sanctity, heroism, or exemplary character of an individual.\n- Legal-Rational Authority: Rests on codified impersonal laws and official competence; modern bureaucracy operates under this authority.\n\nCore Structural Characteristics:\n1. Clear Division of Labor with jurisdictional competence.\n2. Firm Hierarchy of Offices with superior-subordinate oversight.\n3. Management based on written documents and records preserved in files.\n4. Technical Qualification as sole criterion for appointment.\n5. Fixed Monetary Salaries and structured pension tenure.\n6. Separation of the official's personal life from public office property.",
              summaryPoints: [
                "Legal-rational authority replaces nepotism and favoritism with meritocracy.",
                "Weber ideal type prioritizes precision, speed, unambiguity, and operational continuity.",
                "Excessive formalism risks trained incapacity and red tape."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mod-bus330-3",
      moduleNumber: 3,
      title: "Module 3: Neo-Classical or Human Relations Theory",
      description: "Hawthorne experiments, Elton Mayo, Mary Parker Follett constructive conflict, Chester Barnard cooperative systems, Herbert Simon decision-making theory, organizational communication, and conflict management.",
      units: [
        {
          id: "unit-bus330-7",
          unitNumber: "1.0",
          title: "Unit 1: The Hawthorne Experiment and Other Contributors",
          objectives: [
            "Detail the 4 phases of the Hawthorne Studies (1924–1932): Illumination, Relay Assembly, Mass Interviewing, Bank Wiring",
            "Analyze the Mule Spinning Enquiry at Philadelphia (1923)",
            "Explain the Hawthorne Effect and the emergence of the 'Social Person' model",
            "Contrast Classical Scientific Management with the Human Relations School"
          ],
          unitRecapPoints: [
            "Conducted by Elton Mayo, Fritz Roethlisberger, and William J. Dickson at Western Electric's Hawthorne Works in Chicago.",
            "Four Phases: (1) Illumination Experiments (1924–1927), (2) Relay Assembly Test Room (1927–1932), (3) Mass Interviewing Programme (1928–1930), (4) Bank Wiring Observation Room (1931–1932).",
            "Bank Wiring Room proved informal group norms control output: 'rate busters' (working too fast) and 'chisellers' (working too slow) were ostracized.",
            "Hawthorne Effect: The phenomenon where employees increase output simply because they perceive management cares and is observing them with interest.",
            "Human Relations discovered the Informal Organization: workplace social groups, sentiments, and peer norms."
          ],
          topics: [
            {
              id: "top-bus330-7-1",
              title: "The Hawthorne Studies: Phases, Findings, and Human Relations Paradigm",
              readingMinutes: 16,
              sourceReference: "BUS 330 Course Guide, Module 3, Unit 1, Sections 3.1–3.8, pp. 87–95",
              textbookDefinitions: [
                {
                  term: "Hawthorne Effect",
                  definition: "An increase in worker productivity caused not by physical working conditions, but by the psychological awareness of being observed and recognized as special participants in an experiment.",
                  sourceAuthor: "Elton Mayo & F.J. Roethlisberger"
                },
                {
                  term: "Social Person Model",
                  definition: "The neo-classical behavioral view that workers are primarily motivated by social needs, peer acceptance, and emotional support rather than purely financial incentives.",
                  sourceAuthor: "Human Relations Theory"
                }
              ],
              content: "The Human Relations Movement challenged the classical mechanistic view of workers as economic cogs in an industrial machine.\n\n1. The Mule Spinning Enquiry (Philadelphia, 1923):\nElton Mayo studied a textile mill suffering a 250% annual turnover in its spinning department despite financial bonus schemes. Mayo introduced four 10-minute rest pauses with sleep cots, allowing workers to schedule their own breaks. Morale soared, turnover dropped to 5%, and productivity rose dramatically.\n\n2. The Hawthorne Studies (1924–1932) at Western Electric:\n- Illumination Experiments (1924–1927): Investigated the effect of lighting on output. Output increased in both test and control groups even when illumination was reduced to moonlight intensity, demonstrating that psychological variables overpowered physical illumination.\n- Relay Assembly Test Room (1927–1932): Six women assembled telephone relays under varied rest pauses, shorter working hours, and refreshments. Output rose steadily regardless of changes, because workers felt valued, consulted, and formed a close social team.\n- Mass Interviewing Programme (1928–1930): Over 21,000 workers interviewed. Demonstrated that workers needed to ventilate emotional grievances and that feelings dictate behavior.\n- Bank Wiring Observation Room (1931–1932): 14 male operators established informal group output restrictions (6,000 units/day) enforced by peer sanctions: 'rate busters' were reprimanded, and 'chisellers' were ostracized.",
              summaryPoints: [
                "Productivity is determined by social norms, team cohesion, and emotional recognition far more than physical conditions.",
                "Informal groups establish implicit output quotas that override formal corporate incentive schemes.",
                "The Hawthorne studies established the human relations paradigm in management."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-8",
          unitNumber: "2.0",
          title: "Unit 2: Administrative Leadership Theory (Follett & Barnard)",
          objectives: [
            "Analyze Mary Parker Follett views on constructive conflict, integration, and the law of the situation",
            "Distinguish Follett coactive power-with from coercive power-over",
            "Examine Chester Barnard definition of formal organization as a cooperative system",
            "Explain Barnard Acceptance Theory of Authority, Zone of Indifference, and 3 Executive Functions"
          ],
          unitRecapPoints: [
            "Follett (1868–1933) is the bridge between classical and behavioral thought; conflict is resolved through Integration (satisfying both sides without sacrifice).",
            "The Law of the Situation: Orders must be depersonalized by studying facts together so commands emanate from the situation itself.",
            "Barnard (The Functions of the Executive, 1938) defined formal organization as a system of consciously coordinated activities of two or more persons.",
            "Barnard Acceptance Theory of Authority: Authority is granted from the bottom up when a subordinate understands the order, believes it fits the mission, aligns with personal interest, and can comply.",
            "Zone of Indifference: The realm where orders are accepted unquestioningly without conscious appraisal."
          ],
          topics: [
            {
              id: "top-bus330-8-1",
              title: "Constructive Integration, Acceptance of Authority, and Executive Functions",
              readingMinutes: 16,
              sourceReference: "BUS 330 Course Guide, Module 3, Unit 2, Sections 3.3–3.4, pp. 96–100",
              textbookDefinitions: [
                {
                  term: "Integration (Mary Parker Follett)",
                  definition: "A creative conflict resolution synthesis where a new solution is invented satisfying the genuine needs of both parties so that neither side makes a sacrifice.",
                  sourceAuthor: "Mary Parker Follett (1924)"
                },
                {
                  term: "Acceptance Theory of Authority (Chester Barnard)",
                  definition: "The principle that authority does not flow top-down from office position, but is determined by whether the receiver accepts the communication as authoritative.",
                  sourceAuthor: "Chester I. Barnard (1938)"
                },
                {
                  term: "Zone of Indifference (Barnard)",
                  definition: "The mental zone within which an employee will accept orders without conscious questioning or resistance.",
                  sourceAuthor: "Chester Barnard"
                }
              ],
              content: "Mary Parker Follett and Chester Barnard transformed administrative theory from rigid mechanics to cooperative human systems.\n\n1. Mary Parker Follett — Constructive Conflict and Integration:\nFollett identified three methods of handling conflict:\n- Domination: One side forces victory over the other (creates resentment).\n- Compromise: Both sides surrender part of what they desire (neither is truly satisfied).\n- Integration: A creative synthesis where the real needs of both sides are met without compromise. (e.g. In a library, one person wants a window open for fresh air, another wants it closed against drafts; integration: opening a window in the adjoining room).\n- Law of the Situation: Depersonalizes orders. Bosses and workers study the facts together so that instructions emanate naturally from the situation itself rather than arbitrary personal authority.\n\n2. Chester I. Barnard — The Functions of the Executive (1938):\n- Formal Organization: 'A system of consciously coordinated activities or forces of two or more persons.' Essential elements: Communication, Willingness to serve (cooperate), and Common purpose.\n- Contribution-Satisfaction Equilibrium: An organization survives only when inducements offered to participants exceed the burdens of their contributions.\n- Acceptance Theory of Authority: Authority resides with the recipient. An order is accepted only when four conditions occur simultaneously: (1) Intelligibility, (2) Consistency with organizational purpose, (3) Compatibility with personal interest, (4) Mental and physical ability to perform.\n- Three Executive Functions: (1) Maintain the communication system, (2) Secure essential services from personnel, (3) Formulate and define organizational purpose.",
              summaryPoints: [
                "Integration invents creative solutions that resolve core conflict without compromise or sacrifice.",
                "Barnard demonstrated that authority is granted from the subordinate upward through acceptance.",
                "The core executive role is maintaining communication networks and inspiring cooperative purpose."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-9",
          unitNumber: "3.0",
          title: "Unit 3: Decision Making Theory (Herbert Simon)",
          objectives: [
            "Examine Herbert Simon concept of decision making as the heart of administration",
            "Contrast Economic Rationality with Simon Bounded Rationality and Satisficing model",
            "Analyze the Fact-Value Dichotomy in administrative decisions",
            "Explain Simon three stages of decision making: Intelligence, Design, Choice",
            "Differentiate Programmed Decisions from Non-Programmed Decisions"
          ],
          unitRecapPoints: [
            "Herbert A. Simon (Administrative Behavior, 1947, Nobel Laureate 1978) declared that administration is synonymous with decision-making.",
            "Rejected classical 'Economic Man' who possesses perfect information; replaced with 'Administrative Man' who operates under Bounded Rationality.",
            "Satisficing: Decision makers do not search for the optimal choice; they select the first alternative that meets their minimum threshold of acceptability.",
            "Three Stages of Decision Making: (1) Intelligence Activity (identifying conditions requiring a decision), (2) Design Activity (inventing/analyzing courses of action), (3) Choice Activity (selecting an alternative).",
            "Programmed decisions are repetitive, routine, and handled through established rules; Non-programmed decisions are novel, unstructured, and demand high-level policy judgment."
          ],
          topics: [
            {
              id: "top-bus330-9-1",
              title: "Bounded Rationality, Satisficing, and Decision-Making Typologies",
              readingMinutes: 15,
              sourceReference: "BUS 330 Course Guide, Module 3, Unit 3, pp. 101–103",
              textbookDefinitions: [
                {
                  term: "Bounded Rationality (Herbert Simon)",
                  definition: "The reality that human decision-making is constrained by limited cognitive processing capacity, imperfect information, and severe time restrictions.",
                  sourceAuthor: "Herbert A. Simon (1947)"
                },
                {
                  term: "Satisficing",
                  definition: "A decision-making strategy that searches through available alternatives until an acceptability threshold is met, rather than exhausting resources to find the theoretical optimum.",
                  sourceAuthor: "Herbert Simon"
                }
              ],
              content: "Herbert Simon revolutionized management thought by focusing on how choices are made in organizations.\n\n1. The Primacy of Decision-Making:\nSimon argued that every administrative act involves a decision. Administration is the process of guiding and constraining human choice to attain organizational goals.\n\n2. Bounded Rationality and the Administrative Man:\nClassical economics assumed 'Economic Man' possessed complete knowledge of all alternatives, calculated all future outcomes, and selected the single utility-maximizing option. Simon dismissed this as psychologically impossible. In reality, managers face:\n- Incomplete and imperfect information,\n- Limited cognitive foresight,\n- Severe time and cost pressures.\nTherefore, 'Administrative Man' operates under Bounded Rationality and practices Satisficing—choosing an alternative that is 'good enough' to achieve the objective.\n\n3. Three Steps in the Decision-Making Process:\n- Intelligence Activity: Searching the environment for conditions demanding action.\n- Design Activity: Inventing, developing, and analyzing possible courses of action.\n- Choice Activity: Selecting a specific course of action from those available.\n\n4. Programmed vs. Non-Programmed Decisions:\n- Programmed: Routine, repetitive decisions handled by standard operating procedures, rules, and computational algorithms (e.g. processing payroll).\n- Non-Programmed: Novel, non-routine, and ill-structured problems requiring judgment, intuition, and creative heuristic problem-solving (e.g. launching a new product line during an economic crisis).",
              summaryPoints: [
                "Simon proved that decision-making is the central operational core of administration.",
                "Bounded rationality explains why real-world managers satisfice rather than maximize.",
                "Structured programmed decisions free executive energy for strategic non-programmed dilemmas."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-10",
          unitNumber: "4.0",
          title: "Unit 4: Communication in an Organization",
          objectives: [
            "Define organizational communication and examine its operational functions",
            "Detail Chester Barnard seven principles of communication architecture",
            "Analyze vertical (downward/upward), horizontal (lateral), and diagonal communication flows",
            "Examine formal networks versus the informal grapevine network",
            "Identify psychological, semantic, and hierarchical barriers to communication"
          ],
          unitRecapPoints: [
            "Communication is the transfer of information, meaning, and understanding between administrative actors; without communication, organization cannot exist.",
            "Barnard 7 Principles of Communication: Definite channels, formal access for all, direct/short lines, complete scalar line used, competent personnel at centers, lines not interrupted, and authentic verification.",
            "Communication flows: Downward (policies, instructions), Upward (reports, grievances, feedback), Horizontal (peer coordination between departments), Diagonal (cross-functional teams).",
            "The Grapevine: Rapid, spontaneous informal network that travels across formal lines; carries social intelligence and must be kept informed by management.",
            "Barriers: Semantic distortion, information overload, status filtering, and selective perception."
          ],
          topics: [
            {
              id: "top-bus330-10-1",
              title: "Organizational Communication Systems, Barnard Principles, and Channels",
              readingMinutes: 15,
              sourceReference: "BUS 330 Course Guide, Module 3, Unit 4, pp. 104–105",
              textbookDefinitions: [
                {
                  term: "Grapevine",
                  definition: "The informal communication network within an organization that operates outside official management channels, transmitting news, rumors, and social intelligence rapidly.",
                  sourceAuthor: "Keith Davis"
                },
                {
                  term: "Hierarchical Filtering",
                  definition: "The deliberate or unconscious distortion and dilution of messages as they travel vertically through successive management layers.",
                  sourceAuthor: "Administrative Communication"
                }
              ],
              content: "Chester Barnard declared that the first function of the executive is to establish and maintain a system of communication. In complex organizations, communication coordinates differentiated roles.\n\nBarnard's Seven Principles of Communication:\n1. Channels of communication should be definitely known to all participants.\n2. A definite formal channel of communication must reach every member of the organization.\n3. The line of communication should be as direct and short as possible.\n4. The complete line of communication should usually be utilized (avoiding skipped scalar links).\n5. Personnel serving as communication centers (supervisors, officers) must be competent.\n6. The line of communication should not be interrupted while the organization functions.\n7. Every communication must be authenticated (confirming authority and origin).\n\nDirections of Communication Flow:\n- Downward: Transmits goals, policies, standard operating procedures, and job instructions from superiors to subordinates.\n- Upward: Conveys progress reports, problems, suggestions, and grievances; often distorted by subordinate reluctance to communicate unpleasant truths.\n- Horizontal (Lateral): Crosses peer departmental lines (e.g. Marketing conferring with Production) to achieve swift operational integration.\n- Diagonal: Cuts across functions and hierarchical levels, typical of modern matrix and project management.",
              summaryPoints: [
                "Barnard communication principles provide the architectural foundation for administrative clarity.",
                "Two-way upward and downward feedback prevents operational blindspots.",
                "Effective managers acknowledge the informal grapevine and counteract rumors with transparent official news."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-11",
          unitNumber: "5.0",
          title: "Unit 5: Organizational Conflict and Conflict Management",
          objectives: [
            "Examine the evolving perspective on conflict: Classical (pathological) vs. Modern (functional and inevitable)",
            "Analyze sources of organizational conflict: task interdependence, scarce resources, divergent goals, role ambiguity",
            "Detail Louis Pondy five stages of a conflict episode: Latent, Perceived, Felt, Manifest, Conflict Aftermath",
            "Evaluate conflict resolution strategies: Domination, Accommodation, Avoidance, Compromise, and Integration"
          ],
          unitRecapPoints: [
            "Classical theory viewed conflict as an administrative pathology resulting from poor management; modern theory views conflict as normal, inevitable, and potentially constructive.",
            "Sources of conflict: Interdependent workflows, competition for scarce financial/physical resources, jurisdictional ambiguities, and divergent goal orientations.",
            "Pondy 5-Stage Conflict Episode: (1) Latent (underlying competitive conditions), (2) Perceived (cognitive awareness of differences), (3) Felt (emotional tension, anxiety), (4) Manifest (open confrontation, arguing), (5) Conflict Aftermath (outcome conditions leading to resolution or new cycles).",
            "Mary Parker Follett proved Integration is the superior resolution strategy: inventing creative syntheses that satisfy genuine underlying needs without compromise."
          ],
          topics: [
            {
              id: "top-bus330-11-1",
              title: "Dynamics of Conflict, Pondy Episodes, and Strategic Resolution",
              readingMinutes: 15,
              sourceReference: "BUS 330 Course Guide, Module 3, Unit 5, pp. 105–106",
              textbookDefinitions: [
                {
                  term: "Organizational Conflict",
                  definition: "A process in which an individual or group perceives that its interests, goals, or values are being actively opposed, blocked, or negatively affected by another party.",
                  sourceAuthor: "Conflict Theory"
                },
                {
                  term: "Conflict Episode (Louis Pondy)",
                  definition: "A dynamic conceptual framework analyzing conflict through five chronological stages: latent, perceived, felt, manifest, and aftermath.",
                  sourceAuthor: "Louis R. Pondy (1967)"
                }
              ],
              content: "Conflict occurs whenever interdependent parties perceive incompatible goals, resource scarcity, or interference.\n\nChanging Administrative Views on Conflict:\n- Classical View (Taylor, Fayol): Conflict was regarded as an administrative disease, a sign of breakdown in unity of command, and a result of mischievous troublemakers. Management sought to suppress conflict entirely.\n- Human Relations View (Mayo): Conflict was seen as an unfortunate failure of interpersonal communication and social integration.\n- Modern / Contemporary View: Conflict is inevitable in any organization characterized by specialization, scarce resources, and rapid environmental change. When properly managed, constructive conflict sparks innovation, prevents groupthink, and stimulates creative problem-solving.\n\nLouis Pondy's Five Stages of a Conflict Episode:\n1. Latent Conflict: Underlying operational conditions (resource competition, role clash) exist but have not yet surfaced.\n2. Perceived Conflict: Cognitive awareness that one's goals are being frustrated by another group.\n3. Felt Conflict: Emotional personalization of differences, resulting in anxiety, hostility, and anger.\n4. Manifest Conflict: Behavioral expression of conflict through open argumentation, non-cooperation, sabotage, or bureaucratic resistance.\n5. Conflict Aftermath: The resulting environment following resolution. If genuine issues were suppressed, the aftermath breeds fresh latent conflict; if resolved constructively, trust and collaboration expand.",
              summaryPoints: [
                "Modern management channels conflict constructively rather than futilely attempting to suppress it.",
                "Pondy episode model tracks conflict from latent underlying conditions to manifest behavior and aftermath.",
                "Collaborative problem-solving and role clarification generate sustainable win-win agreements."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mod-bus330-4",
      moduleNumber: 4,
      title: "Module 4: Modern Theories of Management",
      description: "Motivation models (Theories X & Y, Maslow, Alderfer ERG, Herzberg, Vroom, Adams, McClelland), Systems Theory, Contingency Models, New Public Management, and Management by Objectives (MBO).",
      units: [
        {
          id: "unit-bus330-12",
          unitNumber: "1.0",
          title: "Unit 1: Behaviourism and Content Motivation Theories",
          objectives: [
            "Contrast Douglas McGregor Theory X and Theory Y assumptions",
            "Analyze Abraham Maslow 5-level hierarchy of needs",
            "Explain Clayton Alderfer ERG model (Existence, Relatedness, Growth)",
            "Evaluate Frederick Herzberg Two-Factor Theory (Hygiene vs. Motivators)"
          ],
          unitRecapPoints: [
            "Theory X assumes workers are inherently lazy, avoid responsibility, and require coercion; Theory Y assumes workers are self-directed, seek responsibility, and possess creative capacity.",
            "Maslow 5 needs: Physiological, Security, Social, Esteem, Self-Actualization.",
            "Alderfer ERG theory condenses Maslow into Existence, Relatedness, and Growth, introducing frustration-regression.",
            "Herzberg Two-Factor Theory proves Hygiene factors (pay, policy, conditions) merely prevent dissatisfaction; only Motivators (achievement, recognition, work itself, responsibility, growth) generate true motivation."
          ],
          topics: [
            {
              id: "top-bus330-12-1",
              title: "Theories X/Y, Maslow Hierarchy, Alderfer ERG, and Herzberg Dual Factors",
              readingMinutes: 16,
              sourceReference: "BUS 330 Course Guide, Module 4, Unit 1, pp. 107–119",
              textbookDefinitions: [
                {
                  term: "Theory X and Theory Y (Douglas McGregor)",
                  definition: "Two opposing sets of managerial assumptions regarding human nature at work: Theory X assumes indolence and coercion; Theory Y assumes potential for self-direction and responsibility.",
                  sourceAuthor: "Douglas McGregor (1960)"
                },
                {
                  term: "Hygiene Factors vs. Motivators (Frederick Herzberg)",
                  definition: "Hygiene factors (job context: salary, company policy, working conditions) prevent dissatisfaction but do not motivate; Motivators (job content: achievement, recognition, responsibility, growth) create job satisfaction and drive superior effort.",
                  sourceAuthor: "Frederick Herzberg (1959)"
                }
              ],
              content: "Modern management theory emphasizes understanding human motivation as the key to productivity.\n\n1. Douglas McGregor (1960) — Theories X and Y:\n- Theory X: Assumes average individuals dislike work, lack ambition, avoid responsibility, prefer security, and must be coerced, controlled, and threatened with punishment.\n- Theory Y: Assumes physical and mental effort in work is as natural as play or rest. Workers exercise self-direction and self-control in service of objectives to which they are committed.\n\n2. Abraham Maslow (1954) — Hierarchy of Needs:\nOrganizes human needs into five ascending levels: (1) Physiological, (2) Security/Safety, (3) Social/Love, (4) Esteem, (5) Self-Actualization. Lower-level needs must be reasonably satisfied before higher-level needs emerge as primary motivators.\n\n3. Clayton Alderfer — ERG Theory:\nCondensed Maslow into Existence, Relatedness, and Growth. Alderfer introduced frustration-regression: if higher-order growth is blocked, an employee intensifies lower-level material desires.\n\n4. Frederick Herzberg — Two-Factor (Motivation-Hygiene) Theory:\n- Hygiene Factors: Pay, working conditions, supervision, company policies. Keep workers from becoming dissatisfied but cannot motivate high achievement.\n- Motivators: Achievement, recognition, challenging work, responsibility, advancement. Truly inspire workers to outstanding performance.",
              summaryPoints: [
                "McGregor Theory Y transforms leadership from authoritarian coercion to supportive self-direction.",
                "Maslow and Alderfer provide foundational hierarchies of human need progression.",
                "Herzberg proved that money and company policies prevent dissatisfaction but cannot alone motivate excellence."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-13",
          unitNumber: "2.0",
          title: "Unit 2: Other Motivation Theories (Process Models and Acquired Needs)",
          objectives: [
            "Explain Victor Vroom Expectancy Theory (Valence, Instrumentality, Expectancy)",
            "Describe J. Stacy Adams Equity Theory of motivation",
            "Analyze David McClelland Acquired Needs Theory (nAch, nAff, nPow)",
            "Examine Edwin Locke Goal-Setting Theory and Job Enrichment"
          ],
          unitRecapPoints: [
            "Expectancy Theory posits Motivation = Valence × Instrumentality × Expectancy; employees must believe effort leads to performance and performance yields valued rewards.",
            "Equity Theory focuses on social comparison of input/outcome ratios compared to relevant others.",
            "McClelland proved Need for Achievement (nAch) can be developed, predicting entrepreneurial venture success.",
            "Goal Setting Theory proves specific, challenging goals with timely feedback dramatically improve performance.",
            "Job Enrichment expands work vertically (adding responsibility, autonomy, planning); Job Enlargement expands work horizontally (adding more tasks at the same level)."
          ],
          topics: [
            {
              id: "top-bus330-13-1",
              title: "Expectancy, Equity, McClelland Needs, and Goal-Setting Systems",
              readingMinutes: 16,
              sourceReference: "BUS 330 Course Guide, Module 4, Unit 2, pp. 120–130",
              textbookDefinitions: [
                {
                  term: "Expectancy Theory (Victor Vroom)",
                  definition: "Motivation to exert effort depends on expectancy (effort leads to performance), instrumentality (performance leads to outcome), and valence (desirability of the outcome).",
                  sourceAuthor: "Victor H. Vroom (1964)"
                },
                {
                  term: "Need for Achievement (nAch) (McClelland)",
                  definition: "The learned drive to excel, achieve in relation to a set of standards, and strive to succeed through personal responsibility.",
                  sourceAuthor: "David C. McClelland"
                }
              ],
              content: "While content theories explain *what* motivates people, process theories explain *how* motivation occurs.\n\n1. Vroom's Expectancy Theory:\nMotivation is a product of three cognitive perceptions:\n- Expectancy (E → P): The belief that increased effort will lead to acceptable performance.\n- Instrumentality (P → O): The belief that achieving performance will lead to a specific reward outcome.\n- Valence (V): The personal value or attractiveness of the received reward.\nFormula: Motivational Force = Expectancy × Instrumentality × Valence. If any term is zero, motivational force is zero.\n\n2. Adams' Equity Theory:\nWorkers compare their perceived job input/outcome ratio with that of referent others: (Outcome / Input) of Person = (Outcome / Input) of Referent Other. Inequity triggers tension, prompting workers to reduce effort, demand pay raises, rationalize, or quit.\n\n3. McClelland's Acquired Needs Theory:\nIdentified three fundamental motives: Need for Achievement (nAch - personal mastery and moderate risks), Need for Affiliation (nAff - harmonious relationships), and Need for Power (nPow - influencing others).\n\n4. Edwin Locke's Goal-Setting Theory:\nSpecific and challenging goals lead to higher performance than easy goals or vague directives ('do your best').",
              summaryPoints: [
                "Expectancy theory links personal effort, performance benchmarks, and desired rewards.",
                "Equity theory governs perceptions of organizational fairness.",
                "Goal setting and job enrichment build meaningful autonomy and psychological ownership."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-14",
          unitNumber: "3.0",
          title: "Unit 3: Systems Theory, Contingency Theory and New Public Management",
          objectives: [
            "Analyze open vs. closed systems and socio-technical systems in management",
            "Explain the contingency (situational) approach to organizational design (Woodward, Burns & Stalker, Lawrence & Lorsch)",
            "Contrast mechanistic structures with organic structures",
            "Examine New Public Management (NPM) principles: 3Es (Economy, Efficiency, Effectiveness), market competition, customer orientation"
          ],
          unitRecapPoints: [
            "Systems theory views the organization as an open socio-technical system continually interacting with its external environment.",
            "Contingency theory holds that there is no single best way to organize; optimal structure depends on situational variables (technology, environment, size).",
            "Burns & Stalker distinguished Mechanistic systems (rigid hierarchy, stable environments) from Organic systems (fluid networks, dynamic changing environments).",
            "New Public Management (NPM) transplants private sector market disciplines into public administration: performance contracts, disaggregation of agencies, user charges, and customer choice."
          ],
          topics: [
            {
              id: "top-bus330-14-1",
              title: "Open Systems, Contingency Design, and New Public Management",
              readingMinutes: 15,
              sourceReference: "BUS 330 Course Guide, Module 4, Unit 3, pp. 131–138",
              textbookDefinitions: [
                {
                  term: "Open System",
                  definition: "An organizational model that continually interacts with its external environment, importing energy and resources (inputs), transforming them, and exporting products/services (outputs).",
                  sourceAuthor: "Systems Theory"
                },
                {
                  term: "Mechanistic vs. Organic Systems (Burns & Stalker)",
                  definition: "Mechanistic systems feature rigid hierarchy, precise job descriptions, and vertical communication suited to stable conditions; Organic systems feature flexible roles, shared responsibility, and lateral communication suited to changing conditions.",
                  sourceAuthor: "Tom Burns & G.M. Stalker (1961)"
                },
                {
                  term: "New Public Management (NPM)",
                  definition: "A public sector management reform paradigm emphasizing the three Es (Economy, Efficiency, Effectiveness), market competition, output budgeting, customer orientation, and privatization.",
                  sourceAuthor: "Christopher Hood (1991)"
                }
              ],
              content: "Modern management synthesizes macro-organizational design with environmental adaptation.\n\n1. Open Systems Theory:\nOrganizations are open socio-technical systems that depend on continuous interaction with their external environment. Sub-systems include Task, Technology, Structure, People, and Management. Changes in any one sub-system reverberate across all other components.\n\n2. Contingency Approach (Situational Theory):\nRejects classical universalism. The structure of an enterprise must match its environmental uncertainty and technological demands:\n- Joan Woodward: Proved that organizational structure (span of control, management levels) depends on technical complexity (unit/small batch, mass production, continuous process).\n- Burns and Stalker (1961): Stable environments require mechanistic structures; dynamic, high-tech environments require organic, adaptable networks.\n- Lawrence and Lorsch: High environmental uncertainty demands internal differentiation balanced by cross-functional integration.\n\n3. New Public Management (NPM):\nArising in the 1980s–1990s, NPM challenged bureaucratic inertia by introducing market disciplines into government:\n- The Three Es: Economy (minimizing input costs), Efficiency (maximizing output per unit of input), and Effectiveness (achieving desired public policy goals).\n- Hands-on professional management with clear performance targets.\n- Disaggregation of monolithic ministries into autonomous corporatized agencies.\n- Treating citizens as valued customers with service charters.",
              summaryPoints: [
                "Organizations survive by continually adapting open sub-systems to external environmental changes.",
                "Contingency models require tailoring structure to technological and environmental realities.",
                "New Public Management modernizes public administration through market incentives and customer service."
              ]
            }
          ]
        },
        {
          id: "unit-bus330-15",
          unitNumber: "4.0",
          title: "Unit 4: Management by Objectives (MBO)",
          objectives: [
            "Examine Peter Drucker concept of Management by Objectives (MBO) in The Practice of Management (1954)",
            "Detail the 5 steps in the MBO operational process: Cascading goals, Joint target setting, Action planning, Periodic reviews, Final appraisal",
            "Analyze the benefits of MBO: performance clarity, mutual commitment, objective appraisal",
            "Discuss the operational pitfalls of MBO: excessive paperwork, short-term focus, authoritarian goal imposition"
          ],
          unitRecapPoints: [
            "Management by Objectives (MBO), developed by Peter Drucker (1954), establishes joint goal-setting between managers and subordinates.",
            "MBO cascades strategic corporate goals down to measurable departmental, divisional, and individual action targets.",
            "Key stages: (1) Formulating organizational mission, (2) Joint objective setting, (3) Periodic progress reviews, (4) Self-control and performance appraisal.",
            "MBO substitutes management by self-control for management by domination, aligning individual ambition with corporate enterprise."
          ],
          topics: [
            {
              id: "top-bus330-15-1",
              title: "Peter Drucker MBO Philosophy, Implementation Cycle, and Pitfalls",
              readingMinutes: 15,
              sourceReference: "BUS 330 Course Guide, Module 4, Unit 4, pp. 139–145",
              textbookDefinitions: [
                {
                  term: "Management by Objectives (MBO)",
                  definition: "A collaborative management process where superiors and subordinates jointly identify common goals, define areas of responsibility in terms of expected results, and use these measures as guides for operating the unit.",
                  sourceAuthor: "Peter F. Drucker (1954)"
                },
                {
                  term: "Management by Self-Control",
                  definition: "Drucker's principle that when employees participate in setting their own measurable performance targets, they monitor and regulate their own performance without oppressive surveillance.",
                  sourceAuthor: "Peter Drucker"
                }
              ],
              content: "Management by Objectives (MBO), formulated by Peter Drucker in his 1954 classic 'The Practice of Management', replaced traditional management by crisis and top-down command with systematic goal alignment.\n\nCore Philosophy of MBO:\nDrucker argued that business enterprises require specialized division of labor, but extreme specialization risks department heads operating as feudal lords pursuing narrow departmental interests rather than corporate mission. MBO harmonizes the efforts of individual managers toward the common enterprise goal.\n\nThe Five-Step MBO Process:\n1. Setting Overall Strategic Objectives: Top executive leadership establishes overarching corporate mission, revenue, and expansion targets.\n2. Cascading and Joint Objective Setting: Superior and subordinate meet collaboratively to define the subordinate specific, measurable, achievable, realistic, and time-bound (SMART) objectives for the upcoming quarter or year.\n3. Action Planning: Formulating concrete operational strategies, resource allocations, and milestone deadlines necessary to hit targets.\n4. Periodic Reviews and Self-Control: Subordinates monitor their own ongoing output against target milestones; periodic meetings provide constructive coaching rather than punitive discipline.\n5. Annual Performance Evaluation: Comprehensive performance review based strictly on measurable results attained against agreed objectives.\n\nBenefits and Common Pitfalls:\n- Benefits: Unambiguous role expectations, heightened employee commitment, objective merit-based promotions, and superior managerial development.\n- Pitfalls: Excessive administrative paperwork, overemphasis on easily measurable short-term quantitative goals at the expense of qualitative long-term vision, and failure of senior executives to practice true participative consultation.",
              summaryPoints: [
                "MBO aligns individual performance with enterprise mission through collaborative goal agreements.",
                "Management by self-control replaces oppressive bureaucratic surveillance with personal responsibility.",
                "Successful MBO requires top-management commitment, training, and balanced qualitative goals."
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const BUS330_QUESTIONS: PastExamQuestionItem[] = [
  {
    id: "pq-bus330-1",
    courseId: "course-bus330",
    courseCode: "BUS 330",
    courseTitle: "Management Theory",
    documentId: "pq-doc-bus330-tma-archives",
    documentName: "BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf",
    sourceFileName: "BUS330_8f9154d9.pdf",
    linkedUnitId: "unit-bus330-1",
    linkedUnitNumber: 1,
    linkedUnitTitle: "Unit 1: Concepts of Administration and Management",
    year: "NOUN Official Examination",
    questionNumber: "TMA 1 / Q1",
    questionType: "written_structured",
    marks: 20,
    totalMarks: 20,
    questionText: "Explain in further detail what constitutes the anatomy and physiology of administration, and distinguish between the integral and managerial views of administration.",
    suppliedAnswer: "According to the authoritative BUS 330 course material:\n1. Anatomy vs. Physiology:\n- The anatomy of administration is the organization structure that states all statutes and roles in hierarchical order with the highest status on top. It shows the structure, divisions, departments, and units.\n- The physiology of administration refers to the processes involved in getting things done in the various offices—meetings, orders, producing documents, dissemination of information, and custody and disbursement of funds.\n- Thus, Anatomy = Organization, and Physiology = Management. Administration = Organization + Management.\n\n2. Integral View vs. Managerial View:\n- The Integral View considers administration as the sum total of all activities (manual, clerical, technical, managerial) undertaken to achieve organizational goals. Here, all employees from the errand boy to the manager are engaged in administration.\n- The Managerial View holds that only superior and supervisory personnel who get things done through others constitute administration. The laborers and clerks perform operations, not administration.",
    modelAnswer: "Anatomy is the formal organizational structure and hierarchy; Physiology is the management process of planning, directing, coordinating, and executing activities. Integral view includes all employees; Managerial view restricts administration to supervisory staff.",
    keyRubricPoints: [
      "Definition of Anatomy as organizational structure",
      "Definition of Physiology as management processes and operations",
      "Clear distinction between Integral View (all workers) and Managerial View (supervisory personnel only)",
      "Mention of Dwight Waldo or Henry Fayol time distribution"
    ],
    difficulty: "Core",
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: "answer_supplied",
    unitMappingStatus: "mapped"
  },
  {
    id: "pq-bus330-2",
    courseId: "course-bus330",
    courseCode: "BUS 330",
    courseTitle: "Management Theory",
    documentId: "pq-doc-bus330-tma-archives",
    documentName: "BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf",
    sourceFileName: "BUS330_8f9154d9.pdf",
    linkedUnitId: "unit-bus330-2",
    linkedUnitNumber: 2,
    linkedUnitTitle: "Unit 2: Concept of Theory and Scientific Research",
    year: "NOUN Official Examination",
    questionNumber: "TMA 2 / Q2",
    questionType: "written_structured",
    marks: 20,
    totalMarks: 20,
    questionText: "Explain fully the definition of a theory as 'a scientifically, generally acceptable set of principles used to explain a phenomenon', and outline the six steps in theory construction.",
    suppliedAnswer: "Based on BUS 330 text:\n1. Analysis of Definition Components:\n- 'Scientifically': The theory is formulated through systematic discovery, observation, experimentation, and measurement.\n- 'Generally Acceptable': A substantial majority of empirical observations (or respondents) support the validity of the hypothesis.\n- 'Set of Principles': A coherent framework of rules, laws, and causal relationships serving as a guide to the phenomenon.\n\n2. Six Steps in Theory Construction:\n(1) Selecting the problem (clearly and narrowly defined)\n(2) Collection of empirical data\n(3) Classification and enumeration of data\n(4) Formulation of hypothesis with simplifying assumptions\n(5) Testing of hypothesis using logic and statistical methods\n(6) Verification of theory against new facts to solidify it into law.",
    modelAnswer: "Theory is a verified body of principles explaining causal relationships. The six steps are: Problem selection, Data collection, Classification, Hypothesis formulation, Testing, and Verification.",
    keyRubricPoints: [
      "Deconstruction of 'scientifically', 'generally acceptable', and 'set of principles'",
      "Listing the 6 chronological steps of theory formulation",
      "Distinction between hypothesis and verified theory"
    ],
    difficulty: "Core",
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: "answer_supplied",
    unitMappingStatus: "mapped"
  },
  {
    id: "pq-bus330-3",
    courseId: "course-bus330",
    courseCode: "BUS 330",
    courseTitle: "Management Theory",
    documentId: "pq-doc-bus330-tma-archives",
    documentName: "BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf",
    sourceFileName: "BUS330_8f9154d9.pdf",
    linkedUnitId: "unit-bus330-4",
    linkedUnitNumber: 4,
    linkedUnitTitle: "Unit 2: The Scientific Management Theory (Taylorism)",
    year: "NOUN Official Examination",
    questionNumber: "TMA 3 / Q3",
    questionType: "written_structured",
    marks: 20,
    totalMarks: 20,
    questionText: "Discuss F.W. Taylor Bethlehem Steel shoveling experiment, and explain the four core principles of scientific management.",
    suppliedAnswer: "1. The Bethlehem Steel Shoveling Experiment:\nTaylor found that shovelers handled materials ranging from light coal to heavy iron ore using the same shovel, with load weights between 4 and 38 pounds. Through scientific experiment, Taylor established that the optimal shovel load was 21.5 pounds. By distributing specific sized shovels for each material and introducing planned rest periods, daily output per man jumped from 16 to 59 tons, wages increased by 60%, and handling costs fell by 50%.\n\n2. Four Core Principles of Taylorism:\n(1) Science of Work: Developing a true science for each element of a task to replace rule-of-thumb.\n(2) Scientific Selection and Training: Scientifically selecting workmen and training them to become 'first-class men'.\n(3) Bringing Science and Workmen Together: Inducing workmen to execute tasks in accordance with scientific laws.\n(4) Equal Division of Work: Division of responsibilities between management (planning, preparation) and labor (execution).",
    modelAnswer: "Taylor discovered the optimal 21.5 lb shovel load at Bethlehem Steel. The 4 principles are: Science of work, Scientific selection/training, Combining science and labor, and Equal division of work.",
    keyRubricPoints: [
      "Detail of Bethlehem Steel shoveling study (21.5 lb load, tonnage increase from 16 to 59 tons)",
      "Accurate listing and explanation of Taylor 4 core principles"
    ],
    difficulty: "Core",
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: "answer_supplied",
    unitMappingStatus: "mapped"
  },
  {
    id: "pq-bus330-4",
    courseId: "course-bus330",
    courseCode: "BUS 330",
    courseTitle: "Management Theory",
    documentId: "pq-doc-bus330-tma-archives",
    documentName: "BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf",
    sourceFileName: "BUS330_8f9154d9.pdf",
    linkedUnitId: "unit-bus330-6",
    linkedUnitNumber: 6,
    linkedUnitTitle: "Unit 4: Bureaucracy Theory (Max Weber)",
    year: "NOUN Official Examination",
    questionNumber: "TMA 4 / Q4",
    questionType: "written_structured",
    marks: 20,
    totalMarks: 20,
    questionText: "Contrast Max Weber three types of legitimate authority, and outline at least six core characteristics of the ideal-type bureaucracy.",
    suppliedAnswer: "1. Three Types of Authority:\n- Traditional Authority: Legitimacy rests on ancient customs, hereditary rights, and personal devotion to customary rulers.\n- Charismatic Authority: Legitimacy rests on extraordinary personal devotion to the heroism, sanctity, or exemplary qualities of an individual leader.\n- Legal-Rational Authority: Legitimacy rests on codified, enacted laws and rules where obedience is owed to the impersonal legal office rather than the person.\n\n2. Core Characteristics of Bureaucracy:\n(1) Clear jurisdictional competence governed by rules\n(2) Hierarchical order of offices\n(3) Preservation of official documents and files\n(4) Expert technical training as criterion for employment\n(5) Fixed salary and career advancement by seniority or merit\n(6) Complete separation of the official personal funds from corporate office property.",
    modelAnswer: "Weber three authority types: Traditional, Charismatic, and Legal-Rational. Bureaucratic characteristics include hierarchy, rules, files, technical training, fixed salary tenure, and separation of private and official property.",
    keyRubricPoints: [
      "Accurate distinction between Traditional, Charismatic, and Legal-Rational authority",
      "Listing at least 6 features of Weber ideal bureaucracy"
    ],
    difficulty: "Challenging",
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: "answer_supplied",
    unitMappingStatus: "mapped"
  },
  {
    id: "pq-bus330-5",
    courseId: "course-bus330",
    courseCode: "BUS 330",
    courseTitle: "Management Theory",
    documentId: "pq-doc-bus330-tma-archives",
    documentName: "BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf",
    sourceFileName: "BUS330_8f9154d9.pdf",
    linkedUnitId: "unit-bus330-8",
    linkedUnitNumber: 8,
    linkedUnitTitle: "Unit 2: Administrative Leadership Theory (Follett & Barnard)",
    year: "NOUN Official Examination",
    questionNumber: "TMA 5 / Q5",
    questionType: "written_structured",
    marks: 20,
    totalMarks: 20,
    questionText: "Explain Mary Parker Follett concept of Integration in conflict resolution, and analyze Chester Barnard Acceptance Theory of Authority.",
    suppliedAnswer: "1. Mary Parker Follett on Integration:\nFollett identified three ways of resolving conflict: Domination (one side wins, creating resentment), Compromise (both sides make sacrifices, neither fully satisfied), and Integration (creative synthesis where the real needs of both sides are satisfied without either making a sacrifice). Integration solves the root cause rather than treating symptoms.\n\n2. Chester Barnard Acceptance Theory of Authority:\nBarnard proved that authority flows from the bottom up rather than from top-down fiat. A subordinate accepts an order as authoritative only when four conditions occur simultaneously:\n(1) He understands the communication (intelligibility)\n(2) He believes it is consistent with the purpose of the organization\n(3) He believes it is compatible with his personal interests as a whole\n(4) He is mentally and physically capable of complying with it.",
    modelAnswer: "Integration resolves conflict by devising creative solutions satisfying both parties without compromise. Barnard Acceptance Theory demonstrates authority is granted by subordinate assent based on four simultaneous conditions.",
    keyRubricPoints: [
      "Definition of Integration vs. Domination and Compromise",
      "Barnard Acceptance Theory of Authority and the 4 simultaneous conditions"
    ],
    difficulty: "Core",
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: "answer_supplied",
    unitMappingStatus: "mapped"
  }
];
