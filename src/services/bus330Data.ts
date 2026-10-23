import { Course, PastExamQuestionItem, StudyModule } from '../types';
import { BUS330_UPLOADED_PQ_DOCUMENTS } from './bus330PastQuestionsData';

export const BUS330_COURSE: Course = {
  "id": "course-bus330",
  "code": "BUS 330",
  "title": "Management Theory",
  "department": "Business Administration",
  "description": "National Open University of Nigeria (NOUN) Master and Undergraduate curriculum in Management Theory: concepts of administration, classical administrative principles, Taylorism, Weberian bureaucracy, human relations, Follett, Barnard, and modern motivation systems.",
  "createdAt": "2026-10-22T08:53:14.072Z",
  "documents": [
    {
      "id": "doc-bus330-textbook",
      "name": "BUS330_8f9154d9.pdf",
      "fileType": "pdf",
      "fileSize": 2450000,
      "uploadedAt": "2026-10-22T08:53:14.071Z",
      "extractedHeadingsCount": 15,
      "pageCount": 106,
      "status": "ready",
      "processingStatus": "fully_processed",
      "summary": "Official NOUN course guide for BUS 330: Management Theory by Dr. Ibrahim Adamu and Prof. Victor Ekhator."
    },
    {
      "id": "doc-bus330-psalmdata-pop",
      "name": "BUS330_MANAGEMENT_THEORY_PSALMDATA_POP_SUMMARY.pdf",
      "fileType": "pdf",
      "fileSize": 1250000,
      "uploadedAt": "2026-10-23T07:15:00Z",
      "extractedHeadingsCount": 8,
      "pageCount": 30,
      "status": "ready",
      "processingStatus": "fully_processed",
      "summary": "Official NOUN POP examination past questions and verified marking schemes spanning 2018–2024 from Psalmdata Telecom & Computer Cafe."
    },
    {
      "id": "doc-bus330-lagoldmine-summary",
      "name": "BUS330_MANAGEMENT_THEORY_SUMMARY_LA_GOLDMINE_SOLUTIONS.pdf",
      "fileType": "pdf",
      "fileSize": 1845000,
      "uploadedAt": "2026-10-23T07:14:00Z",
      "extractedHeadingsCount": 12,
      "pageCount": 49,
      "status": "ready",
      "processingStatus": "fully_processed",
      "summary": "Comprehensive POP exam summary and detailed academic solutions guide for BUS 330 from La Goldmine Solutions."
    }
  ],
  "pastQuestionDocuments": BUS330_UPLOADED_PQ_DOCUMENTS,
  "modules": [
    {
      "id": "mod-bus330-1",
      "moduleNumber": 1,
      "title": "Module 1: The Concepts of Administration, Management and Theory",
      "description": "Foundational concepts, administrative dimensions, science vs. art, systems perspective, universality, and the architecture of theoretical construction.",
      "units": [
        {
          "id": "unit-bus330-1",
          "unitNumber": "1.0",
          "title": "Unit 1: Concepts of Administration and Management",
          "objectives": [
            "Define administration from both the integral and managerial perspectives",
            "Explain the four basic characteristics of modern administration: coordination, search for better ways, functions, and control",
            "Analyze management as an art and as a science",
            "Evaluate management as a system and explain the universality of management"
          ],
          "unitRecapPoints": [
            "Administration is derived from Latin \"adminis-trare\" meaning to care for or look after people to manage affairs.",
            "According to Professor Dwight Waldo (1956), administration is the organization and management of human and material resources to achieve a stated objective.",
            "Integral view regards administration as the sum total of all activities (manual, clerical, technical, managerial); managerial view restricts it to superior supervisory personnel.",
            "Management is both an art (creative application of skill and vision) and a science (systematic procedures and empirical testing).",
            "The systems approach views the enterprise as an integrated whole of interdependent sub-systems (production, finance, marketing, personnel)."
          ],
          "topics": [
            {
              "id": "top-bus330-1-1",
              "title": "The Concept and Nature of Administration",
              "readingMinutes": 12,
              "sourceReference": "BUS 330 Course Guide, Module 1, Unit 1, Section 3.1, pp. 6–10",
              "textbookDefinitions": [
                {
                  "term": "Administration (Dwight Waldo, 1956)",
                  "definition": "Organization and management of human and material resources to achieve a stated objective. If public oriented, it is public administration; if private oriented, it is private administration.",
                  "sourceAuthor": "Professor Dwight Waldo (1956)"
                },
                {
                  "term": "Administration (Simon, Smithburg and Thompson)",
                  "definition": "The activities of groups cooperating to accomplish common goals, providing basic public services such as protection, public works, education, and health.",
                  "sourceAuthor": "Simon, Smithburg & Thompson"
                },
                {
                  "term": "Integral View vs. Managerial View",
                  "definition": "Integral view considers all personnel (from errand boy to general manager) as engaged in administration; managerial view holds that only supervisory and directing staff constitute administration.",
                  "sourceAuthor": "Administrative Theory Literature"
                }
              ],
              "content": "The word 'administer', derived from the Latin words adminis-trare, means to care for or to look after people to manage affairs. Administration is a universal process permeating all collective efforts, be it public or private, civil or military, large scale or otherwise. It is a cooperative effort directed towards the realization of a consciously laid down objective.\n\nAccording to Professor Dwight Waldo (1956), administration is the organization and management of human and material resources to achieve a stated objective. If the objective is public oriented, then it is public administration; if the objective is private oriented, then it is private administration. Specifically, if the set objective is profit maximization, then it is business administration. Thus Administration is the umbrella covering organization and management:\n- Organization is the structure, the skeleton, the anatomy of administration.\n- Management is the process, the flesh and the physiology of administration.\nHence: Administration = Organization + Management. None of them in isolation can form administration without the other.\n\nIn common parlance, administration bears four different meanings:\n1. Cabinet or governing council in supreme charge of affairs.\n2. A branch of learning or intellectual discipline (e.g., public administration as a social science).\n3. The sum total of activities undertaken to implement public policy or deliver services.\n4. The art of management.\n\nScholars divide administration into two prominent views:\n- The Integral View: Administration is the sum total of all activities (manual, clerical, technical, and managerial) undertaken to realize the objective. Under this view, every employee contributes to administration.\n- The Managerial View: Administration is restricted solely to the managerial techniques of planning, organizing, coordinating, directing, and controlling. Only executives, managers, and foremen who get things done through others are considered administrators. Henry Fayol pointed out that administrative time increases with job grade: a workman spends 5% of time on administration and 85% on technical work, while a general manager spends 50% on administration and only 10% on technical work.",
              "summaryPoints": [
                "Administration = Organization (structure/skeleton) + Management (process/physiology).",
                "Integral view encompasses all operational personnel; Managerial view restricts administration to supervisory coordinators.",
                "Dwight Waldo defines administration as the organization and management of human and material resources."
              ],
              "checkpointQuiz": [
                {
                  "id": "cp-bus330-1-1",
                  "prompt": "According to Professor Dwight Waldo (1956), how is administration defined?",
                  "options": [
                    "The organization and management of human and material resources to achieve a stated objective",
                    "The mechanical automation of factory production lines",
                    "The exclusive legal authority of judicial courts over citizens",
                    "The process of maximizing individual profits without governmental regulations"
                  ],
                  "correctIndex": 0,
                  "explanation": "Dwight Waldo defines administration as the organization and management of human and material resources to achieve a stated objective.",
                  "origin": "ai_generated"
                }
              ]
            },
            {
              "id": "top-bus330-1-2",
              "title": "Characteristics, Functions and Universality of Management",
              "readingMinutes": 14,
              "sourceReference": "BUS 330 Course Guide, Module 1, Unit 1, Sections 3.2–3.8, pp. 11–20",
              "textbookDefinitions": [
                {
                  "term": "Characteristics of Modern Administration",
                  "definition": "Coordination (not mere specialization), search for better ways, functional perspective, and positive control based on information and trends.",
                  "sourceAuthor": "BUS 330 Syllabus"
                },
                {
                  "term": "Management as a System",
                  "definition": "Viewing internal and external environmental factors as an integrated whole composed of interdependent sub-systems (production, finance, marketing, procurement, personnel).",
                  "sourceAuthor": "Systems Theory"
                },
                {
                  "term": "Universality of Management",
                  "definition": "Management functions (planning, organizing, staffing, directing, controlling) are identical in all formal organizations and managerial know-how is transferable across enterprises.",
                  "sourceAuthor": "Universalist School"
                }
              ],
              "content": "Modern administration exhibits four primary characteristics:\n1. Co-ordination, Not Specialization: An administrator need not be a superior technical specialist in every area. His major job is the coordination of capable specialists.\n2. The Search for Better Ways: Continuously challenging old ways and combining critical thinking to achieve operational improvements.\n3. Functional Focus: The administrator thinks in terms of objectives, planning, guiding policies, organization structure, personnel development, and consultative management.\n4. Positive Control: Control has evolved from negative restriction and authoritarian prevention to positive monitoring—knowing progress compared to standards, predicting trends, and initiating timely remedial action.\n\nManagement as an Art and Science:\n- Management as an Art: Involves creative application, vision, intuition, judgment, and personal skill in dealing with human behavior.\n- Management as a Science: Employs systematic observation, experimentation, measurement, and validation of principles (pioneered by F.W. Taylor).\n\nThe Systems Approach to Management:\nAn enterprise is viewed as a unified whole made of interdependent sub-systems (production, marketing, finance, personnel). When one sub-system fails, the entire system experiences a setback. The manager's duty is to integrate these sub-systems toward balanced organizational goals.\n\nUniversality of Management:\nManagement functions are identical across all formal organizations, whether profit-making businesses, civil services, educational institutions, or hospitals. All managers make decisions, focus on objectives, plan policies, organize resources, direct subordinates, and control activities. Managerial knowledge is therefore transferable from one organization to another.",
              "summaryPoints": [
                "Four administrative characteristics: Coordination, search for better ways, functional perspective, and positive control.",
                "Management blends art (judgment, human skill) and science (systematic methods, principles).",
                "Universality of management confirms that core managerial functions are transferable across all organizations."
              ]
            }
          ]
        },
        {
          "id": "unit-bus330-2",
          "unitNumber": "2.0",
          "title": "Unit 2: Concept of Theory and Scientific Research",
          "objectives": [
            "Define theory and explain theory construct",
            "Describe the six steps required to construct a scientific theory",
            "Contrast methods of seeking knowledge: tenacity, authority, intuition, mystical, and scientific",
            "Distinguish exploratory, descriptive, and causal research"
          ],
          "unitRecapPoints": [
            "A theory is a statement of assumed causal relationship between variables (Reuben) or a scientifically, generally acceptable set of principles used to explain a phenomenon.",
            "Theory construction involves: (1) Selecting problem, (2) Collection of data, (3) Classification of data, (4) Formulation of hypothesis, (5) Testing of hypothesis, (6) Verification of theory.",
            "Stages of theory development: Speculative, Descriptive, and Constructive.",
            "The scientific method is a systematic, controlled, and empirical investigation of hypothetical propositions."
          ],
          "topics": [
            {
              "id": "top-bus330-2-1",
              "title": "Theory Construct and Scientific Inquiry",
              "readingMinutes": 12,
              "sourceReference": "BUS 330 Course Guide, Module 1, Unit 2, Sections 3.1–3.6, pp. 21–32",
              "textbookDefinitions": [
                {
                  "term": "Theory (Ernest Nagel)",
                  "definition": "A set of statements, organized in a characteristic way, designed to serve as partial premises for explaining as well as predicting an indeterminately large class of phenomena.",
                  "sourceAuthor": "Ernest Nagel"
                },
                {
                  "term": "Hypothesis",
                  "definition": "A suggested answer to a problem by the aid of which we endeavor to explain facts by discovering their orderliness.",
                  "sourceAuthor": "Research Methodology"
                }
              ],
              "content": "A theory is a coherent set of ideas that explains observed facts or phenomena and sets out governing laws and principles. Gopnik and Meltzoff (1997) identify three conditions on theories:\n1. Structural: Abstract, coherent, causally organized, and ontologically committed.\n2. Functional: Make predictions, interpret evidence in new ways, and provide causal explanations.\n3. Dynamic: Revised or replaced in response to empirical counterevidence.\n\nSix Steps in Theory Formulation:\n1. Selecting the Problem: Identifying a clearly stated, narrow problem.\n2. Collection of Data: Gathering empirical facts pertaining to the problem.\n3. Classification of Data: Enumerating, grouping, and analyzing data by resemblances and differences.\n4. Formulation of Hypothesis: Proposing an educated proposition or suggested answer with simplifying assumptions.\n5. Testing of Hypothesis: Deductive testing through logical and statistical techniques.\n6. Verification of Theory: Confirming the hypothesis against independent observation or experimental consistency. If proved valid, it solidifies into a scientific principle or law.\n\nMethods of Seeking Knowledge:\n- Tenacity: Believing something because it has always been held to be true.\n- Authority: Accepting statements from established political, religious, or academic authorities.\n- Intuition / A-Priori: Believing propositions that appeal to reason without empirical testing.\n- Mystical Method: Relying on supernatural revelations.\n- Scientific Method: Systematic, controlled, and empirical investigation of hypothetical relationships.",
              "summaryPoints": [
                "Theories explain \"why\" and predict outcomes across domains.",
                "Six rigorous steps form the foundation of scientific theory construction.",
                "The scientific method supersedes tenacity, intuition, and authority in administrative inquiry."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "mod-bus330-2",
      "moduleNumber": 2,
      "title": "Module 2: Scientific Management and Classical Administrative Theories",
      "description": "The roots of administrative science in military history and economics, Taylorism, Fayol, Gulick, Urwick, Mooney, Reiley, and Max Weber Bureaucratic Theory.",
      "units": [
        {
          "id": "unit-bus330-3",
          "unitNumber": "1.0",
          "title": "Unit 1: Early Development of Administration and Management",
          "objectives": [
            "Trace the origin of public management in ancient civilizations and military operations",
            "Explain the contributions of ancient Rome and Augustus Caesar to civil service and merit systems",
            "Compare the nine U.S. Army principles of war with civilian management principles",
            "Analyze Adam Smith pin factory analysis and good organization as a force multiplier"
          ],
          "unitRecapPoints": [
            "Civilization and administration developed together; the first public administrators were military officers managing city defense.",
            "Emperor Augustus Caesar established the first formal civil service to fund and maintain legions through regularized taxation.",
            "Nine military principles: Objective, Offensive, Mass, Economy of force, Maneuver, Unity of command, Security, Surprise, Simplicity.",
            "Adam Smith (1776, The Wealth of Nations) demonstrated how division of labor in a pin factory multiplies output from dozens to tens of thousands of pins daily.",
            "Proper organization is a technology and force multiplier that enables combined individual efforts to far exceed their sum."
          ],
          "topics": [
            {
              "id": "top-bus330-3-1",
              "title": "Military Heritage, Roman Administration and Adam Smith",
              "readingMinutes": 14,
              "sourceReference": "BUS 330 Course Guide, Module 2, Unit 1, Sections 3.1–3.7, pp. 33–50",
              "textbookDefinitions": [
                {
                  "term": "Force Multiplier",
                  "definition": "Any technology or organizational doctrine that makes combined individual efforts far greater than the sum of their parts.",
                  "sourceAuthor": "Military Administration"
                },
                {
                  "term": "Division of Labour (Adam Smith, 1776)",
                  "definition": "Specialization of tasks in manufacturing which dramatically increases dexterity, saves time passing between tasks, and enables technological innovation.",
                  "sourceAuthor": "Adam Smith (Wealth of Nations)"
                }
              ],
              "content": "Civilization and administration have always gone hand in hand. In ancient times, cities were fortified by defensive walls. Governing cities required sophisticated logistics, supply, and command. Thus, the profession of management began as the profession of arms. Hierarchy, line and staff personnel, communications, and strategy (from Greek \"art of the general\") all originated in military governance.\n\nRoman Empire & Merit Administration:\nAncient Rome depersonalized the state, separated public finances from rulers' private funds, and established a centralized hierarchy. Emperor Augustus Caesar created the first formal civil service to regulate pay and pensions for the military, laying the groundwork for the modern merit system.\n\nAdam Smith & The Pin Factory:\nIn 1776, Adam Smith published 'The Wealth of Nations', establishing that the division of labor is the primary engine of productivity. Traditional pin makers working alone could produce only a few dozen pins a day. But when organized into ten specialized operations (drawing wire, straightening, cutting, pointing, grinding, heading, etc.), a small team produced over 48,000 pins daily. Organization acts as a force multiplier: good organization is a technology in its own right that achieves exponential output gains.",
              "summaryPoints": [
                "Military logistics and command laid the foundation for civilian administration.",
                "Rome introduced civil service, public finance separation, and merit-based administrative hierarchy.",
                "Adam Smith proved that specialization and division of labor multiply productivity by thousands of percent."
              ]
            }
          ]
        },
        {
          "id": "unit-bus330-4",
          "unitNumber": "2.0",
          "title": "Unit 2: The Scientific Management Theory (Taylorism)",
          "objectives": [
            "Examine Frederick Winslow Taylor work at Midvale and Bethlehem Steel",
            "Explain Taylor four fundamental principles of scientific management",
            "Analyze Frank and Lillian Gilbreth contributions to time and motion studies",
            "Evaluate the achievements and weaknesses of scientific management"
          ],
          "unitRecapPoints": [
            "Taylor attacked rule-of-thumb methods and systemic soldiering (underworking) by developing the \"one best way\" through scientific measurement.",
            "Bethlehem Steel shoveling experiments proved that optimal shovel load is 21.5 pounds, increasing daily tonnage by over 300%.",
            "Taylor 4 Principles: (1) Science of work, (2) Scientific selection and training of workmen, (3) Bringing science and workmen together, (4) Equal division of work between management and labor.",
            "Frank & Lillian Gilbreth pioneered Time and Motion Studies (bricklaying increased from 120 to 360 bricks/hr) and three-position plan of promotion.",
            "Criticisms: Mechanistic machine theory, neglect of human psychology, and over-reliance on financial incentives."
          ],
          "topics": [
            {
              "id": "top-bus330-4-1",
              "title": "Principles of Taylorism, Shoveling Experiments and Gilbreth Studies",
              "readingMinutes": 15,
              "sourceReference": "BUS 330 Course Guide, Module 2, Unit 2, Sections 3.1–3.6, pp. 51–61",
              "textbookDefinitions": [
                {
                  "term": "Scientific Management",
                  "definition": "The use of scientific methods (observation, experimentation, measurement) to define the one best way for a job to be done, replacing rule-of-thumb intuition.",
                  "sourceAuthor": "Frederick Winslow Taylor (1911)"
                },
                {
                  "term": "Systematic Soldiering",
                  "definition": "Deliberate restriction of output by workers reacting to arbitrary piece-rate cuts and management lack of standards.",
                  "sourceAuthor": "F.W. Taylor"
                },
                {
                  "term": "Time and Motion Study",
                  "definition": "Analyzing the sequence of motions in a task to eliminate wasteful movements, reduce fatigue, and set standard output times.",
                  "sourceAuthor": "Frank & Lillian Gilbreth"
                }
              ],
              "content": "Frederick Winslow Taylor (1856–1915), the father of Scientific Management, observed that workers engaged in systematic soldiering (deliberate underworking) because management had no clear concept of worker responsibilities, lacked work standards, and arbitrarily cut piece rates.\n\nThe Bethlehem Steel Shoveling Experiment:\nTaylor observed that shovelers handled materials ranging from light rice coal to heavy iron ore using the same shovel, with loads varying from 4 to 38 pounds. Through systematic experimentation, Taylor found that maximum productivity occurred at a shovel load of 21.5 pounds. By providing sized shovels for specific materials and scheduling regulated rest periods, daily output jumped from 16 to 59 tons per man, wages rose by 60%, and unit handling costs fell by 50%.\n\nTaylor's Four Principles:\n1. Science of Work: Developing a true science for each task with clear daily task standards.\n2. Scientific Selection & Training: Scientifically selecting and systematically developing the workman into a \"first-class man\".\n3. Bringing Science and Men Together: Ensuring work conforms to scientific methods.\n4. Equal Division of Work: Management handles planning, preparation, and supervision, while workers execute operations.\n\nFrank and Lillian Gilbreth:\nFrank Gilbreth studied bricklaying and reduced movements from 18 to 5 motions per brick, boosting productivity from 120 to 360 bricks per hour. The Gilbreths conducted Time and Motion Studies to eliminate fatigue and developed the 'three-position plan of promotion' (every worker is simultaneously doing his job, learning from the position above, and teaching the worker below).",
              "summaryPoints": [
                "Taylor replaced rule-of-thumb with the scientific discovery of the optimal 21.5 lb shovel load.",
                "Taylor four principles called for a complete mental revolution between management and workers.",
                "Gilbreths perfected time and motion analysis, reducing fatigue and waste."
              ]
            }
          ]
        },
        {
          "id": "unit-bus330-5",
          "unitNumber": "3.0",
          "title": "Unit 3: The Main Classical Theorists (Fayol, Gulick, Urwick, Mooney & Reiley)",
          "objectives": [
            "Explain Henry Fayol 5 elements of management, 6 operational activities, and 14 principles of management",
            "Detail Luther Gulick POSDCORB acronym and 4P-Formula of departmentalization",
            "Review Lyndall Urwick 8 principles of organization",
            "Analyze Mooney and Reiley 4 principles: Coordination, Scalar Process, Functionalism, Line and Staff"
          ],
          "unitRecapPoints": [
            "Fayol identified 6 industrial operations: Technical, Commercial, Financial, Security, Accounting, and Administration (the umbrella function).",
            "Fayol 14 Principles: Division of work, Authority & responsibility, Discipline, Unity of command, Unity of direction, Subordination of individual interest, Remuneration, Centralization, Scalar chain, Order, Equity, Stability of tenure, Initiative, Esprit de corps.",
            "Gulick coined POSDCORB: Planning, Organising, Staffing, Directing, Coordinating, Reporting, Budgeting; and the 4Ps: Purpose, Process, Persons, Place.",
            "Mooney & Reiley established Coordination as the first principle of organization operating through the scalar process and functional differentiation.",
            "Critics (Herbert Simon, Dwight Waldo) argued classical principles occur in contradictory pairs like proverbs."
          ],
          "topics": [
            {
              "id": "top-bus330-5-1",
              "title": "Classical Administrative Thought: Fayol, Gulick, Urwick and Mooney",
              "readingMinutes": 16,
              "sourceReference": "BUS 330 Course Guide, Module 2, Unit 3, Sections 3.1–3.5, pp. 62–73",
              "textbookDefinitions": [
                {
                  "term": "POSDCORB (Luther Gulick, 1937)",
                  "definition": "Planning, Organising, Staffing, Directing, COordinating, Reporting, Budgeting—the seven core functions of the chief executive.",
                  "sourceAuthor": "Luther Gulick"
                },
                {
                  "term": "4P-Formula (Gulick)",
                  "definition": "Bases of departmental organization: Purpose (function), Process (skills), Persons (clientele), and Place (geographical area).",
                  "sourceAuthor": "Luther Gulick"
                },
                {
                  "term": "Scalar Process (Mooney and Reiley)",
                  "definition": "The universal process of coordination through which the supreme coordinating authority operates throughout the whole organization in an unbroken vertical chain.",
                  "sourceAuthor": "James D. Mooney & Alan C. Reiley"
                }
              ],
              "content": "Henry Fayol (1841–1925), a French mining engineer and managing director of Commentry-Fourchambault, is the father of modern operational management. Fayol divided all industrial activities into six categories:\n1. Technical (production, manufacturing)\n2. Commercial (buying, selling, exchange)\n3. Financial (search for and optimum use of capital)\n4. Security (protection of property and persons)\n5. Accounting (balance sheet, costs, statistics)\n6. Administration (planning, organizing, commanding, coordinating, controlling)\n\nFayol declared administration as the supreme operational activity. He formulated the 14 Principles of Management:\n1. Division of Work, 2. Authority and Responsibility, 3. Discipline, 4. Unity of Command (one subordinate, one boss), 5. Unity of Direction, 6. Subordination of Individual Interest to General Interest, 7. Remuneration, 8. Centralization, 9. Scalar Chain (line of authority with Fayol's gangplank for lateral communication), 10. Order (a place for everything and everything in its place), 11. Equity, 12. Stability of Tenure of Personnel, 13. Initiative, 14. Esprit de Corps (team unity).\n\nGulick and Urwick (1937, Papers on the Science of Administration):\nLuther Gulick formulated the famous acronym POSDCORB to summarize executive duties: Planning, Organising, Staffing, Directing, Coordinating, Reporting, and Budgeting. He also identified the 4P-Formula for departmental structure: Purpose, Process, Persons, and Place.\nLyndall Urwick established 8 principles of organization, notably the Principle of Span of Control (no supervisor should directly supervise more than 5 or 6 subordinates whose work interlocks).\n\nMooney and Reiley (1931, Onward Industry):\nFormulated four principles: Coordination (the master principle), Scalar Process (vertical hierarchy), Functional Differentiation (distinction between duties), and Line and Staff (line executive authority backed by staff advisory intelligence).",
              "summaryPoints": [
                "Fayol established administration as the vital umbrella over technical, commercial, financial, security, and accounting operations.",
                "POSDCORB and 4P-Formula provide the architectural framework for formal departmentalization.",
                "Mooney and Reiley formulated coordination through scalar hierarchy and functional division."
              ]
            }
          ]
        },
        {
          "id": "unit-bus330-6",
          "unitNumber": "4.0",
          "title": "Unit 4: Bureaucracy Theory (Max Weber)",
          "objectives": [
            "Define bureaucracy and explain Vincent de Gourney coining of the term",
            "Contrast Max Weber three types of legitimate authority: Charismatic, Traditional, and Legal-Rational",
            "List the 10 characteristics of Weber ideal-type monocratic bureaucracy",
            "Evaluate Weber critics: Talcott Parsons, Robert K. Merton, Philip Selznick, Alvin Gouldner, and Michel Crozier"
          ],
          "unitRecapPoints": [
            "Bureaucracy was coined by Vincent de Gourney in 1745 from French \"bureau\" (desk); Max Weber developed it as an \"ideal type\" mental construct.",
            "Three Authority Typologies: Charismatic (personal grace/revelation, unstable), Traditional (immemorial custom/patrimonial, merit deficit), Legal-Rational (impersonal legal order, rules, competency).",
            "10 Structural & Behavioral Properties: Hierarchy, Division of labor, System of abstract rules, Technical qualification & examinations, Fixed salaries & pensions, Separation of office from incumbent, Impersonality, and Neutrality.",
            "Merton identified \"displacement of goals\" and \"trained incapacity\"; Gouldner identified \"punishment-centered\" vs \"representative\" bureaucracy; Crozier showed bureaucracy cannot learn from errors."
          ],
          "topics": [
            {
              "id": "top-bus330-6-1",
              "title": "Weberian Ideal-Type Bureaucracy and Authority Typologies",
              "readingMinutes": 16,
              "sourceReference": "BUS 330 Course Guide, Module 2, Unit 4, Sections 3.1–3.7, pp. 74–85",
              "textbookDefinitions": [
                {
                  "term": "Legal-Rational Authority (Max Weber)",
                  "definition": "Authority resting on a belief in the legality of patterns of normative rules and the right of those elevated to authority under such rules to issue impersonal commands.",
                  "sourceAuthor": "Max Weber (1922)"
                },
                {
                  "term": "Ideal Type (Weber)",
                  "definition": "A conceptual model or mental construct capturing the purest rational elements of an organizational form, serving as an analytical benchmark rather than an empirical reality.",
                  "sourceAuthor": "Max Weber"
                },
                {
                  "term": "Trained Incapacity (Thorstein Veblen / Robert K. Merton)",
                  "definition": "The state where an official actions based on rigid training and routine procedures become inappropriate or dysfunctional under new, changed conditions.",
                  "sourceAuthor": "Robert K. Merton"
                }
              ],
              "content": "Max Weber (1864–1920), the German sociologist, founded the modern systematic study of bureaucracy. Weber distinguished Power (ability to impose one's will despite resistance) from Authority (power characterized by legitimacy and voluntary obedience).\n\nThree Pure Types of Legitimate Authority:\n1. Charismatic Authority: Devotion to exceptional sanctity, heroism, or exemplary character of an individual. Highly unstable; tends to break down upon the leader's death unless routinized.\n2. Traditional Authority: Rooted in immemorial traditions and personal loyalty to hereditary rulers (feudal/patrimonial). Lacks meritocracy in succession.\n3. Legal-Rational Authority: Obedience is owed to an impersonal, legally established normative order. Officials exercise authority only within the legal competence of their office. Bureaucracy forms the administrative staff of legal-rational authority.\n\nWeber's 10 Characteristics of Ideal-Type Bureaucracy:\n1. Officials are personally free, subject to authority only in official duties.\n2. Clearly defined hierarchy of offices (every lower office under control of a higher one).\n3. Clearly specified legal sphere of competence and functions.\n4. Offices filled by free contractual selection.\n5. Selection based on technical qualifications, tested by examination or verified diplomas.\n6. Remunerated by fixed graded salaries with pension rights.\n7. Office is the sole or primary occupation of the incumbent.\n8. Clear career structure with promotion by seniority or merit.\n9. Complete separation of the official from ownership of the means of administration.\n10. Strict, systematic discipline and operational impersonality.\n\nDysfunctions and Critiques:\n- Robert K. Merton: Rigid rule adherence causes displacement of goals—instrumental rules (means) become terminal values (ends), causing trained incapacity.\n- Philip Selznick: Delegation leads to departmentalization and bifurcation of sub-unit interests.\n- Alvin Gouldner: Promulgation of rules creates tension between managers and subordinates, forming punishment-centered bureaucracy.",
              "summaryPoints": [
                "Weber legal-rational authority replaces nepotism and traditional inheritance with technical competence.",
                "The ideal-type bureaucracy maximizes precision, calculability, and operational stability.",
                "Merton and Selznick proved that excessive rigidity causes goal displacement and trained incapacity."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "mod-bus330-3",
      "moduleNumber": 3,
      "title": "Module 3: Neo-Classical or Human Relations Theory",
      "description": "The Hawthorne experiments by Elton Mayo, Mary Parker Follett constructive conflict, Chester Barnard cooperative system, and organizational communication.",
      "units": [
        {
          "id": "unit-bus330-7",
          "unitNumber": "1.0",
          "title": "Unit 1: The Hawthorne Experiment and Elton Mayo",
          "objectives": [
            "Detail the four phases of the Hawthorne Studies (1924–1932)",
            "Analyze the findings of the Illumination, Relay Assembly, Interviewing, and Bank Wiring experiments",
            "Contrast the Classical economic man with the Human Relations social man",
            "Explain the Hawthorne Effect and informal organization norms"
          ],
          "unitRecapPoints": [
            "Conducted at Western Electric Company Hawthorne Plant near Chicago by Elton Mayo, Roethlisberger, and Dickson.",
            "Phase 1 (Illumination): Output increased despite downward light adjustments until moonlight level, proving psychological recognition motivated workers.",
            "Phase 2 (Relay Assembly): Female workers output rose continually regardless of physical rest pauses or refreshment changes.",
            "Phase 4 (Bank Wiring): Informal group norms restricted output to prevent rate cuts; workers enforced codes against \"Rate Busters\", \"Chiselers\", and \"Squealers\".",
            "Core Finding: Work is a social group activity; social and psychological factors determine morale and output far more than physical conditions."
          ],
          "topics": [
            {
              "id": "top-bus330-7-1",
              "title": "The Hawthorne Studies, Informal Groups and Social Man",
              "readingMinutes": 15,
              "sourceReference": "BUS 330 Course Guide, Module 3, Unit 1, Sections 3.1–3.8, pp. 86–106",
              "textbookDefinitions": [
                {
                  "term": "Hawthorne Effect",
                  "definition": "The phenomenon where employees alter or improve their performance simply because they know they are being observed and given special attention in a research setting.",
                  "sourceAuthor": "Roethlisberger & Dickson (1939)"
                },
                {
                  "term": "Social Man (Elton Mayo)",
                  "definition": "The concept that human beings at work are social animals motivated by belonging, psychological recognition, and group affiliations rather than solely economic self-interest.",
                  "sourceAuthor": "Elton Mayo"
                }
              ],
              "content": "The Human Relations Theory arose in the 1930s as a reaction to the classical mechanical approach. Elton Mayo (1880–1949) of Harvard Business School led the historic Hawthorne Studies (1924–1932) at Western Electric's Hawthorne Works in Cicero, Illinois.\n\nThe Four Phases of the Hawthorne Studies:\n1. Illumination Experiments (1924–1927): Tested the effect of lighting on output. As light intensity was decreased in the experimental room, productivity continued to rise, falling only when illumination reached moonlight level. Workers were motivated by the psychological recognition of being selected for study.\n2. Relay Assembly Test Room (1927): Six female assemblers were isolated. Under varied rest pauses, shortened hours, and refreshments, output rose consistently. The friendly social climate and consultative supervision eliminated fear of arbitrary management.\n3. Mass Interviewing Programme (1928–1931): Over 21,000 employees were interviewed. It acted as \"ventilation therapy\", revealing that worker attitudes and grievances were rooted in social relationships and personal backgrounds.\n4. Bank Wiring Observation Room (1931–1932): 14 male operators were studied under a group piecework system. Despite economic incentives, workers established their own informal output ceiling to avoid rate reductions and retrenchment. The informal group enforced social sanctions against:\n   - \"Rate Busters\" (producing too much)\n   - \"Chiselers\" (producing too little)\n   - \"Squealers\" (reporting associates to supervisors)\n\nKey Conclusions of Hawthorne:\n- An organization is a complex social system.\n- Social and psychological factors at work determine output more than physical working conditions.\n- Workers are social animals whose behavior is governed by informal work group norms.",
              "summaryPoints": [
                "Hawthorne experiments overthrew the classical concept of the atomistic economic man.",
                "Informal group norms and peer acceptance govern workplace productivity.",
                "Consultative, participatory management creates sustainable morale improvements."
              ]
            }
          ]
        },
        {
          "id": "unit-bus330-8",
          "unitNumber": "2.0",
          "title": "Unit 2: Administrative Leadership Theory (Mary Parker Follett)",
          "objectives": [
            "Explain Mary Parker Follett concept of constructive conflict",
            "Contrast domination, compromise, and integration in conflict resolution",
            "Examine the depersonalization of orders and the law of the situation",
            "Distinguish power-over from power-with"
          ],
          "unitRecapPoints": [
            "Follett (1868–1933) is the bridge between classical and behavioral administrative thought.",
            "Conflict is not warfare but a normal expression of differences to be resolved through Integration—finding a solution where neither side sacrifices anything.",
            "Orders should be depersonalized by discovering and obeying the \"law of the situation\" rather than exercising bossism.",
            "Power-over (coercive, dominating) must be replaced with Power-with (coactive, jointly developed power).",
            "Authority belongs to the function/job and cannot truly be delegated."
          ],
          "topics": [
            {
              "id": "top-bus330-8-1",
              "title": "Follett on Constructive Conflict, Power-With, and the Law of the Situation",
              "readingMinutes": 14,
              "sourceReference": "BUS 330 Course Guide, Module 3, Unit 2, Sections 3.1–3.4, pp. 90–96",
              "textbookDefinitions": [
                {
                  "term": "Integration (Mary Parker Follett)",
                  "definition": "A conflict resolution method where a new solution is invented satisfying the real needs of both parties so that neither side makes a sacrifice.",
                  "sourceAuthor": "Mary Parker Follett (1924)"
                },
                {
                  "term": "Power-With vs. Power-Over",
                  "definition": "Power-over is coercive control asserting oneself over another; power-with is coactive, jointly developed power that increases total organizational capacity.",
                  "sourceAuthor": "Mary Parker Follett"
                },
                {
                  "term": "Law of the Situation",
                  "definition": "Depersonalizing the giving of orders by uniting all parties in a study of facts so that orders emanate naturally from the situation itself.",
                  "sourceAuthor": "Mary Parker Follett"
                }
              ],
              "content": "Mary Parker Follett (1868–1933) brought human, psychological, and situational insights into administrative theory.\n\n1. Constructive Conflict and Integration:\nFollett viewed conflict as normal and valuable. She identified three methods of resolving conflict:\n- Domination: One side wins over the other (temporary, fosters resentment).\n- Compromise: Both sides surrender part of what they desire (neither is truly satisfied).\n- Integration: A creative synthesis where the real needs of both sides are satisfied without either sacrificing anything. For example, two persons in a library room—one wants the window open for fresh air, the other wants it shut to avoid draft. Integration: opening a window in the adjoining room.\n\n2. Depersonalization of Orders:\nGiving orders is counterproductive when accompanied by \"bossism\". Follett urged that orders should be depersonalized: both superior and subordinate must study the situation together and obey the \"law of the situation\".\n\n3. Power-With:\nFollett distinguished coercive power-over from coactive power-with. True leaders do not accumulate power over subordinates; they foster environments where employees develop power-with management through collaborative participation.",
              "summaryPoints": [
                "Integration is the superior method of conflict resolution because it eliminates the root cause.",
                "The law of the situation depersonalizes authority and commands.",
                "Power-with multiplies organizational energy through cooperative alignment."
              ]
            }
          ]
        },
        {
          "id": "unit-bus330-9",
          "unitNumber": "3.0",
          "title": "Unit 3: Chester Barnard and Decision-Making Theory",
          "objectives": [
            "Define Chester Barnard cooperative system and elements of formal organization",
            "Explain the theory of contribution-satisfaction equilibrium",
            "Examine the Acceptance Theory of Authority and the Zone of Indifference",
            "List the three essential executive functions"
          ],
          "unitRecapPoints": [
            "Chester I. Barnard (1886–1961) authored The Functions of the Executive (1938), defining formal organization as a system of consciously coordinated activities of two or more persons.",
            "Three universal elements of formal organization: Communication, Willingness to cooperate (serve), and Common purpose.",
            "Contribution-Satisfaction Equilibrium: An organization survives only when inducements offered to participants outweigh their contributions.",
            "Acceptance Theory of Authority: Authority resides with the subordinate who decides whether to accept an order based on 4 simultaneous conditions.",
            "Zone of Indifference: Orders falling within this zone are accepted unquestioningly without conscious appraisal."
          ],
          "topics": [
            {
              "id": "top-bus330-9-1",
              "title": "Cooperative Systems, Acceptance of Authority, and Executive Functions",
              "readingMinutes": 14,
              "sourceReference": "BUS 330 Course Guide, Module 3, Unit 3, Sections 3.4.1–3.4.7, pp. 96–100",
              "textbookDefinitions": [
                {
                  "term": "Acceptance Theory of Authority (Chester Barnard)",
                  "definition": "The principle that authority does not flow from top-down position, but is determined by whether the receiver accepts the communication as authoritative.",
                  "sourceAuthor": "Chester I. Barnard (1938)"
                },
                {
                  "term": "Zone of Indifference (Barnard)",
                  "definition": "The mental zone within which an employee will accept orders without conscious questioning or resistance.",
                  "sourceAuthor": "Chester Barnard"
                }
              ],
              "content": "Chester I. Barnard (1886–1961), president of New Jersey Bell Telephone, revolutionized executive thought in his 1938 treatise 'The Functions of the Executive'.\n\n1. Formal Organization as a Cooperative System:\nBarnard defined organization as \"a system of consciously coordinated activities or forces of two or more persons.\" Formal organization requires three core elements:\n(i) Communication\n(ii) Willingness to cooperate\n(iii) Common purpose\n\n2. Contribution-Satisfaction Equilibrium:\nOrganizations depend on an equilibrium between what participants contribute (time, labor, loyalty) and what the organization provides in return (material rewards, distinction, desirable conditions, pride of workmanship).\n\n3. Acceptance Theory of Authority:\nBarnard rejected classical positional authority. A subordinate accepts an order as authoritative only when four conditions occur simultaneously:\n- He understands the communication (intelligibility).\n- It is consistent with organizational purpose.\n- It is compatible with his personal interests.\n- He is mentally and physically capable of complying.\n\n4. The Three Essential Executive Functions:\n- Establishing and maintaining the system of communication.\n- Securing essential services from individuals by promoting motivation.\n- Formulating and defining organizational purpose and objectives.",
              "summaryPoints": [
                "Barnard proved that authority is granted from the bottom up through acceptance.",
                "Contribution-satisfaction equilibrium determines organizational survival.",
                "The primary executive function is maintaining the communication network and purpose."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "mod-bus330-4",
      "moduleNumber": 4,
      "title": "Module 4: Modern Theories of Management",
      "description": "Motivation models (Theories X & Y, Maslow, Alderfer ERG, Herzberg, McClelland), Systems Theory, Contingency Models, and Management by Objectives (MBO).",
      "units": [
        {
          "id": "unit-bus330-10",
          "unitNumber": "1.0",
          "title": "Unit 1: Behaviourism and Content Motivation Theories",
          "objectives": [
            "Contrast Douglas McGregor Theory X and Theory Y assumptions",
            "Analyze Abraham Maslow 5-level hierarchy of needs",
            "Explain Clayton Alderfer ERG model (Existence, Relatedness, Growth)",
            "Evaluate Frederick Herzberg Two-Factor Theory (Hygiene vs. Motivators)"
          ],
          "unitRecapPoints": [
            "Theory X assumes workers are inherently lazy, avoid responsibility, and require coercion; Theory Y assumes workers are self-directed, seek responsibility, and possess creative capacity.",
            "Maslow 5 needs: Physiological, Security, Social, Esteem, Self-Actualization.",
            "Alderfer ERG theory condenses Maslow into Existence, Relatedness, and Growth, introducing frustration-regression.",
            "Herzberg Two-Factor Theory proves Hygiene factors (pay, policy, conditions) merely prevent dissatisfaction; only Motivators (achievement, recognition, work itself, responsibility, growth) generate true motivation."
          ],
          "topics": [
            {
              "id": "top-bus330-10-1",
              "title": "Theories X/Y, Maslow Hierarchy, Alderfer ERG, and Herzberg Dual Factors",
              "readingMinutes": 16,
              "sourceReference": "BUS 330 Course Guide, Module 4, Unit 1, Sections 3.1–3.6, pp. 107–119",
              "textbookDefinitions": [
                {
                  "term": "Theory X and Theory Y (Douglas McGregor)",
                  "definition": "Two opposing sets of managerial assumptions regarding human nature at work: Theory X assumes indolence and coercion; Theory Y assumes potential for self-direction and responsibility.",
                  "sourceAuthor": "Douglas McGregor (1960)"
                },
                {
                  "term": "Hygiene Factors vs. Motivators (Frederick Herzberg)",
                  "definition": "Hygiene factors (job context: salary, company policy, working conditions) prevent dissatisfaction but do not motivate; Motivators (job content: achievement, recognition, responsibility, growth) create job satisfaction and drive superior effort.",
                  "sourceAuthor": "Frederick Herzberg (1959)"
                }
              ],
              "content": "Modern management theory emphasizes understanding human motivation as the key to productivity.\n\n1. Douglas McGregor (1960) — Theories X and Y:\n- Theory X: Assumes average individuals dislike work, lack ambition, avoid responsibility, prefer security, and must be coerced, controlled, and threatened with punishment.\n- Theory Y: Assumes physical and mental effort in work is as natural as play or rest. Workers exercise self-direction and self-control in service of objectives to which they are committed.\n\n2. Abraham Maslow (1954) — Hierarchy of Needs:\nOrganizes human needs into five ascending levels:\n(1) Physiological (food, water, shelter)\n(2) Security / Safety (freedom from danger, job security)\n(3) Social / Love (belonging, friendship, group acceptance)\n(4) Esteem (self-respect, status, recognition)\n(5) Self-Actualization (maximizing one's full potential)\nLower-level needs must be reasonably satisfied before higher-level needs emerge as primary motivators.\n\n3. Clayton Alderfer — ERG Theory:\nCondensed Maslow into three core levels: Existence, Relatedness, and Growth. Alderfer demonstrated that more than one need can be active simultaneously, and if a higher-order need is frustrated, an individual may regress to lower-level needs (frustration-regression).\n\n4. Frederick Herzberg — Two-Factor (Motivation-Hygiene) Theory:\nHerzberg proved that job satisfaction and dissatisfaction are not opposites, but two separate dimensions:\n- Hygiene Factors (Dissatisfiers): Company policy, supervision, salary, interpersonal relations, working conditions. When adequate, they eliminate dissatisfaction but do not motivate.\n- Motivators (Satisfiers): Achievement, recognition, the work itself, responsibility, advancement, personal growth. These intrinsic job-content factors genuinely motivate employees.",
              "summaryPoints": [
                "McGregor Theory Y transforms leadership from authoritarian coercion to supportive self-direction.",
                "Maslow and Alderfer provide foundational hierarchies of human need progression.",
                "Herzberg proved that money and company policies prevent dissatisfaction but cannot alone motivate excellence."
              ]
            }
          ]
        },
        {
          "id": "unit-bus330-11",
          "unitNumber": "2.0",
          "title": "Unit 2: Process Theories of Motivation and Job Design",
          "objectives": [
            "Explain Victor Vroom Expectancy Theory (Valence, Instrumentality, Expectancy)",
            "Describe J. Stacy Adams Equity Theory of motivation",
            "Examine Edwin Locke Goal-Setting Theory",
            "Differentiate Job Enrichment from Job Enlargement"
          ],
          "unitRecapPoints": [
            "Expectancy Theory posits Motivation = Valence × Instrumentality × Expectancy; employees must believe effort leads to performance and performance yields valued rewards.",
            "Equity Theory focuses on social comparison of input/outcome ratios compared to relevant others.",
            "Goal Setting Theory proves specific, challenging goals with timely feedback dramatically improve performance.",
            "Job Enrichment expands work vertically (adding responsibility, autonomy, planning); Job Enlargement expands work horizontally (adding more tasks at the same level)."
          ],
          "topics": [
            {
              "id": "top-bus330-11-1",
              "title": "Expectancy, Equity, Goal Setting, and Job Enrichment",
              "readingMinutes": 15,
              "sourceReference": "BUS 330 Course Guide, Module 4, Unit 2, Sections 3.1–3.4, pp. 120–130",
              "textbookDefinitions": [
                {
                  "term": "Expectancy Theory (Victor Vroom)",
                  "definition": "Motivation to exert effort depends on expectancy (effort leads to performance), instrumentality (performance leads to outcome), and valence (desirability of the outcome).",
                  "sourceAuthor": "Victor H. Vroom (1964)"
                },
                {
                  "term": "Job Enrichment",
                  "definition": "Vertical expansion of a job giving employees greater autonomy, planning authority, and responsibility for complete work cycles.",
                  "sourceAuthor": "Job Design Theory"
                }
              ],
              "content": "While content theories explain *what* motivates people, process theories explain *how* motivation occurs.\n\n1. Vroom's Expectancy Theory:\nMotivation is a product of three cognitive perceptions:\n- Expectancy (E → P): The belief that increased effort will lead to acceptable performance.\n- Instrumentality (P → O): The belief that achieving performance will lead to a specific reward outcome.\n- Valence (V): The personal value or attractiveness of the received reward.\nFormula: Motivational Force = Expectancy × Instrumentality × Valence. If any term is zero, motivational force is zero.\n\n2. Adams' Equity Theory:\nWorkers compare their perceived job input/outcome ratio with that of referent others:\n(Outcome / Input) of Person = (Outcome / Input) of Referent Other.\nInequity triggers tension, prompting workers to reduce effort, demand pay raises, rationalize, or quit.\n\n3. Job Enrichment vs. Job Enlargement:\n- Job Enrichment (Vertical Loading): Adds higher-level responsibilities, scheduling authority, quality self-checks, and project autonomy.\n- Job Enlargement (Horizontal Loading): Increases the number of different tasks performed at the same operational level to relieve repetitive boredom.",
              "summaryPoints": [
                "Expectancy theory links personal effort, performance benchmarks, and desired rewards.",
                "Equity theory governs perceptions of organizational fairness.",
                "Job enrichment builds meaningful autonomy and psychological ownership into daily work."
              ]
            }
          ]
        },
        {
          "id": "unit-bus330-12",
          "unitNumber": "3.0",
          "title": "Unit 3: Systems Theory, Contingency Models and Management by Objectives (MBO)",
          "objectives": [
            "Analyze open vs. closed systems and socio-technical systems in management",
            "Explain the contingency (situational) approach to organizational design",
            "Examine Peter Drucker concept of Management by Objectives (MBO)",
            "Discuss the benefits and operational pitfalls of MBO"
          ],
          "unitRecapPoints": [
            "Systems theory views the organization as an open socio-technical system interacting with its external environment.",
            "Contingency theory holds that there is no single best way to organize; optimal structure depends on situational variables (technology, environment, size).",
            "Management by Objectives (MBO), developed by Peter Drucker (1954), establishes joint goal-setting between managers and subordinates.",
            "MBO cascades strategic corporate goals down to measurable departmental and individual action targets."
          ],
          "topics": [
            {
              "id": "top-bus330-12-1",
              "title": "Open Systems, Contingency Design, and MBO Architecture",
              "readingMinutes": 14,
              "sourceReference": "BUS 330 Course Guide, Module 4, Units 3–4, pp. 131–145",
              "textbookDefinitions": [
                {
                  "term": "Management by Objectives (MBO)",
                  "definition": "A collaborative management process where superiors and subordinates jointly identify common goals, define areas of responsibility in terms of expected results, and use these measures as guides for operating the unit.",
                  "sourceAuthor": "Peter F. Drucker (1954)"
                },
                {
                  "term": "Open System",
                  "definition": "An organizational model that continually interacts with its external environment, importing energy and resources (inputs), transforming them, and exporting products/services (outputs).",
                  "sourceAuthor": "Systems Theory"
                }
              ],
              "content": "1. Open Systems Theory:\nOrganizations are open socio-technical systems that depend on continuous interaction with their external environment. Sub-systems include Task, Technology, Structure, People, and Management. Changes in any one sub-system reverberate across all other components.\n\n2. Contingency Approach:\nPioneered by Joan Woodward, Burns and Stalker, and Lawrence and Lorsch, contingency theory rejects classical universalism. The structure of an organization must fit its environmental uncertainty and technological demands:\n- Stable environments require formal, mechanistic structures.\n- Dynamic, changing environments require flexible, organic structures.\n\n3. Management by Objectives (MBO):\nIntroduced by Peter Drucker in 1954 in 'The Practice of Management', MBO transforms organizational governance:\n- Joint Goal Setting: Superiors and subordinates collaboratively establish specific, measurable targets.\n- Periodic Review: Objective feedback on actual results against established milestones.\n- Autonomy in Execution: Subordinates are granted discretion to determine operational methods to reach agreed goals.",
              "summaryPoints": [
                "Organizations survive by continually adapting open sub-systems to external environmental changes.",
                "Contingency models require tailoring structure to technological and environmental realities.",
                "MBO aligns individual performance with enterprise mission through collaborative goal agreements."
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
    "id": "pq-bus330-1",
    "courseId": "course-bus330",
    "courseCode": "BUS 330",
    "courseTitle": "Management Theory",
    "documentId": "pq-doc-bus330-tma-archives",
    "documentName": "BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf",
    "sourceFileName": "BUS330_8f9154d9.pdf",
    "linkedUnitId": "unit-bus330-1",
    "linkedUnitNumber": 1,
    "linkedUnitTitle": "Unit 1: Concepts of Administration and Management",
    "year": "NOUN Official Examination",
    "questionNumber": "TMA 1 / Q1",
    "questionType": "written_structured",
    "marks": 20,
    "totalMarks": 20,
    "questionText": "Explain in further detail what constitutes the anatomy and physiology of administration, and distinguish between the integral and managerial views of administration.",
    "suppliedAnswer": "According to the authoritative BUS 330 course material:\n1. Anatomy vs. Physiology:\n- The anatomy of administration is the organization structure that states all statutes and roles in hierarchical order with the highest status on top. It shows the structure, divisions, departments, and units.\n- The physiology of administration refers to the processes involved in getting things done in the various offices—meetings, orders, producing documents, dissemination of information, and custody and disbursement of funds.\n- Thus, Anatomy = Organization, and Physiology = Management. Administration = Organization + Management.\n\n2. Integral View vs. Managerial View:\n- The Integral View considers administration as the sum total of all activities (manual, clerical, technical, managerial) undertaken to achieve organizational goals. Here, all employees from the errand boy to the manager are engaged in administration.\n- The Managerial View holds that only superior and supervisory personnel who get things done through others constitute administration. The laborers and clerks perform operations, not administration.",
    "modelAnswer": "Anatomy is the formal organizational structure and hierarchy; Physiology is the management process of planning, directing, coordinating, and executing activities. Integral view includes all employees; Managerial view restricts administration to supervisory staff.",
    "keyRubricPoints": [
      "Definition of Anatomy as organizational structure",
      "Definition of Physiology as management processes and operations",
      "Clear distinction between Integral View (all workers) and Managerial View (supervisory personnel only)",
      "Mention of Dwight Waldo or Henry Fayol time distribution"
    ],
    "difficulty": "Core",
    "isPastQuestion": true,
    "verifiedAuthentic": true,
    "answerStatus": "answer_supplied",
    "unitMappingStatus": "mapped"
  },
  {
    "id": "pq-bus330-2",
    "courseId": "course-bus330",
    "courseCode": "BUS 330",
    "courseTitle": "Management Theory",
    "documentId": "pq-doc-bus330-tma-archives",
    "documentName": "BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf",
    "sourceFileName": "BUS330_8f9154d9.pdf",
    "linkedUnitId": "unit-bus330-2",
    "linkedUnitNumber": 2,
    "linkedUnitTitle": "Unit 2: Concept of Theory and Scientific Research",
    "year": "NOUN Official Examination",
    "questionNumber": "TMA 2 / Q2",
    "questionType": "written_structured",
    "marks": 20,
    "totalMarks": 20,
    "questionText": "Explain fully the definition of a theory as \"a scientifically, generally acceptable set of principles used to explain a phenomenon\", and outline the six steps in theory construction.",
    "suppliedAnswer": "Based on BUS 330 text:\n1. Analysis of Definition Components:\n- \"Scientifically\": The theory is formulated through systematic discovery, observation, experimentation, and measurement.\n- \"Generally Acceptable\": A substantial majority of empirical observations (or respondents) support the validity of the hypothesis.\n- \"Set of Principles\": A coherent framework of rules, laws, and causal relationships serving as a guide to the phenomenon.\n\n2. Six Steps in Theory Construction:\n(1) Selecting the problem (clearly and narrowly defined)\n(2) Collection of empirical data\n(3) Classification and enumeration of data\n(4) Formulation of hypothesis with simplifying assumptions\n(5) Testing of hypothesis using logic and statistical methods\n(6) Verification of theory against new facts to solidify it into law.",
    "modelAnswer": "Theory is a verified body of principles explaining causal relationships. The six steps are: Problem selection, Data collection, Classification, Hypothesis formulation, Testing, and Verification.",
    "keyRubricPoints": [
      "Deconstruction of \"scientifically\", \"generally acceptable\", and \"set of principles\"",
      "Listing the 6 chronological steps of theory formulation",
      "Distinction between hypothesis and verified theory"
    ],
    "difficulty": "Core",
    "isPastQuestion": true,
    "verifiedAuthentic": true,
    "answerStatus": "answer_supplied",
    "unitMappingStatus": "mapped"
  },
  {
    "id": "pq-bus330-3",
    "courseId": "course-bus330",
    "courseCode": "BUS 330",
    "courseTitle": "Management Theory",
    "documentId": "pq-doc-bus330-tma-archives",
    "documentName": "BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf",
    "sourceFileName": "BUS330_8f9154d9.pdf",
    "linkedUnitId": "unit-bus330-4",
    "linkedUnitNumber": 4,
    "linkedUnitTitle": "Unit 2: The Scientific Management Theory (Taylorism)",
    "year": "NOUN Official Examination",
    "questionNumber": "TMA 3 / Q3",
    "questionType": "written_structured",
    "marks": 20,
    "totalMarks": 20,
    "questionText": "What are the similarities and differences between Frederick Winslow Taylor and Henry Fayol in their contributions to theories of administration?",
    "suppliedAnswer": "Similarities:\n1. Both realized efficient management of personnel problems is key to industrial success.\n2. Both applied scientific, rational, and systematic methods to management.\n3. Both developed their principles through long practical industrial experience.\n4. Both emphasized mutual cooperation between management and employees.\n5. Both recognized the universality of management.\n\nDifferences:\n- Taylor started from the shop floor (micro level, task management), focused on technical operations, used rigid experimentation, and advocated functional foremanship.\n- Fayol started from top management (macro level, total organization), focused on administrative functions, maintained flexibility, and advocated strict unity of command.",
    "modelAnswer": "Similarities: Applied scientific principles, practical experience, universality of management. Differences: Taylor focused on bottom-up shop floor tasks and functional foremanship; Fayol focused on top-down administrative functions and unity of command.",
    "keyRubricPoints": [
      "At least 3 valid similarities (scientific approach, industrial experience, universality)",
      "At least 3 valid differences (micro vs macro, shop floor vs executive, unity of command vs functional foremanship)"
    ],
    "difficulty": "Challenging",
    "isPastQuestion": true,
    "verifiedAuthentic": true,
    "answerStatus": "answer_supplied",
    "unitMappingStatus": "mapped"
  },
  {
    "id": "pq-bus330-4",
    "courseId": "course-bus330",
    "courseCode": "BUS 330",
    "courseTitle": "Management Theory",
    "documentId": "pq-doc-bus330-tma-archives",
    "documentName": "BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf",
    "sourceFileName": "BUS330_8f9154d9.pdf",
    "linkedUnitId": "unit-bus330-6",
    "linkedUnitNumber": 6,
    "linkedUnitTitle": "Unit 4: Bureaucracy Theory (Max Weber)",
    "year": "NOUN Official Examination",
    "questionNumber": "TMA 4 / Q4",
    "questionType": "written_structured",
    "marks": 20,
    "totalMarks": 20,
    "questionText": "What differentiates Max Weber legal-rational bureaucracy from charismatic and traditional authorities, and what are its main structural characteristics?",
    "suppliedAnswer": "1. Distinction of Authority Types:\n- Charismatic Authority rests on personal devotion to an exceptional leader; it is unstable and non-permanent.\n- Traditional Authority rests on immemorial customs and hereditary succession, which frequently lacks meritocracy.\n- Legal-Rational Authority rests on belief in the legality of impersonal normative rules; obedience is owed to the office and its legal competency, not to the person.\n\n2. Structural Characteristics of Bureaucracy:\n- Hierarchy of offices\n- Clearly defined sphere of legal competence (division of labor)\n- Written rules and regulations\n- Appointment based on technical qualifications tested by examinations\n- Fixed graded salaries and pension rights\n- Full separation of the official from ownership of administrative tools\n- High operational impersonality and political neutrality.",
    "modelAnswer": "Legal-rational authority is governed by impersonal laws and merit rather than personal devotion (charismatic) or hereditary status (traditional). Key characteristics include hierarchy, division of labor, written rules, technical competence, and impersonality.",
    "keyRubricPoints": [
      "Comparison of Charismatic, Traditional, and Legal-Rational authority",
      "Identification of at least 5 characteristics of ideal bureaucracy",
      "Emphasis on impersonality and merit-based recruitment"
    ],
    "difficulty": "Challenging",
    "isPastQuestion": true,
    "verifiedAuthentic": true,
    "answerStatus": "answer_supplied",
    "unitMappingStatus": "mapped"
  },
  {
    "id": "pq-bus330-5",
    "courseId": "course-bus330",
    "courseCode": "BUS 330",
    "courseTitle": "Management Theory",
    "documentId": "pq-doc-bus330-tma-archives",
    "documentName": "BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf",
    "sourceFileName": "BUS330_8f9154d9.pdf",
    "linkedUnitId": "unit-bus330-7",
    "linkedUnitNumber": 7,
    "linkedUnitTitle": "Unit 1: The Hawthorne Experiment and Elton Mayo",
    "year": "NOUN Official Examination",
    "questionNumber": "TMA 5 / Q5",
    "questionType": "written_structured",
    "marks": 20,
    "totalMarks": 20,
    "questionText": "\"Social and psychological factors at the workplace determine employees morale and output more than physical conditions of work.\" Discuss with reference to the Hawthorne Studies.",
    "suppliedAnswer": "The Hawthorne Experiments (1924–1932) conducted by Elton Mayo and Harvard researchers disproved the classical concept of economic man:\n1. In the Illumination Experiment, output increased despite reduction of lighting until moonlight levels, showing that workers were motivated by psychological recognition.\n2. In the Relay Assembly Test Room, friendly supervision, group consultation, and a sense of participation continuously elevated productivity regardless of physical rest breaks.\n3. In the Bank Wiring Observation Room, the informal work group established its own production ceiling, sanctioning rate busters and chiselers, proving that social group norms override individual economic incentives.\nConclusion: The organization is a social system; management must consider workers emotional needs, participation, and informal group structures.",
    "modelAnswer": "The Hawthorne Studies demonstrated that workers are social beings influenced by peer acceptance, informal norms, and consultative supervision rather than physical illumination or mechanical incentives alone.",
    "keyRubricPoints": [
      "Citation of Illumination, Relay Assembly, and Bank Wiring experiments",
      "Identification of the informal organization and social group norms",
      "Contrast between economic man and social man"
    ],
    "difficulty": "Core",
    "isPastQuestion": true,
    "verifiedAuthentic": true,
    "answerStatus": "answer_supplied",
    "unitMappingStatus": "mapped"
  }
];
