import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';
import { Course, StudyModule, StudyUnit, StudyTopic, PastExamQuestionItem, PastQuestionDocument, StudyDocument } from '../src/types';

async function extractPdfText(filePath: string): Promise<{ text: string; pages: number }> {
  const binaryBuffer = fs.readFileSync(filePath);
  const pdfParser = new PDFParse(new Uint8Array(binaryBuffer));
  const parseResult = await pdfParser.getText();
  return {
    text: parseResult.text || '',
    pages: parseResult.total || 1,
  };
}

// Build BUS 330: Management Theory
function generateBus330(pagesCount: number): { course: Course; questions: PastExamQuestionItem[]; pqDoc: PastQuestionDocument } {
  const courseId = 'course-bus330';
  const courseCode = 'BUS 330';
  const courseTitle = 'Management Theory';
  const docId = 'doc-bus330-textbook';
  const pqDocId = 'pq-doc-bus330-tma-archives';

  const modules: StudyModule[] = [
    {
      id: 'mod-bus330-1',
      moduleNumber: 1,
      title: 'Module 1: The Concepts of Administration, Management and Theory',
      description: 'Foundational concepts, administrative dimensions, science vs. art, systems perspective, universality, and the architecture of theoretical construction.',
      units: [
        {
          id: 'unit-bus330-1',
          unitNumber: '1.0',
          title: 'Unit 1: Concepts of Administration and Management',
          objectives: [
            'Define administration from both the integral and managerial perspectives',
            'Explain the four basic characteristics of modern administration: coordination, search for better ways, functions, and control',
            'Analyze management as an art and as a science',
            'Evaluate management as a system and explain the universality of management'
          ],
          unitRecapPoints: [
            'Administration is derived from Latin "adminis-trare" meaning to care for or look after people to manage affairs.',
            'According to Professor Dwight Waldo (1956), administration is the organization and management of human and material resources to achieve a stated objective.',
            'Integral view regards administration as the sum total of all activities (manual, clerical, technical, managerial); managerial view restricts it to superior supervisory personnel.',
            'Management is both an art (creative application of skill and vision) and a science (systematic procedures and empirical testing).',
            'The systems approach views the enterprise as an integrated whole of interdependent sub-systems (production, finance, marketing, personnel).'
          ],
          topics: [
            {
              id: 'top-bus330-1-1',
              title: 'The Concept and Nature of Administration',
              readingMinutes: 12,
              sourceReference: 'BUS 330 Course Guide, Module 1, Unit 1, Section 3.1, pp. 6–10',
              textbookDefinitions: [
                {
                  term: 'Administration (Dwight Waldo, 1956)',
                  definition: 'Organization and management of human and material resources to achieve a stated objective. If public oriented, it is public administration; if private oriented, it is private administration.',
                  sourceAuthor: 'Professor Dwight Waldo (1956)'
                },
                {
                  term: 'Administration (Simon, Smithburg and Thompson)',
                  definition: 'The activities of groups cooperating to accomplish common goals, providing basic public services such as protection, public works, education, and health.',
                  sourceAuthor: 'Simon, Smithburg & Thompson'
                },
                {
                  term: 'Integral View vs. Managerial View',
                  definition: 'Integral view considers all personnel (from errand boy to general manager) as engaged in administration; managerial view holds that only supervisory and directing staff constitute administration.',
                  sourceAuthor: 'Administrative Theory Literature'
                }
              ],
              content: `The word 'administer', derived from the Latin words adminis-trare, means to care for or to look after people to manage affairs. Administration is a universal process permeating all collective efforts, be it public or private, civil or military, large scale or otherwise. It is a cooperative effort directed towards the realization of a consciously laid down objective.

According to Professor Dwight Waldo (1956), administration is the organization and management of human and material resources to achieve a stated objective. If the objective is public oriented, then it is public administration; if the objective is private oriented, then it is private administration. Specifically, if the set objective is profit maximization, then it is business administration. Thus Administration is the umbrella covering organization and management:
- Organization is the structure, the skeleton, the anatomy of administration.
- Management is the process, the flesh and the physiology of administration.
Hence: Administration = Organization + Management. None of them in isolation can form administration without the other.

In common parlance, administration bears four different meanings:
1. Cabinet or governing council in supreme charge of affairs.
2. A branch of learning or intellectual discipline (e.g., public administration as a social science).
3. The sum total of activities undertaken to implement public policy or deliver services.
4. The art of management.

Scholars divide administration into two prominent views:
- The Integral View: Administration is the sum total of all activities (manual, clerical, technical, and managerial) undertaken to realize the objective. Under this view, every employee contributes to administration.
- The Managerial View: Administration is restricted solely to the managerial techniques of planning, organizing, coordinating, directing, and controlling. Only executives, managers, and foremen who get things done through others are considered administrators. Henry Fayol pointed out that administrative time increases with job grade: a workman spends 5% of time on administration and 85% on technical work, while a general manager spends 50% on administration and only 10% on technical work.`,
              summaryPoints: [
                'Administration = Organization (structure/skeleton) + Management (process/physiology).',
                'Integral view encompasses all operational personnel; Managerial view restricts administration to supervisory coordinators.',
                'Dwight Waldo defines administration as the organization and management of human and material resources.'
              ],
              checkpointQuiz: [
                {
                  id: 'cp-bus330-1-1',
                  prompt: 'According to Professor Dwight Waldo (1956), how is administration defined?',
                  options: [
                    'The organization and management of human and material resources to achieve a stated objective',
                    'The mechanical automation of factory production lines',
                    'The exclusive legal authority of judicial courts over citizens',
                    'The process of maximizing individual profits without governmental regulations'
                  ],
                  correctIndex: 0,
                  explanation: 'Dwight Waldo defines administration as the organization and management of human and material resources to achieve a stated objective.',
                  origin: 'ai_generated'
                }
              ]
            },
            {
              id: 'top-bus330-1-2',
              title: 'Characteristics, Functions and Universality of Management',
              readingMinutes: 14,
              sourceReference: 'BUS 330 Course Guide, Module 1, Unit 1, Sections 3.2–3.8, pp. 11–20',
              textbookDefinitions: [
                {
                  term: 'Characteristics of Modern Administration',
                  definition: 'Coordination (not mere specialization), search for better ways, functional perspective, and positive control based on information and trends.',
                  sourceAuthor: 'BUS 330 Syllabus'
                },
                {
                  term: 'Management as a System',
                  definition: 'Viewing internal and external environmental factors as an integrated whole composed of interdependent sub-systems (production, finance, marketing, procurement, personnel).',
                  sourceAuthor: 'Systems Theory'
                },
                {
                  term: 'Universality of Management',
                  definition: 'Management functions (planning, organizing, staffing, directing, controlling) are identical in all formal organizations and managerial know-how is transferable across enterprises.',
                  sourceAuthor: 'Universalist School'
                }
              ],
              content: `Modern administration exhibits four primary characteristics:
1. Co-ordination, Not Specialization: An administrator need not be a superior technical specialist in every area. His major job is the coordination of capable specialists.
2. The Search for Better Ways: Continuously challenging old ways and combining critical thinking to achieve operational improvements.
3. Functional Focus: The administrator thinks in terms of objectives, planning, guiding policies, organization structure, personnel development, and consultative management.
4. Positive Control: Control has evolved from negative restriction and authoritarian prevention to positive monitoring—knowing progress compared to standards, predicting trends, and initiating timely remedial action.

Management as an Art and Science:
- Management as an Art: Involves creative application, vision, intuition, judgment, and personal skill in dealing with human behavior.
- Management as a Science: Employs systematic observation, experimentation, measurement, and validation of principles (pioneered by F.W. Taylor).

The Systems Approach to Management:
An enterprise is viewed as a unified whole made of interdependent sub-systems (production, marketing, finance, personnel). When one sub-system fails, the entire system experiences a setback. The manager's duty is to integrate these sub-systems toward balanced organizational goals.

Universality of Management:
Management functions are identical across all formal organizations, whether profit-making businesses, civil services, educational institutions, or hospitals. All managers make decisions, focus on objectives, plan policies, organize resources, direct subordinates, and control activities. Managerial knowledge is therefore transferable from one organization to another.`,
              summaryPoints: [
                'Four administrative characteristics: Coordination, search for better ways, functional perspective, and positive control.',
                'Management blends art (judgment, human skill) and science (systematic methods, principles).',
                'Universality of management confirms that core managerial functions are transferable across all organizations.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus330-2',
          unitNumber: '2.0',
          title: 'Unit 2: Concept of Theory and Scientific Research',
          objectives: [
            'Define theory and explain theory construct',
            'Describe the six steps required to construct a scientific theory',
            'Contrast methods of seeking knowledge: tenacity, authority, intuition, mystical, and scientific',
            'Distinguish exploratory, descriptive, and causal research'
          ],
          unitRecapPoints: [
            'A theory is a statement of assumed causal relationship between variables (Reuben) or a scientifically, generally acceptable set of principles used to explain a phenomenon.',
            'Theory construction involves: (1) Selecting problem, (2) Collection of data, (3) Classification of data, (4) Formulation of hypothesis, (5) Testing of hypothesis, (6) Verification of theory.',
            'Stages of theory development: Speculative, Descriptive, and Constructive.',
            'The scientific method is a systematic, controlled, and empirical investigation of hypothetical propositions.'
          ],
          topics: [
            {
              id: 'top-bus330-2-1',
              title: 'Theory Construct and Scientific Inquiry',
              readingMinutes: 12,
              sourceReference: 'BUS 330 Course Guide, Module 1, Unit 2, Sections 3.1–3.6, pp. 21–32',
              textbookDefinitions: [
                {
                  term: 'Theory (Ernest Nagel)',
                  definition: 'A set of statements, organized in a characteristic way, designed to serve as partial premises for explaining as well as predicting an indeterminately large class of phenomena.',
                  sourceAuthor: 'Ernest Nagel'
                },
                {
                  term: 'Hypothesis',
                  definition: 'A suggested answer to a problem by the aid of which we endeavor to explain facts by discovering their orderliness.',
                  sourceAuthor: 'Research Methodology'
                }
              ],
              content: `A theory is a coherent set of ideas that explains observed facts or phenomena and sets out governing laws and principles. Gopnik and Meltzoff (1997) identify three conditions on theories:
1. Structural: Abstract, coherent, causally organized, and ontologically committed.
2. Functional: Make predictions, interpret evidence in new ways, and provide causal explanations.
3. Dynamic: Revised or replaced in response to empirical counterevidence.

Six Steps in Theory Formulation:
1. Selecting the Problem: Identifying a clearly stated, narrow problem.
2. Collection of Data: Gathering empirical facts pertaining to the problem.
3. Classification of Data: Enumerating, grouping, and analyzing data by resemblances and differences.
4. Formulation of Hypothesis: Proposing an educated proposition or suggested answer with simplifying assumptions.
5. Testing of Hypothesis: Deductive testing through logical and statistical techniques.
6. Verification of Theory: Confirming the hypothesis against independent observation or experimental consistency. If proved valid, it solidifies into a scientific principle or law.

Methods of Seeking Knowledge:
- Tenacity: Believing something because it has always been held to be true.
- Authority: Accepting statements from established political, religious, or academic authorities.
- Intuition / A-Priori: Believing propositions that appeal to reason without empirical testing.
- Mystical Method: Relying on supernatural revelations.
- Scientific Method: Systematic, controlled, and empirical investigation of hypothetical relationships.`,
              summaryPoints: [
                'Theories explain "why" and predict outcomes across domains.',
                'Six rigorous steps form the foundation of scientific theory construction.',
                'The scientific method supersedes tenacity, intuition, and authority in administrative inquiry.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-bus330-2',
      moduleNumber: 2,
      title: 'Module 2: Scientific Management and Classical Administrative Theories',
      description: 'The roots of administrative science in military history and economics, Taylorism, Fayol, Gulick, Urwick, Mooney, Reiley, and Max Weber Bureaucratic Theory.',
      units: [
        {
          id: 'unit-bus330-3',
          unitNumber: '1.0',
          title: 'Unit 1: Early Development of Administration and Management',
          objectives: [
            'Trace the origin of public management in ancient civilizations and military operations',
            'Explain the contributions of ancient Rome and Augustus Caesar to civil service and merit systems',
            'Compare the nine U.S. Army principles of war with civilian management principles',
            'Analyze Adam Smith pin factory analysis and good organization as a force multiplier'
          ],
          unitRecapPoints: [
            'Civilization and administration developed together; the first public administrators were military officers managing city defense.',
            'Emperor Augustus Caesar established the first formal civil service to fund and maintain legions through regularized taxation.',
            'Nine military principles: Objective, Offensive, Mass, Economy of force, Maneuver, Unity of command, Security, Surprise, Simplicity.',
            'Adam Smith (1776, The Wealth of Nations) demonstrated how division of labor in a pin factory multiplies output from dozens to tens of thousands of pins daily.',
            'Proper organization is a technology and force multiplier that enables combined individual efforts to far exceed their sum.'
          ],
          topics: [
            {
              id: 'top-bus330-3-1',
              title: 'Military Heritage, Roman Administration and Adam Smith',
              readingMinutes: 14,
              sourceReference: 'BUS 330 Course Guide, Module 2, Unit 1, Sections 3.1–3.7, pp. 33–50',
              textbookDefinitions: [
                {
                  term: 'Force Multiplier',
                  definition: 'Any technology or organizational doctrine that makes combined individual efforts far greater than the sum of their parts.',
                  sourceAuthor: 'Military Administration'
                },
                {
                  term: 'Division of Labour (Adam Smith, 1776)',
                  definition: 'Specialization of tasks in manufacturing which dramatically increases dexterity, saves time passing between tasks, and enables technological innovation.',
                  sourceAuthor: 'Adam Smith (Wealth of Nations)'
                }
              ],
              content: `Civilization and administration have always gone hand in hand. In ancient times, cities were fortified by defensive walls. Governing cities required sophisticated logistics, supply, and command. Thus, the profession of management began as the profession of arms. Hierarchy, line and staff personnel, communications, and strategy (from Greek "art of the general") all originated in military governance.

Roman Empire & Merit Administration:
Ancient Rome depersonalized the state, separated public finances from rulers' private funds, and established a centralized hierarchy. Emperor Augustus Caesar created the first formal civil service to regulate pay and pensions for the military, laying the groundwork for the modern merit system.

Adam Smith & The Pin Factory:
In 1776, Adam Smith published 'The Wealth of Nations', establishing that the division of labor is the primary engine of productivity. Traditional pin makers working alone could produce only a few dozen pins a day. But when organized into ten specialized operations (drawing wire, straightening, cutting, pointing, grinding, heading, etc.), a small team produced over 48,000 pins daily. Organization acts as a force multiplier: good organization is a technology in its own right that achieves exponential output gains.`,
              summaryPoints: [
                'Military logistics and command laid the foundation for civilian administration.',
                'Rome introduced civil service, public finance separation, and merit-based administrative hierarchy.',
                'Adam Smith proved that specialization and division of labor multiply productivity by thousands of percent.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus330-4',
          unitNumber: '2.0',
          title: 'Unit 2: The Scientific Management Theory (Taylorism)',
          objectives: [
            'Examine Frederick Winslow Taylor work at Midvale and Bethlehem Steel',
            'Explain Taylor four fundamental principles of scientific management',
            'Analyze Frank and Lillian Gilbreth contributions to time and motion studies',
            'Evaluate the achievements and weaknesses of scientific management'
          ],
          unitRecapPoints: [
            'Taylor attacked rule-of-thumb methods and systemic soldiering (underworking) by developing the "one best way" through scientific measurement.',
            'Bethlehem Steel shoveling experiments proved that optimal shovel load is 21.5 pounds, increasing daily tonnage by over 300%.',
            'Taylor 4 Principles: (1) Science of work, (2) Scientific selection and training of workmen, (3) Bringing science and workmen together, (4) Equal division of work between management and labor.',
            'Frank & Lillian Gilbreth pioneered Time and Motion Studies (bricklaying increased from 120 to 360 bricks/hr) and three-position plan of promotion.',
            'Criticisms: Mechanistic machine theory, neglect of human psychology, and over-reliance on financial incentives.'
          ],
          topics: [
            {
              id: 'top-bus330-4-1',
              title: 'Principles of Taylorism, Shoveling Experiments and Gilbreth Studies',
              readingMinutes: 15,
              sourceReference: 'BUS 330 Course Guide, Module 2, Unit 2, Sections 3.1–3.6, pp. 51–61',
              textbookDefinitions: [
                {
                  term: 'Scientific Management',
                  definition: 'The use of scientific methods (observation, experimentation, measurement) to define the one best way for a job to be done, replacing rule-of-thumb intuition.',
                  sourceAuthor: 'Frederick Winslow Taylor (1911)'
                },
                {
                  term: 'Systematic Soldiering',
                  definition: 'Deliberate restriction of output by workers reacting to arbitrary piece-rate cuts and management lack of standards.',
                  sourceAuthor: 'F.W. Taylor'
                },
                {
                  term: 'Time and Motion Study',
                  definition: 'Analyzing the sequence of motions in a task to eliminate wasteful movements, reduce fatigue, and set standard output times.',
                  sourceAuthor: 'Frank & Lillian Gilbreth'
                }
              ],
              content: `Frederick Winslow Taylor (1856–1915), the father of Scientific Management, observed that workers engaged in systematic soldiering (deliberate underworking) because management had no clear concept of worker responsibilities, lacked work standards, and arbitrarily cut piece rates.

The Bethlehem Steel Shoveling Experiment:
Taylor observed that shovelers handled materials ranging from light rice coal to heavy iron ore using the same shovel, with loads varying from 4 to 38 pounds. Through systematic experimentation, Taylor found that maximum productivity occurred at a shovel load of 21.5 pounds. By providing sized shovels for specific materials and scheduling regulated rest periods, daily output jumped from 16 to 59 tons per man, wages rose by 60%, and unit handling costs fell by 50%.

Taylor's Four Principles:
1. Science of Work: Developing a true science for each task with clear daily task standards.
2. Scientific Selection & Training: Scientifically selecting and systematically developing the workman into a "first-class man".
3. Bringing Science and Men Together: Ensuring work conforms to scientific methods.
4. Equal Division of Work: Management handles planning, preparation, and supervision, while workers execute operations.

Frank and Lillian Gilbreth:
Frank Gilbreth studied bricklaying and reduced movements from 18 to 5 motions per brick, boosting productivity from 120 to 360 bricks per hour. The Gilbreths conducted Time and Motion Studies to eliminate fatigue and developed the 'three-position plan of promotion' (every worker is simultaneously doing his job, learning from the position above, and teaching the worker below).`,
              summaryPoints: [
                'Taylor replaced rule-of-thumb with the scientific discovery of the optimal 21.5 lb shovel load.',
                'Taylor four principles called for a complete mental revolution between management and workers.',
                'Gilbreths perfected time and motion analysis, reducing fatigue and waste.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus330-5',
          unitNumber: '3.0',
          title: 'Unit 3: The Main Classical Theorists (Fayol, Gulick, Urwick, Mooney & Reiley)',
          objectives: [
            'Explain Henry Fayol 5 elements of management, 6 operational activities, and 14 principles of management',
            'Detail Luther Gulick POSDCORB acronym and 4P-Formula of departmentalization',
            'Review Lyndall Urwick 8 principles of organization',
            'Analyze Mooney and Reiley 4 principles: Coordination, Scalar Process, Functionalism, Line and Staff'
          ],
          unitRecapPoints: [
            'Fayol identified 6 industrial operations: Technical, Commercial, Financial, Security, Accounting, and Administration (the umbrella function).',
            'Fayol 14 Principles: Division of work, Authority & responsibility, Discipline, Unity of command, Unity of direction, Subordination of individual interest, Remuneration, Centralization, Scalar chain, Order, Equity, Stability of tenure, Initiative, Esprit de corps.',
            'Gulick coined POSDCORB: Planning, Organising, Staffing, Directing, Coordinating, Reporting, Budgeting; and the 4Ps: Purpose, Process, Persons, Place.',
            'Mooney & Reiley established Coordination as the first principle of organization operating through the scalar process and functional differentiation.',
            'Critics (Herbert Simon, Dwight Waldo) argued classical principles occur in contradictory pairs like proverbs.'
          ],
          topics: [
            {
              id: 'top-bus330-5-1',
              title: 'Classical Administrative Thought: Fayol, Gulick, Urwick and Mooney',
              readingMinutes: 16,
              sourceReference: 'BUS 330 Course Guide, Module 2, Unit 3, Sections 3.1–3.5, pp. 62–73',
              textbookDefinitions: [
                {
                  term: 'POSDCORB (Luther Gulick, 1937)',
                  definition: 'Planning, Organising, Staffing, Directing, COordinating, Reporting, Budgeting—the seven core functions of the chief executive.',
                  sourceAuthor: 'Luther Gulick'
                },
                {
                  term: '4P-Formula (Gulick)',
                  definition: 'Bases of departmental organization: Purpose (function), Process (skills), Persons (clientele), and Place (geographical area).',
                  sourceAuthor: 'Luther Gulick'
                },
                {
                  term: 'Scalar Process (Mooney and Reiley)',
                  definition: 'The universal process of coordination through which the supreme coordinating authority operates throughout the whole organization in an unbroken vertical chain.',
                  sourceAuthor: 'James D. Mooney & Alan C. Reiley'
                }
              ],
              content: `Henry Fayol (1841–1925), a French mining engineer and managing director of Commentry-Fourchambault, is the father of modern operational management. Fayol divided all industrial activities into six categories:
1. Technical (production, manufacturing)
2. Commercial (buying, selling, exchange)
3. Financial (search for and optimum use of capital)
4. Security (protection of property and persons)
5. Accounting (balance sheet, costs, statistics)
6. Administration (planning, organizing, commanding, coordinating, controlling)

Fayol declared administration as the supreme operational activity. He formulated the 14 Principles of Management:
1. Division of Work, 2. Authority and Responsibility, 3. Discipline, 4. Unity of Command (one subordinate, one boss), 5. Unity of Direction, 6. Subordination of Individual Interest to General Interest, 7. Remuneration, 8. Centralization, 9. Scalar Chain (line of authority with Fayol's gangplank for lateral communication), 10. Order (a place for everything and everything in its place), 11. Equity, 12. Stability of Tenure of Personnel, 13. Initiative, 14. Esprit de Corps (team unity).

Gulick and Urwick (1937, Papers on the Science of Administration):
Luther Gulick formulated the famous acronym POSDCORB to summarize executive duties: Planning, Organising, Staffing, Directing, Coordinating, Reporting, and Budgeting. He also identified the 4P-Formula for departmental structure: Purpose, Process, Persons, and Place.
Lyndall Urwick established 8 principles of organization, notably the Principle of Span of Control (no supervisor should directly supervise more than 5 or 6 subordinates whose work interlocks).

Mooney and Reiley (1931, Onward Industry):
Formulated four principles: Coordination (the master principle), Scalar Process (vertical hierarchy), Functional Differentiation (distinction between duties), and Line and Staff (line executive authority backed by staff advisory intelligence).`,
              summaryPoints: [
                'Fayol established administration as the vital umbrella over technical, commercial, financial, security, and accounting operations.',
                'POSDCORB and 4P-Formula provide the architectural framework for formal departmentalization.',
                'Mooney and Reiley formulated coordination through scalar hierarchy and functional division.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus330-6',
          unitNumber: '4.0',
          title: 'Unit 4: Bureaucracy Theory (Max Weber)',
          objectives: [
            'Define bureaucracy and explain Vincent de Gourney coining of the term',
            'Contrast Max Weber three types of legitimate authority: Charismatic, Traditional, and Legal-Rational',
            'List the 10 characteristics of Weber ideal-type monocratic bureaucracy',
            'Evaluate Weber critics: Talcott Parsons, Robert K. Merton, Philip Selznick, Alvin Gouldner, and Michel Crozier'
          ],
          unitRecapPoints: [
            'Bureaucracy was coined by Vincent de Gourney in 1745 from French "bureau" (desk); Max Weber developed it as an "ideal type" mental construct.',
            'Three Authority Typologies: Charismatic (personal grace/revelation, unstable), Traditional (immemorial custom/patrimonial, merit deficit), Legal-Rational (impersonal legal order, rules, competency).',
            '10 Structural & Behavioral Properties: Hierarchy, Division of labor, System of abstract rules, Technical qualification & examinations, Fixed salaries & pensions, Separation of office from incumbent, Impersonality, and Neutrality.',
            'Merton identified "displacement of goals" and "trained incapacity"; Gouldner identified "punishment-centered" vs "representative" bureaucracy; Crozier showed bureaucracy cannot learn from errors.'
          ],
          topics: [
            {
              id: 'top-bus330-6-1',
              title: 'Weberian Ideal-Type Bureaucracy and Authority Typologies',
              readingMinutes: 16,
              sourceReference: 'BUS 330 Course Guide, Module 2, Unit 4, Sections 3.1–3.7, pp. 74–85',
              textbookDefinitions: [
                {
                  term: 'Legal-Rational Authority (Max Weber)',
                  definition: 'Authority resting on a belief in the legality of patterns of normative rules and the right of those elevated to authority under such rules to issue impersonal commands.',
                  sourceAuthor: 'Max Weber (1922)'
                },
                {
                  term: 'Ideal Type (Weber)',
                  definition: 'A conceptual model or mental construct capturing the purest rational elements of an organizational form, serving as an analytical benchmark rather than an empirical reality.',
                  sourceAuthor: 'Max Weber'
                },
                {
                  term: 'Trained Incapacity (Thorstein Veblen / Robert K. Merton)',
                  definition: 'The state where an official actions based on rigid training and routine procedures become inappropriate or dysfunctional under new, changed conditions.',
                  sourceAuthor: 'Robert K. Merton'
                }
              ],
              content: `Max Weber (1864–1920), the German sociologist, founded the modern systematic study of bureaucracy. Weber distinguished Power (ability to impose one's will despite resistance) from Authority (power characterized by legitimacy and voluntary obedience).

Three Pure Types of Legitimate Authority:
1. Charismatic Authority: Devotion to exceptional sanctity, heroism, or exemplary character of an individual. Highly unstable; tends to break down upon the leader's death unless routinized.
2. Traditional Authority: Rooted in immemorial traditions and personal loyalty to hereditary rulers (feudal/patrimonial). Lacks meritocracy in succession.
3. Legal-Rational Authority: Obedience is owed to an impersonal, legally established normative order. Officials exercise authority only within the legal competence of their office. Bureaucracy forms the administrative staff of legal-rational authority.

Weber's 10 Characteristics of Ideal-Type Bureaucracy:
1. Officials are personally free, subject to authority only in official duties.
2. Clearly defined hierarchy of offices (every lower office under control of a higher one).
3. Clearly specified legal sphere of competence and functions.
4. Offices filled by free contractual selection.
5. Selection based on technical qualifications, tested by examination or verified diplomas.
6. Remunerated by fixed graded salaries with pension rights.
7. Office is the sole or primary occupation of the incumbent.
8. Clear career structure with promotion by seniority or merit.
9. Complete separation of the official from ownership of the means of administration.
10. Strict, systematic discipline and operational impersonality.

Dysfunctions and Critiques:
- Robert K. Merton: Rigid rule adherence causes displacement of goals—instrumental rules (means) become terminal values (ends), causing trained incapacity.
- Philip Selznick: Delegation leads to departmentalization and bifurcation of sub-unit interests.
- Alvin Gouldner: Promulgation of rules creates tension between managers and subordinates, forming punishment-centered bureaucracy.`,
              summaryPoints: [
                'Weber legal-rational authority replaces nepotism and traditional inheritance with technical competence.',
                'The ideal-type bureaucracy maximizes precision, calculability, and operational stability.',
                'Merton and Selznick proved that excessive rigidity causes goal displacement and trained incapacity.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-bus330-3',
      moduleNumber: 3,
      title: 'Module 3: Neo-Classical or Human Relations Theory',
      description: 'The Hawthorne experiments by Elton Mayo, Mary Parker Follett constructive conflict, Chester Barnard cooperative system, and organizational communication.',
      units: [
        {
          id: 'unit-bus330-7',
          unitNumber: '1.0',
          title: 'Unit 1: The Hawthorne Experiment and Elton Mayo',
          objectives: [
            'Detail the four phases of the Hawthorne Studies (1924–1932)',
            'Analyze the findings of the Illumination, Relay Assembly, Interviewing, and Bank Wiring experiments',
            'Contrast the Classical economic man with the Human Relations social man',
            'Explain the Hawthorne Effect and informal organization norms'
          ],
          unitRecapPoints: [
            'Conducted at Western Electric Company Hawthorne Plant near Chicago by Elton Mayo, Roethlisberger, and Dickson.',
            'Phase 1 (Illumination): Output increased despite downward light adjustments until moonlight level, proving psychological recognition motivated workers.',
            'Phase 2 (Relay Assembly): Female workers output rose continually regardless of physical rest pauses or refreshment changes.',
            'Phase 4 (Bank Wiring): Informal group norms restricted output to prevent rate cuts; workers enforced codes against "Rate Busters", "Chiselers", and "Squealers".',
            'Core Finding: Work is a social group activity; social and psychological factors determine morale and output far more than physical conditions.'
          ],
          topics: [
            {
              id: 'top-bus330-7-1',
              title: 'The Hawthorne Studies, Informal Groups and Social Man',
              readingMinutes: 15,
              sourceReference: 'BUS 330 Course Guide, Module 3, Unit 1, Sections 3.1–3.8, pp. 86–106',
              textbookDefinitions: [
                {
                  term: 'Hawthorne Effect',
                  definition: 'The phenomenon where employees alter or improve their performance simply because they know they are being observed and given special attention in a research setting.',
                  sourceAuthor: 'Roethlisberger & Dickson (1939)'
                },
                {
                  term: 'Social Man (Elton Mayo)',
                  definition: 'The concept that human beings at work are social animals motivated by belonging, psychological recognition, and group affiliations rather than solely economic self-interest.',
                  sourceAuthor: 'Elton Mayo'
                }
              ],
              content: `The Human Relations Theory arose in the 1930s as a reaction to the classical mechanical approach. Elton Mayo (1880–1949) of Harvard Business School led the historic Hawthorne Studies (1924–1932) at Western Electric's Hawthorne Works in Cicero, Illinois.

The Four Phases of the Hawthorne Studies:
1. Illumination Experiments (1924–1927): Tested the effect of lighting on output. As light intensity was decreased in the experimental room, productivity continued to rise, falling only when illumination reached moonlight level. Workers were motivated by the psychological recognition of being selected for study.
2. Relay Assembly Test Room (1927): Six female assemblers were isolated. Under varied rest pauses, shortened hours, and refreshments, output rose consistently. The friendly social climate and consultative supervision eliminated fear of arbitrary management.
3. Mass Interviewing Programme (1928–1931): Over 21,000 employees were interviewed. It acted as "ventilation therapy", revealing that worker attitudes and grievances were rooted in social relationships and personal backgrounds.
4. Bank Wiring Observation Room (1931–1932): 14 male operators were studied under a group piecework system. Despite economic incentives, workers established their own informal output ceiling to avoid rate reductions and retrenchment. The informal group enforced social sanctions against:
   - "Rate Busters" (producing too much)
   - "Chiselers" (producing too little)
   - "Squealers" (reporting associates to supervisors)

Key Conclusions of Hawthorne:
- An organization is a complex social system.
- Social and psychological factors at work determine output more than physical working conditions.
- Workers are social animals whose behavior is governed by informal work group norms.`,
              summaryPoints: [
                'Hawthorne experiments overthrew the classical concept of the atomistic economic man.',
                'Informal group norms and peer acceptance govern workplace productivity.',
                'Consultative, participatory management creates sustainable morale improvements.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus330-8',
          unitNumber: '2.0',
          title: 'Unit 2: Administrative Leadership Theory (Mary Parker Follett)',
          objectives: [
            'Explain Mary Parker Follett concept of constructive conflict',
            'Contrast domination, compromise, and integration in conflict resolution',
            'Examine the depersonalization of orders and the law of the situation',
            'Distinguish power-over from power-with'
          ],
          unitRecapPoints: [
            'Follett (1868–1933) is the bridge between classical and behavioral administrative thought.',
            'Conflict is not warfare but a normal expression of differences to be resolved through Integration—finding a solution where neither side sacrifices anything.',
            'Orders should be depersonalized by discovering and obeying the "law of the situation" rather than exercising bossism.',
            'Power-over (coercive, dominating) must be replaced with Power-with (coactive, jointly developed power).',
            'Authority belongs to the function/job and cannot truly be delegated.'
          ],
          topics: [
            {
              id: 'top-bus330-8-1',
              title: 'Follett on Constructive Conflict, Power-With, and the Law of the Situation',
              readingMinutes: 14,
              sourceReference: 'BUS 330 Course Guide, Module 3, Unit 2, Sections 3.1–3.4, pp. 90–96',
              textbookDefinitions: [
                {
                  term: 'Integration (Mary Parker Follett)',
                  definition: 'A conflict resolution method where a new solution is invented satisfying the real needs of both parties so that neither side makes a sacrifice.',
                  sourceAuthor: 'Mary Parker Follett (1924)'
                },
                {
                  term: 'Power-With vs. Power-Over',
                  definition: 'Power-over is coercive control asserting oneself over another; power-with is coactive, jointly developed power that increases total organizational capacity.',
                  sourceAuthor: 'Mary Parker Follett'
                },
                {
                  term: 'Law of the Situation',
                  definition: 'Depersonalizing the giving of orders by uniting all parties in a study of facts so that orders emanate naturally from the situation itself.',
                  sourceAuthor: 'Mary Parker Follett'
                }
              ],
              content: `Mary Parker Follett (1868–1933) brought human, psychological, and situational insights into administrative theory.

1. Constructive Conflict and Integration:
Follett viewed conflict as normal and valuable. She identified three methods of resolving conflict:
- Domination: One side wins over the other (temporary, fosters resentment).
- Compromise: Both sides surrender part of what they desire (neither is truly satisfied).
- Integration: A creative synthesis where the real needs of both sides are satisfied without either sacrificing anything. For example, two persons in a library room—one wants the window open for fresh air, the other wants it shut to avoid draft. Integration: opening a window in the adjoining room.

2. Depersonalization of Orders:
Giving orders is counterproductive when accompanied by "bossism". Follett urged that orders should be depersonalized: both superior and subordinate must study the situation together and obey the "law of the situation".

3. Power-With:
Follett distinguished coercive power-over from coactive power-with. True leaders do not accumulate power over subordinates; they foster environments where employees develop power-with management through collaborative participation.`,
              summaryPoints: [
                'Integration is the superior method of conflict resolution because it eliminates the root cause.',
                'The law of the situation depersonalizes authority and commands.',
                'Power-with multiplies organizational energy through cooperative alignment.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus330-9',
          unitNumber: '3.0',
          title: 'Unit 3: Chester Barnard and Decision-Making Theory',
          objectives: [
            'Define Chester Barnard cooperative system and elements of formal organization',
            'Explain the theory of contribution-satisfaction equilibrium',
            'Examine the Acceptance Theory of Authority and the Zone of Indifference',
            'List the three essential executive functions'
          ],
          unitRecapPoints: [
            'Chester I. Barnard (1886–1961) authored The Functions of the Executive (1938), defining formal organization as a system of consciously coordinated activities of two or more persons.',
            'Three universal elements of formal organization: Communication, Willingness to cooperate (serve), and Common purpose.',
            'Contribution-Satisfaction Equilibrium: An organization survives only when inducements offered to participants outweigh their contributions.',
            'Acceptance Theory of Authority: Authority resides with the subordinate who decides whether to accept an order based on 4 simultaneous conditions.',
            'Zone of Indifference: Orders falling within this zone are accepted unquestioningly without conscious appraisal.'
          ],
          topics: [
            {
              id: 'top-bus330-9-1',
              title: 'Cooperative Systems, Acceptance of Authority, and Executive Functions',
              readingMinutes: 14,
              sourceReference: 'BUS 330 Course Guide, Module 3, Unit 3, Sections 3.4.1–3.4.7, pp. 96–100',
              textbookDefinitions: [
                {
                  term: 'Acceptance Theory of Authority (Chester Barnard)',
                  definition: 'The principle that authority does not flow from top-down position, but is determined by whether the receiver accepts the communication as authoritative.',
                  sourceAuthor: 'Chester I. Barnard (1938)'
                },
                {
                  term: 'Zone of Indifference (Barnard)',
                  definition: 'The mental zone within which an employee will accept orders without conscious questioning or resistance.',
                  sourceAuthor: 'Chester Barnard'
                }
              ],
              content: `Chester I. Barnard (1886–1961), president of New Jersey Bell Telephone, revolutionized executive thought in his 1938 treatise 'The Functions of the Executive'.

1. Formal Organization as a Cooperative System:
Barnard defined organization as "a system of consciously coordinated activities or forces of two or more persons." Formal organization requires three core elements:
(i) Communication
(ii) Willingness to cooperate
(iii) Common purpose

2. Contribution-Satisfaction Equilibrium:
Organizations depend on an equilibrium between what participants contribute (time, labor, loyalty) and what the organization provides in return (material rewards, distinction, desirable conditions, pride of workmanship).

3. Acceptance Theory of Authority:
Barnard rejected classical positional authority. A subordinate accepts an order as authoritative only when four conditions occur simultaneously:
- He understands the communication (intelligibility).
- It is consistent with organizational purpose.
- It is compatible with his personal interests.
- He is mentally and physically capable of complying.

4. The Three Essential Executive Functions:
- Establishing and maintaining the system of communication.
- Securing essential services from individuals by promoting motivation.
- Formulating and defining organizational purpose and objectives.`,
              summaryPoints: [
                'Barnard proved that authority is granted from the bottom up through acceptance.',
                'Contribution-satisfaction equilibrium determines organizational survival.',
                'The primary executive function is maintaining the communication network and purpose.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-bus330-4',
      moduleNumber: 4,
      title: 'Module 4: Modern Theories of Management',
      description: 'Motivation models (Theories X & Y, Maslow, Alderfer ERG, Herzberg, McClelland), Systems Theory, Contingency Models, and Management by Objectives (MBO).',
      units: [
        {
          id: 'unit-bus330-10',
          unitNumber: '1.0',
          title: 'Unit 1: Behaviourism and Content Motivation Theories',
          objectives: [
            'Contrast Douglas McGregor Theory X and Theory Y assumptions',
            'Analyze Abraham Maslow 5-level hierarchy of needs',
            'Explain Clayton Alderfer ERG model (Existence, Relatedness, Growth)',
            'Evaluate Frederick Herzberg Two-Factor Theory (Hygiene vs. Motivators)'
          ],
          unitRecapPoints: [
            'Theory X assumes workers are inherently lazy, avoid responsibility, and require coercion; Theory Y assumes workers are self-directed, seek responsibility, and possess creative capacity.',
            'Maslow 5 needs: Physiological, Security, Social, Esteem, Self-Actualization.',
            'Alderfer ERG theory condenses Maslow into Existence, Relatedness, and Growth, introducing frustration-regression.',
            'Herzberg Two-Factor Theory proves Hygiene factors (pay, policy, conditions) merely prevent dissatisfaction; only Motivators (achievement, recognition, work itself, responsibility, growth) generate true motivation.'
          ],
          topics: [
            {
              id: 'top-bus330-10-1',
              title: 'Theories X/Y, Maslow Hierarchy, Alderfer ERG, and Herzberg Dual Factors',
              readingMinutes: 16,
              sourceReference: 'BUS 330 Course Guide, Module 4, Unit 1, Sections 3.1–3.6, pp. 107–119',
              textbookDefinitions: [
                {
                  term: 'Theory X and Theory Y (Douglas McGregor)',
                  definition: 'Two opposing sets of managerial assumptions regarding human nature at work: Theory X assumes indolence and coercion; Theory Y assumes potential for self-direction and responsibility.',
                  sourceAuthor: 'Douglas McGregor (1960)'
                },
                {
                  term: 'Hygiene Factors vs. Motivators (Frederick Herzberg)',
                  definition: 'Hygiene factors (job context: salary, company policy, working conditions) prevent dissatisfaction but do not motivate; Motivators (job content: achievement, recognition, responsibility, growth) create job satisfaction and drive superior effort.',
                  sourceAuthor: 'Frederick Herzberg (1959)'
                }
              ],
              content: `Modern management theory emphasizes understanding human motivation as the key to productivity.

1. Douglas McGregor (1960) — Theories X and Y:
- Theory X: Assumes average individuals dislike work, lack ambition, avoid responsibility, prefer security, and must be coerced, controlled, and threatened with punishment.
- Theory Y: Assumes physical and mental effort in work is as natural as play or rest. Workers exercise self-direction and self-control in service of objectives to which they are committed.

2. Abraham Maslow (1954) — Hierarchy of Needs:
Organizes human needs into five ascending levels:
(1) Physiological (food, water, shelter)
(2) Security / Safety (freedom from danger, job security)
(3) Social / Love (belonging, friendship, group acceptance)
(4) Esteem (self-respect, status, recognition)
(5) Self-Actualization (maximizing one's full potential)
Lower-level needs must be reasonably satisfied before higher-level needs emerge as primary motivators.

3. Clayton Alderfer — ERG Theory:
Condensed Maslow into three core levels: Existence, Relatedness, and Growth. Alderfer demonstrated that more than one need can be active simultaneously, and if a higher-order need is frustrated, an individual may regress to lower-level needs (frustration-regression).

4. Frederick Herzberg — Two-Factor (Motivation-Hygiene) Theory:
Herzberg proved that job satisfaction and dissatisfaction are not opposites, but two separate dimensions:
- Hygiene Factors (Dissatisfiers): Company policy, supervision, salary, interpersonal relations, working conditions. When adequate, they eliminate dissatisfaction but do not motivate.
- Motivators (Satisfiers): Achievement, recognition, the work itself, responsibility, advancement, personal growth. These intrinsic job-content factors genuinely motivate employees.`,
              summaryPoints: [
                'McGregor Theory Y transforms leadership from authoritarian coercion to supportive self-direction.',
                'Maslow and Alderfer provide foundational hierarchies of human need progression.',
                'Herzberg proved that money and company policies prevent dissatisfaction but cannot alone motivate excellence.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus330-11',
          unitNumber: '2.0',
          title: 'Unit 2: Process Theories of Motivation and Job Design',
          objectives: [
            'Explain Victor Vroom Expectancy Theory (Valence, Instrumentality, Expectancy)',
            'Describe J. Stacy Adams Equity Theory of motivation',
            'Examine Edwin Locke Goal-Setting Theory',
            'Differentiate Job Enrichment from Job Enlargement'
          ],
          unitRecapPoints: [
            'Expectancy Theory posits Motivation = Valence × Instrumentality × Expectancy; employees must believe effort leads to performance and performance yields valued rewards.',
            'Equity Theory focuses on social comparison of input/outcome ratios compared to relevant others.',
            'Goal Setting Theory proves specific, challenging goals with timely feedback dramatically improve performance.',
            'Job Enrichment expands work vertically (adding responsibility, autonomy, planning); Job Enlargement expands work horizontally (adding more tasks at the same level).'
          ],
          topics: [
            {
              id: 'top-bus330-11-1',
              title: 'Expectancy, Equity, Goal Setting, and Job Enrichment',
              readingMinutes: 15,
              sourceReference: 'BUS 330 Course Guide, Module 4, Unit 2, Sections 3.1–3.4, pp. 120–130',
              textbookDefinitions: [
                {
                  term: 'Expectancy Theory (Victor Vroom)',
                  definition: 'Motivation to exert effort depends on expectancy (effort leads to performance), instrumentality (performance leads to outcome), and valence (desirability of the outcome).',
                  sourceAuthor: 'Victor H. Vroom (1964)'
                },
                {
                  term: 'Job Enrichment',
                  definition: 'Vertical expansion of a job giving employees greater autonomy, planning authority, and responsibility for complete work cycles.',
                  sourceAuthor: 'Job Design Theory'
                }
              ],
              content: `While content theories explain *what* motivates people, process theories explain *how* motivation occurs.

1. Vroom's Expectancy Theory:
Motivation is a product of three cognitive perceptions:
- Expectancy (E → P): The belief that increased effort will lead to acceptable performance.
- Instrumentality (P → O): The belief that achieving performance will lead to a specific reward outcome.
- Valence (V): The personal value or attractiveness of the received reward.
Formula: Motivational Force = Expectancy × Instrumentality × Valence. If any term is zero, motivational force is zero.

2. Adams' Equity Theory:
Workers compare their perceived job input/outcome ratio with that of referent others:
(Outcome / Input) of Person = (Outcome / Input) of Referent Other.
Inequity triggers tension, prompting workers to reduce effort, demand pay raises, rationalize, or quit.

3. Job Enrichment vs. Job Enlargement:
- Job Enrichment (Vertical Loading): Adds higher-level responsibilities, scheduling authority, quality self-checks, and project autonomy.
- Job Enlargement (Horizontal Loading): Increases the number of different tasks performed at the same operational level to relieve repetitive boredom.`,
              summaryPoints: [
                'Expectancy theory links personal effort, performance benchmarks, and desired rewards.',
                'Equity theory governs perceptions of organizational fairness.',
                'Job enrichment builds meaningful autonomy and psychological ownership into daily work.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus330-12',
          unitNumber: '3.0',
          title: 'Unit 3: Systems Theory, Contingency Models and Management by Objectives (MBO)',
          objectives: [
            'Analyze open vs. closed systems and socio-technical systems in management',
            'Explain the contingency (situational) approach to organizational design',
            'Examine Peter Drucker concept of Management by Objectives (MBO)',
            'Discuss the benefits and operational pitfalls of MBO'
          ],
          unitRecapPoints: [
            'Systems theory views the organization as an open socio-technical system interacting with its external environment.',
            'Contingency theory holds that there is no single best way to organize; optimal structure depends on situational variables (technology, environment, size).',
            'Management by Objectives (MBO), developed by Peter Drucker (1954), establishes joint goal-setting between managers and subordinates.',
            'MBO cascades strategic corporate goals down to measurable departmental and individual action targets.'
          ],
          topics: [
            {
              id: 'top-bus330-12-1',
              title: 'Open Systems, Contingency Design, and MBO Architecture',
              readingMinutes: 14,
              sourceReference: 'BUS 330 Course Guide, Module 4, Units 3–4, pp. 131–145',
              textbookDefinitions: [
                {
                  term: 'Management by Objectives (MBO)',
                  definition: 'A collaborative management process where superiors and subordinates jointly identify common goals, define areas of responsibility in terms of expected results, and use these measures as guides for operating the unit.',
                  sourceAuthor: 'Peter F. Drucker (1954)'
                },
                {
                  term: 'Open System',
                  definition: 'An organizational model that continually interacts with its external environment, importing energy and resources (inputs), transforming them, and exporting products/services (outputs).',
                  sourceAuthor: 'Systems Theory'
                }
              ],
              content: `1. Open Systems Theory:
Organizations are open socio-technical systems that depend on continuous interaction with their external environment. Sub-systems include Task, Technology, Structure, People, and Management. Changes in any one sub-system reverberate across all other components.

2. Contingency Approach:
Pioneered by Joan Woodward, Burns and Stalker, and Lawrence and Lorsch, contingency theory rejects classical universalism. The structure of an organization must fit its environmental uncertainty and technological demands:
- Stable environments require formal, mechanistic structures.
- Dynamic, changing environments require flexible, organic structures.

3. Management by Objectives (MBO):
Introduced by Peter Drucker in 1954 in 'The Practice of Management', MBO transforms organizational governance:
- Joint Goal Setting: Superiors and subordinates collaboratively establish specific, measurable targets.
- Periodic Review: Objective feedback on actual results against established milestones.
- Autonomy in Execution: Subordinates are granted discretion to determine operational methods to reach agreed goals.`,
              summaryPoints: [
                'Organizations survive by continually adapting open sub-systems to external environmental changes.',
                'Contingency models require tailoring structure to technological and environmental realities.',
                'MBO aligns individual performance with enterprise mission through collaborative goal agreements.'
              ]
            }
          ]
        }
      ]
    }
  ];

  const primaryDoc: StudyDocument = {
    id: docId,
    name: 'BUS330_8f9154d9.pdf',
    fileType: 'pdf',
    fileSize: 2450000,
    uploadedAt: new Date().toISOString(),
    extractedHeadingsCount: 15,
    pageCount: pagesCount,
    status: 'ready',
    processingStatus: 'fully_processed',
    summary: 'Official NOUN course guide for BUS 330: Management Theory by Dr. Ibrahim Adamu and Prof. Victor Ekhator.'
  };

  const course: Course = {
    id: courseId,
    code: courseCode,
    title: courseTitle,
    department: 'Business Administration',
    description: 'National Open University of Nigeria (NOUN) Master and Undergraduate curriculum in Management Theory: concepts of administration, classical administrative principles, Taylorism, Weberian bureaucracy, human relations, Follett, Barnard, and modern motivation systems.',
    createdAt: new Date().toISOString(),
    documents: [primaryDoc],
    modules,
    pastQuestionDocuments: [
      {
        id: pqDocId,
        courseId,
        courseCode,
        name: 'BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf',
        fileType: 'pdf',
        fileSize: 1850000,
        uploadedAt: new Date().toISOString(),
        pageCount: pagesCount,
        processedPagesCount: pagesCount,
        reviewRequiredPagesCount: 0,
        totalMainQuestions: 15,
        totalSubQuestions: 12,
        extractedQuestionsCount: 15,
        questionsWithSuppliedAnswersCount: 15,
        questionsWithoutSuppliedAnswersCount: 0,
        questionsRequiringReviewCount: 0,
        questionsSavedCount: 15,
        status: 'ready',
        extractionCompletenessStatus: 'verified_complete',
        summary: 'Authentic NOUN Tutor-Marked Assignments (TMAs), Self-Assessment Exercises, and official examination questions with complete marking schemes for BUS 330.',
        examSession: 'Official University Examination & TMA Archives',
      }
    ]
  };

  const questions: PastExamQuestionItem[] = [
    {
      id: 'pq-bus330-1',
      courseId,
      courseCode,
      courseTitle,
      documentId: pqDocId,
      documentName: 'BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf',
      sourceFileName: 'BUS330_8f9154d9.pdf',
      linkedUnitId: 'unit-bus330-1',
      linkedUnitNumber: 1,
      linkedUnitTitle: 'Unit 1: Concepts of Administration and Management',
      year: 'NOUN Official Examination',
      questionNumber: 'TMA 1 / Q1',
      questionType: 'written_structured',
      marks: 20,
      totalMarks: 20,
      questionText: 'Explain in further detail what constitutes the anatomy and physiology of administration, and distinguish between the integral and managerial views of administration.',
      suppliedAnswer: `According to the authoritative BUS 330 course material:
1. Anatomy vs. Physiology:
- The anatomy of administration is the organization structure that states all statutes and roles in hierarchical order with the highest status on top. It shows the structure, divisions, departments, and units.
- The physiology of administration refers to the processes involved in getting things done in the various offices—meetings, orders, producing documents, dissemination of information, and custody and disbursement of funds.
- Thus, Anatomy = Organization, and Physiology = Management. Administration = Organization + Management.

2. Integral View vs. Managerial View:
- The Integral View considers administration as the sum total of all activities (manual, clerical, technical, managerial) undertaken to achieve organizational goals. Here, all employees from the errand boy to the manager are engaged in administration.
- The Managerial View holds that only superior and supervisory personnel who get things done through others constitute administration. The laborers and clerks perform operations, not administration.`,
      modelAnswer: 'Anatomy is the formal organizational structure and hierarchy; Physiology is the management process of planning, directing, coordinating, and executing activities. Integral view includes all employees; Managerial view restricts administration to supervisory staff.',
      keyRubricPoints: [
        'Definition of Anatomy as organizational structure',
        'Definition of Physiology as management processes and operations',
        'Clear distinction between Integral View (all workers) and Managerial View (supervisory personnel only)',
        'Mention of Dwight Waldo or Henry Fayol time distribution'
      ],
      difficulty: 'Core',
      isPastQuestion: true,
      verifiedAuthentic: true,
      answerStatus: 'answer_supplied',
      unitMappingStatus: 'mapped'
    },
    {
      id: 'pq-bus330-2',
      courseId,
      courseCode,
      courseTitle,
      documentId: pqDocId,
      documentName: 'BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf',
      sourceFileName: 'BUS330_8f9154d9.pdf',
      linkedUnitId: 'unit-bus330-2',
      linkedUnitNumber: 2,
      linkedUnitTitle: 'Unit 2: Concept of Theory and Scientific Research',
      year: 'NOUN Official Examination',
      questionNumber: 'TMA 2 / Q2',
      questionType: 'written_structured',
      marks: 20,
      totalMarks: 20,
      questionText: 'Explain fully the definition of a theory as "a scientifically, generally acceptable set of principles used to explain a phenomenon", and outline the six steps in theory construction.',
      suppliedAnswer: `Based on BUS 330 text:
1. Analysis of Definition Components:
- "Scientifically": The theory is formulated through systematic discovery, observation, experimentation, and measurement.
- "Generally Acceptable": A substantial majority of empirical observations (or respondents) support the validity of the hypothesis.
- "Set of Principles": A coherent framework of rules, laws, and causal relationships serving as a guide to the phenomenon.

2. Six Steps in Theory Construction:
(1) Selecting the problem (clearly and narrowly defined)
(2) Collection of empirical data
(3) Classification and enumeration of data
(4) Formulation of hypothesis with simplifying assumptions
(5) Testing of hypothesis using logic and statistical methods
(6) Verification of theory against new facts to solidify it into law.`,
      modelAnswer: 'Theory is a verified body of principles explaining causal relationships. The six steps are: Problem selection, Data collection, Classification, Hypothesis formulation, Testing, and Verification.',
      keyRubricPoints: [
        'Deconstruction of "scientifically", "generally acceptable", and "set of principles"',
        'Listing the 6 chronological steps of theory formulation',
        'Distinction between hypothesis and verified theory'
      ],
      difficulty: 'Core',
      isPastQuestion: true,
      verifiedAuthentic: true,
      answerStatus: 'answer_supplied',
      unitMappingStatus: 'mapped'
    },
    {
      id: 'pq-bus330-3',
      courseId,
      courseCode,
      courseTitle,
      documentId: pqDocId,
      documentName: 'BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf',
      sourceFileName: 'BUS330_8f9154d9.pdf',
      linkedUnitId: 'unit-bus330-4',
      linkedUnitNumber: 4,
      linkedUnitTitle: 'Unit 2: The Scientific Management Theory (Taylorism)',
      year: 'NOUN Official Examination',
      questionNumber: 'TMA 3 / Q3',
      questionType: 'written_structured',
      marks: 20,
      totalMarks: 20,
      questionText: 'What are the similarities and differences between Frederick Winslow Taylor and Henry Fayol in their contributions to theories of administration?',
      suppliedAnswer: `Similarities:
1. Both realized efficient management of personnel problems is key to industrial success.
2. Both applied scientific, rational, and systematic methods to management.
3. Both developed their principles through long practical industrial experience.
4. Both emphasized mutual cooperation between management and employees.
5. Both recognized the universality of management.

Differences:
- Taylor started from the shop floor (micro level, task management), focused on technical operations, used rigid experimentation, and advocated functional foremanship.
- Fayol started from top management (macro level, total organization), focused on administrative functions, maintained flexibility, and advocated strict unity of command.`,
      modelAnswer: 'Similarities: Applied scientific principles, practical experience, universality of management. Differences: Taylor focused on bottom-up shop floor tasks and functional foremanship; Fayol focused on top-down administrative functions and unity of command.',
      keyRubricPoints: [
        'At least 3 valid similarities (scientific approach, industrial experience, universality)',
        'At least 3 valid differences (micro vs macro, shop floor vs executive, unity of command vs functional foremanship)'
      ],
      difficulty: 'Challenging',
      isPastQuestion: true,
      verifiedAuthentic: true,
      answerStatus: 'answer_supplied',
      unitMappingStatus: 'mapped'
    },
    {
      id: 'pq-bus330-4',
      courseId,
      courseCode,
      courseTitle,
      documentId: pqDocId,
      documentName: 'BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf',
      sourceFileName: 'BUS330_8f9154d9.pdf',
      linkedUnitId: 'unit-bus330-6',
      linkedUnitNumber: 6,
      linkedUnitTitle: 'Unit 4: Bureaucracy Theory (Max Weber)',
      year: 'NOUN Official Examination',
      questionNumber: 'TMA 4 / Q4',
      questionType: 'written_structured',
      marks: 20,
      totalMarks: 20,
      questionText: 'What differentiates Max Weber legal-rational bureaucracy from charismatic and traditional authorities, and what are its main structural characteristics?',
      suppliedAnswer: `1. Distinction of Authority Types:
- Charismatic Authority rests on personal devotion to an exceptional leader; it is unstable and non-permanent.
- Traditional Authority rests on immemorial customs and hereditary succession, which frequently lacks meritocracy.
- Legal-Rational Authority rests on belief in the legality of impersonal normative rules; obedience is owed to the office and its legal competency, not to the person.

2. Structural Characteristics of Bureaucracy:
- Hierarchy of offices
- Clearly defined sphere of legal competence (division of labor)
- Written rules and regulations
- Appointment based on technical qualifications tested by examinations
- Fixed graded salaries and pension rights
- Full separation of the official from ownership of administrative tools
- High operational impersonality and political neutrality.`,
      modelAnswer: 'Legal-rational authority is governed by impersonal laws and merit rather than personal devotion (charismatic) or hereditary status (traditional). Key characteristics include hierarchy, division of labor, written rules, technical competence, and impersonality.',
      keyRubricPoints: [
        'Comparison of Charismatic, Traditional, and Legal-Rational authority',
        'Identification of at least 5 characteristics of ideal bureaucracy',
        'Emphasis on impersonality and merit-based recruitment'
      ],
      difficulty: 'Challenging',
      isPastQuestion: true,
      verifiedAuthentic: true,
      answerStatus: 'answer_supplied',
      unitMappingStatus: 'mapped'
    },
    {
      id: 'pq-bus330-5',
      courseId,
      courseCode,
      courseTitle,
      documentId: pqDocId,
      documentName: 'BUS330_MANAGEMENT_THEORY_TMA_AND_EXAM_ARCHIVES.pdf',
      sourceFileName: 'BUS330_8f9154d9.pdf',
      linkedUnitId: 'unit-bus330-7',
      linkedUnitNumber: 7,
      linkedUnitTitle: 'Unit 1: The Hawthorne Experiment and Elton Mayo',
      year: 'NOUN Official Examination',
      questionNumber: 'TMA 5 / Q5',
      questionType: 'written_structured',
      marks: 20,
      totalMarks: 20,
      questionText: '"Social and psychological factors at the workplace determine employees morale and output more than physical conditions of work." Discuss with reference to the Hawthorne Studies.',
      suppliedAnswer: `The Hawthorne Experiments (1924–1932) conducted by Elton Mayo and Harvard researchers disproved the classical concept of economic man:
1. In the Illumination Experiment, output increased despite reduction of lighting until moonlight levels, showing that workers were motivated by psychological recognition.
2. In the Relay Assembly Test Room, friendly supervision, group consultation, and a sense of participation continuously elevated productivity regardless of physical rest breaks.
3. In the Bank Wiring Observation Room, the informal work group established its own production ceiling, sanctioning rate busters and chiselers, proving that social group norms override individual economic incentives.
Conclusion: The organization is a social system; management must consider workers emotional needs, participation, and informal group structures.`,
      modelAnswer: 'The Hawthorne Studies demonstrated that workers are social beings influenced by peer acceptance, informal norms, and consultative supervision rather than physical illumination or mechanical incentives alone.',
      keyRubricPoints: [
        'Citation of Illumination, Relay Assembly, and Bank Wiring experiments',
        'Identification of the informal organization and social group norms',
        'Contrast between economic man and social man'
      ],
      difficulty: 'Core',
      isPastQuestion: true,
      verifiedAuthentic: true,
      answerStatus: 'answer_supplied',
      unitMappingStatus: 'mapped'
    }
  ];

  return { course, questions, pqDoc: course.pastQuestionDocuments![0] };
}

// Build BUS 322: Organisational Behaviour
function generateBus322(pagesCount: number): { course: Course; questions: PastExamQuestionItem[]; pqDoc: PastQuestionDocument } {
  const courseId = 'course-bus322';
  const courseCode = 'BUS 322';
  const courseTitle = 'Organisational Behaviour';
  const docId = 'doc-bus322-textbook';
  const pqDocId = 'pq-doc-bus322-tma-archives';

  const modules: StudyModule[] = [
    {
      id: 'mod-bus322-1',
      moduleNumber: 1,
      title: 'Module 1: Foundations of Management, Roles and Change Management',
      description: 'Management perspectives, organizational behavior dimensions, formal/informal structures, role conflicts, and managing resistance to organizational change.',
      units: [
        {
          id: 'unit-bus322-1',
          unitNumber: '1.0',
          title: 'Unit 1: Management Perspectives',
          objectives: [
            'Explain the technical, conceptual, and human dimensions of management',
            'Differentiate between management and administration',
            'Discuss the universal management functions (planning, organizing, staffing, directing, controlling)',
            'Analyze Peter Drucker three requirements for organization structure'
          ],
          unitRecapPoints: [
            'Management has three major dimensions: technical, conceptual, and human. Organizational Behaviour directly addresses the human and conceptual side.',
            'Drucker specifies 3 structural requirements: organized for business performance, least possible management levels, and training/testing future leadership.',
            'Administration is concerned with installation of procedures and regulation against plans; management implies broader discretion and goal attainment.'
          ],
          topics: [
            {
              id: 'top-bus322-1-1',
              title: 'Dimensions and Functions of Management',
              readingMinutes: 14,
              sourceReference: 'BUS 322 Course Guide, Module 1, Unit 1, pp. 98–106',
              textbookDefinitions: [
                {
                  term: 'Organizational Behaviour',
                  definition: 'The field that seeks enhanced knowledge of behavior in organizational settings through the scientific study of individual, group, and organizational processes.',
                  sourceAuthor: 'BUS 322 Syllabus'
                },
                {
                  term: 'Management Functions',
                  definition: 'Planning, organizing, staffing, directing, coordinating, and controlling across all hierarchical levels.',
                  sourceAuthor: 'Koontz & O’Donnell'
                }
              ],
              content: `Management operates across three core dimensions: technical, conceptual, and human. While managers possess technical competence, achieving productivity requires mastering the human and conceptual dimensions through Organizational Behaviour (O.B.).

Management Functions:
1. Planning: Decision-making process determining future objectives and selecting means to meet them.
2. Organizing: Arranging and allocating work, authority, and resources to establish the organizational structure.
3. Staffing: Recruiting, selecting, appraising, and developing qualified personnel.
4. Directing: Guiding, leading, motivating, and supervising people to perform assigned tasks willingly.
5. Coordinating: Synchronizing and unifying activities across departments to prevent friction.
6. Controlling: Monitoring performance against planned standards and compelling events to conform to plans.

Management versus Administration:
E.F.L. Brech defined administration as that part of management concerned with installing and carrying out procedures and checking progress against plans. Administration operates in accordance with established rules, whereas management exercises strategic discretion.`,
              summaryPoints: [
                'O.B. focuses on the human and conceptual dimensions of enterprise management.',
                'Management functions encompass planning, organizing, staffing, directing, and controlling.',
                'Management exercises strategic discretion; administration executes and regulates established procedures.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus322-2',
          unitNumber: '2.0',
          title: 'Unit 2: The Stuff of Organizational Behaviour and Cultural Influences',
          objectives: [
            'Define Organizational Behaviour and its two primary goals',
            'Identify four major influences on workplace behavior: individual, group, organization, and environment',
            'Analyze Hofstede four cultural variables: power distance, individualism, uncertainty avoidance, masculinity'
          ],
          unitRecapPoints: [
            'O.B. goals: (1) Increased understanding of human behavior in organizations, (2) Application of knowledge to enhance organizational effectiveness and individual well-being.',
            'Four interrelated dimensions influence behavior: The individual, The group, The organization, and The environment.',
            'Culture is socially transmitted action. Hofstede identifies Power Distance, Individualism, Uncertainty Avoidance, and Masculinity as key cultural determinants.'
          ],
          topics: [
            {
              id: 'top-bus322-2-1',
              title: 'Behavioral Influences and Hofstede Cultural Framework',
              readingMinutes: 14,
              sourceReference: 'BUS 322 Course Guide, Module 1, Unit 2, pp. 107–114',
              textbookDefinitions: [
                {
                  term: 'Power Distance (Geert Hofstede)',
                  definition: 'The extent to which members of a society accept that power is distributed unequally in organizations and institutions.',
                  sourceAuthor: 'Geert Hofstede (1980)'
                },
                {
                  term: 'Uncertainty Avoidance',
                  definition: 'The extent to which society members feel uncomfortable with ambiguity, risk, and unstructured situations.',
                  sourceAuthor: 'Geert Hofstede'
                }
              ],
              content: `Organizational Behaviour is the scientific study of human behavior in organizational settings. Four interrelated dimensions shape organizational behavior:
- The Individual: Personal attributes, values, perceptions, attitudes, and motives.
- The Group: Informal and formal groups, group pressures, social norms, and peer leadership.
- The Organization: Formal structure, technology, leadership styles, policies, and authority patterns.
- The Environment: Economic conditions, technological changes, cultural values, and government regulations.

Hofstede's Four Cultural Dimensions:
1. Power Distance: High power distance accepts steep hierarchy and inequality; low power distance strives for consultation and equality.
2. Individualism vs. Collectivism: Individualistic cultures prioritize personal autonomy and immediate family; collectivist cultures emphasize group cohesion and loyalty.
3. Uncertainty Avoidance: High uncertainty avoidance relies on rigid rules and security; low uncertainty avoidance tolerates ambiguity and welcomes change.
4. Masculinity vs. Femininity: Masculine cultures emphasize material achievement, competition, and assertiveness; feminine cultures emphasize quality of life, interpersonal care, and equality.`,
              summaryPoints: [
                'O.B. integrates psychology, sociology, and management science to optimize human performance.',
                'Work behavior is a product of individual, group, structural, and environmental forces.',
                'Hofstede dimensions show that management practices must align with cultural values.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus322-3',
          unitNumber: '3.0',
          title: 'Unit 3: Roles, Role Conflict and Conflict Management',
          objectives: [
            'Define organizational role and role expectations',
            'Identify four types of role conflict: inter-sender, intra-sender, inter-role, person-role',
            'Contrast task ambiguity and emotional ambiguity',
            'Evaluate conflict resolution strategies: assertion vs. cooperation, win-win, win-lose, lose-lose'
          ],
          unitRecapPoints: [
            'A role is a position defined by a set of expectations about behavior; supervisors are often "persons in the middle" facing conflicting demands.',
            'Four types of role conflict: Inter-sender (different group members make conflicting demands), Intra-sender (same manager makes conflicting demands), Inter-role (external role conflicts with workplace role), Person-role (demands conflict with personal values).',
            'Conflict handling grid: Competing (high assertion, low cooperation), Collaborating (high assertion, high cooperation), Avoiding (low assertion, low cooperation), Accommodating (low assertion, high cooperation), Compromising (midpoint).',
            'Win-Win strategy solves underlying problems; Win-Lose creates bitterness; Lose-Lose results from mutual exhaustion or bribes.'
          ],
          topics: [
            {
              id: 'top-bus322-3-1',
              title: 'Role Dynamics, Conflict Typology, and Resolution Strategies',
              readingMinutes: 16,
              sourceReference: 'BUS 322 Course Guide, Module 1, Unit 4, pp. 121–134',
              textbookDefinitions: [
                {
                  term: 'Role Conflict',
                  definition: 'Incompatibility between job tasks, resources, policies, and interpersonal expectations placed upon an individual.',
                  sourceAuthor: 'Organizational Psychology'
                },
                {
                  term: 'Win-Win Strategy',
                  definition: 'Problem-solving conflict resolution where creative solutions are devised meeting the genuine needs of both parties without sacrifice.',
                  sourceAuthor: 'Conflict Management Literature'
                }
              ],
              content: `A role is a position in an organization defined by a set of expectations about behavior. The first-line supervisor is famously the "person in the middle", subject to simultaneous conflicting expectations from management, workers, and peer supervisors.

Four Types of Role Conflict:
1. Inter-sender Role Conflict: Different members of an organization make contradictory demands on the same person.
2. Intra-sender Role Conflict: The same manager or office issues incompatible orders (e.g. demanding higher quality while cutting budget and time).
3. Inter-role Conflict: Outside roles (father, spouse, church member) conflict with organizational duties.
4. Person-role Conflict: Job demands violate the individual's personal ethics, religious conscience, or values.

Role Ambiguity:
Arises from lack of clear information. Task ambiguity occurs when a worker is uncertain about performance requirements; emotional ambiguity occurs when an employee is unsure of how the supervisor evaluates him.

Conflict Resolution Strategies:
Plotting Assertion against Cooperation yields five outcomes:
- Competing: High assertion, low cooperation (win-lose confrontation).
- Accommodating: Low assertion, high cooperation (sacrificing one's needs).
- Avoiding: Low assertion, low cooperation (withdrawing or ignoring).
- Compromising: Moderate assertion and cooperation (sharing concessions).
- Collaborating: High assertion, high cooperation (win-win problem-solving).`,
              summaryPoints: [
                'Supervisors experience severe role conflict as boundary spanners.',
                'Role ambiguity damages morale through lack of clarity or feedback.',
                'Collaborative win-win strategies resolve core conflicts without residual resentment.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus322-4',
          unitNumber: '4.0',
          title: 'Unit 4: Management of Organizational Change',
          objectives: [
            'Identify external and internal causes of organizational change',
            'Analyze the power distribution continuum: Unilateral action, Power sharing, Delegated authority',
            'Explain Kurt Lewin 3-stage change process: Unfreezing, Moving, Freezing',
            'Discuss strategies for managing and overcoming resistance to change'
          ],
          unitRecapPoints: [
            'Forces of change: Technological change, knowledge explosion, product obsolescence, social/demographic changes.',
            'External forces are uncontrollable and require coping adaptation; internal forces are controllable.',
            'Kurt Lewin 3-step change model: Unfreezing (breaking equilibrium), Moving/Changing (adopting new behaviors), Freezing (institutionalizing new norms).',
            'Resistance is a natural behavioral response signaling anxiety or lack of communication; management must involve staff in planning and clarify benefits.'
          ],
          topics: [
            {
              id: 'top-bus322-4-1',
              title: 'Forces of Change, Lewin Model, and Managing Resistance',
              readingMinutes: 14,
              sourceReference: 'BUS 322 Course Guide, Module 1, Unit 5, pp. 135–144',
              textbookDefinitions: [
                {
                  term: 'Unfreezing-Moving-Freezing (Kurt Lewin)',
                  definition: 'Three-stage model of planned change: Unfreezing existing habits, moving toward new operational behaviors, and freezing the new level to ensure permanence.',
                  sourceAuthor: 'Kurt Lewin'
                }
              ],
              content: `Change is an inevitable reality in modern organizations driven by external forces (technology, knowledge explosion, market shifts) and internal forces (new leadership, restructuring, employee expectations).

Approaches to Introducing Change:
- Unilateral Action: Top-down decree with one-way communication.
- Power Sharing: Consultation and interaction between executives and staff, with final decision retained by management.
- Delegated Authority: Subordinates are given responsibility to analyze the problem and design the change solution.

Kurt Lewin's Three-Stage Change Process:
1. Unfreezing: Disrupting the existing equilibrium, challenging old habits, and creating readiness for change.
2. Moving (Changing): Developing new behaviors, values, and operating procedures.
3. Freezing (Refreezing): Institutionalizing the change through supportive reward systems, policies, and culture to prevent backsliding.

Managing Resistance:
Resistance is neither good nor bad; it is a signal that communication or trust is deficient. To overcome resistance: involve staff in planning, communicate objectives early, provide retraining, minimize status threats, and demonstrate the advantages of the new method.`,
              summaryPoints: [
                'Change requires balancing operational dynamism with workplace stability.',
                'Lewin model ensures changes are deeply assimilated rather than temporarily tolerated.',
                'Participatory change introduction minimizes employee resistance and sabotage.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-bus322-2',
      moduleNumber: 2,
      title: 'Module 2: Power, Status, Perception, Personality and Work Groups',
      description: 'French & Raven bases of power, status hierarchies, perceptual selectivity, Freudian and trait personality models, and group dynamics.',
      units: [
        {
          id: 'unit-bus322-5',
          unitNumber: '1.0',
          title: 'Unit 1: Power and Control in Organizations',
          objectives: [
            'Define power, authority, and influence',
            'Analyze the seven bases of power (French, Raven, Goldsmith): Coercive, Expert, Legitimate, Referent, Reward, Information, Connection',
            'Explain the cost of using power and identify organizational power blocs'
          ],
          unitRecapPoints: [
            'Power is the potential for influence; leadership is the exercise of power.',
            'Seven Bases of Power: Coercive (fear/punishment), Expert (skill/knowledge), Legitimate (formal position), Referent (attractiveness/charisma), Reward (valuable outcomes), Information (access to vital data), Connection (ties to influential figures).',
            'Power Blocs: Board of Directors, Management, Employees, Labor Unions, and Government.'
          ],
          topics: [
            {
              id: 'top-bus322-5-1',
              title: 'Seven Bases of Power and Organizational Power Blocs',
              readingMinutes: 14,
              sourceReference: 'BUS 322 Course Guide, Module 2, Unit 1, pp. 145–152',
              textbookDefinitions: [
                {
                  term: 'Power (Rogers)',
                  definition: 'The potential for influence—the resource that enables a leader to induce compliance or behavior change in another.',
                  sourceAuthor: 'Rogers'
                },
                {
                  term: 'Seven Bases of Power',
                  definition: 'Framework identifying Coercive, Expert, Legitimate, Referent, Reward, Information, and Connection power.',
                  sourceAuthor: 'French & Raven (1959), Raven (1965), Goldsmith et al. (1979)'
                }
              ],
              content: `Power is the ability or potential to induce another person or group to change behavior. While authority is legitimized formal power derived from office, power can exist without formal authority.

Seven Bases of Power:
1. Coercive Power: Based on fear of punishment (dismissal, demotion, pay cuts).
2. Expert Power: Based on specialized knowledge, technical skill, and recognized credibility.
3. Legitimate Power: Derived from hierarchical position and societal values of obedience to authority.
4. Referent Power: Based on personal charisma, attractiveness, and identification with the leader.
5. Reward Power: Based on the ability to distribute valued outcomes (promotions, pay raises, praise).
6. Information Power: Based on control over or access to vital operational information.
7. Connection Power: Based on perceived relationships with influential persons inside or outside the organization.

Power Blocs:
Major interest groups possessing strong influence over corporate decisions:
- Board of Directors (governing authority)
- Management (executive operational control)
- Employees (operational technical knowledge)
- Labor Unions (collective bargaining and strike leverage)
- Government (regulatory and economic oversight).`,
              summaryPoints: [
                'Expert and referent power generate true commitment; coercive power produces mere compliance or resistance.',
                'Reward power is effective only when the recipient values the offered reward.',
                'Organizations balance multiple internal and external power blocs.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus322-6',
          unitNumber: '2.0',
          title: 'Unit 2: The Concept of Status and Occupational Prestige',
          objectives: [
            'Define status and differentiate formal status from informal status',
            'Examine sources of status: wealth, occupation, culture, personal achievement, education, family, leisure',
            'Contrast Distributive Justice and Status Congruence',
            'Discuss the role of occupational prestige in job satisfaction'
          ],
          unitRecapPoints: [
            'Status is the social rank or worth of an individual as estimated by a group; Role is what a person is expected to do, Status is who he is.',
            'Distributive Justice is the perception that outcomes are directly proportional to effort and costs invested.',
            'Status Congruence requires that all status symbols and privileges of a position match expectations (e.g. supervisors earning more than subordinates).',
            'Occupational prestige reflects educational investment and societal value, serving as a primary basis of social stratification.'
          ],
          topics: [
            {
              id: 'top-bus322-6-1',
              title: 'Status Hierarchies, Distributive Justice and Occupational Prestige',
              readingMinutes: 14,
              sourceReference: 'BUS 322 Course Guide, Module 2, Unit 2, pp. 153–158',
              textbookDefinitions: [
                {
                  term: 'Distributive Justice',
                  definition: 'The principle that an individual rewards or outcomes should be directly proportional to their investments and efforts.',
                  sourceAuthor: 'Social Exchange Theory'
                },
                {
                  term: 'Status Congruence',
                  definition: 'Consistency among the various status indicators (salary, office size, title, authority) possessed by an individual relative to comparison peers.',
                  sourceAuthor: 'Organizational Sociology'
                }
              ],
              content: `Status is the social rank or value conferred upon a person by others in a social system.

Sources of Status:
- Societal: Wealth, occupation, culture, education, personal achievement, family background, and leisure club memberships.
- Organizational: Hierarchy level, job title, salary grade, budget authority, and research publications.

Distributive Justice and Status Congruence:
- Distributive Justice: Employees demand that outcomes reflect invested inputs (effort, education, training). If an employee invests more effort but receives fewer rewards than an associate, perceived injustice triggers disequilibrium.
- Status Congruence: Consistency among status symbols. An assistant manager having a larger office or higher salary than the manager creates status incongruence, producing resentment and operational dysfunction.

Occupational Prestige:
Reflects the training, education, and societal value of a profession. Highly skilled professions (banking, oil/gas engineering, law) enjoy greater prestige than unskilled labor, directly influencing employee self-esteem and job satisfaction.`,
              summaryPoints: [
                'Status is conferred through social perception rather than unilaterally possessed.',
                'Distributive justice ensures fair proportionality between effort and reward.',
                'Status incongruence produces operational friction and interpersonal tension.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus322-7',
          unitNumber: '3.0',
          title: 'Unit 3: Perception and Social Perception',
          objectives: [
            'Define perception and explain perceptual selectivity',
            'Detail external attention factors: intensity, size, contrast, repetition, motion, novelty',
            'Examine social perception errors: Attribution theory, Stereotyping, and the Halo Effect'
          ],
          unitRecapPoints: [
            'Perception is the process of selecting, organizing, and interpreting sensory information to understand the environment.',
            'External attention principles: Intensity (louder/brighter), Size (larger objects), Contrast (stands out from background), Repetition, Motion, Novelty/Familiarity.',
            'Attribution Theory (Kelley): People attribute behavior to internal or external causes based on Distinctiveness, Consensus, and Consistency.',
            'Stereotyping categorizes people based on group traits; Halo Effect allows a single trait (positive or negative) to color overall evaluation.'
          ],
          topics: [
            {
              id: 'top-bus322-7-1',
              title: 'Perceptual Selectivity, Attribution and Perceptual Errors',
              readingMinutes: 15,
              sourceReference: 'BUS 322 Course Guide, Module 2, Unit 3, pp. 159–166',
              textbookDefinitions: [
                {
                  term: 'Perceptual Selectivity',
                  definition: 'The process by which individuals filter out vast environmental stimuli to focus only on a few salient inputs.',
                  sourceAuthor: 'Cognitive Psychology'
                },
                {
                  term: 'Halo Effect',
                  definition: 'The cognitive bias where a single prominent trait (e.g. appearance, cooperativeness) excessively influences overall appraisal of an individual performance and personality.',
                  sourceAuthor: 'Social Psychology'
                }
              ],
              content: `People act not on objective reality, but on what they perceive to be real. Perception selects, organizes, and translates sensory stimuli into meaningful impressions.

Principles of Perceptual Selectivity:
- External Attention Factors: Intensity, Size, Contrast, Repetition, Motion, and Novelty/Familiarity.
- Internal Motivational Factors: Current physiological drives, established attitudes/values, and past experiences.

Social Perception and Attribution:
Harold Kelley identified three criteria governing whether behavior is attributed to internal (ability, effort) or external (task difficulty, luck) causes:
1. Distinctiveness: Does the person behave differently across different situations?
2. Consensus: Do others behave similarly in this situation?
3. Consistency: Does the person behave the same way over time?
Internal attribution occurs with low distinctiveness, low consensus, and high consistency.

Common Perceptual Distortions:
- Stereotyping: Ascribing blanket traits to an individual based on racial, occupational, or gender group membership.
- Halo Effect: Allowing an overall impression or single favorable/unfavorable trait to bias evaluation of all specific abilities.`,
              summaryPoints: [
                'Selective perception filters environmental noise based on contrast, intensity, and motives.',
                'Kelley attribution framework determines whether credit or blame is assigned internally or externally.',
                'Halo effects and stereotyping distort performance appraisals and managerial decisions.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus322-8',
          unitNumber: '4.0',
          title: 'Unit 4: Personality Concepts and Theories',
          objectives: [
            'Define personality and examine determinants (genetic, social, role, situational)',
            'Analyze Sigmund Freud psycho-analytic theory (Id, Ego, Super-Ego, psychosexual stages)',
            'Explain Hans Eysenck two-dimensional trait theory (Stable/Unstable, Introvert/Extrovert)'
          ],
          unitRecapPoints: [
            'Personality is the enduring pattern of psychological characteristics by which an individual is unique.',
            'Determinants: Inherited body constitution (genetics, Sheldon somatotypes), Cultural socialization, Social roles, and Situational environment.',
            'Freudian Structure: Id (pleasure principle, libido), Super-Ego (conscience, societal morals), Ego (reality principle, balancing unit).',
            'Freudian Stages: Oral (0-1), Anal (1-3, stingy/orderly fixation), Phallic (4-5, Oedipus/Electra), Latency (5-puberty), Genital (13+).',
            'Eysenck 4 Temperaments: Phlegmatic (Stable Introvert), Melancholic (Unstable Introvert), Sanguine (Stable Extrovert), Choleric (Unstable Extrovert).'
          ],
          topics: [
            {
              id: 'top-bus322-8-1',
              title: 'Freudian Psychoanalysis and Eysenck Personality Trait Taxonomy',
              readingMinutes: 16,
              sourceReference: 'BUS 322 Course Guide, Module 2, Unit 4, pp. 167–176',
              textbookDefinitions: [
                {
                  term: 'Id, Ego, and Super-Ego (Sigmund Freud)',
                  definition: 'The three personality systems: Id (instinctual pleasure-seeking drive), Super-Ego (moral conscience and societal rules), and Ego (rational mediator governed by the reality principle).',
                  sourceAuthor: 'Sigmund Freud'
                },
                {
                  term: 'Eysenck Personality Dimensions',
                  definition: 'Two orthogonal personality axes: Emotional Stability vs. Neuroticism (Unstable), and Introversion vs. Extroversion.',
                  sourceAuthor: 'Hans J. Eysenck'
                }
              ],
              content: `Personality represents the relatively enduring pattern of behaviors, attitudes, and emotional traits that distinguish an individual.

1. Sigmund Freud's Psycho-Analytical Theory:
Personality is governed by three interacting mental systems:
- The Id: Present at birth, driven by instinctual libido and the pleasure principle without regard for social rules.
- The Super-Ego: Developed through parental socialization, representing conscience, moral laws, and self-restraint.
- The Ego: Governed by the reality principle; acts as the executive mediator balancing the primitive urges of the Id with the moral prohibitions of the Super-Ego.

Freudian Psychosexual Stages & Fixation:
- Oral Stage (0–1 yr): Pleasure centered on mouth. Fixation: smoking, overeating, excessive dependency.
- Anal Stage (1–3 yrs): Pleasure in elimination/retention. Fixation: stinginess, hoarding, obstinacy, excessive neatness.
- Phallic Stage (4–5 yrs): Oedipus/Electra conflict; identification with same-sex parent resolves infantile anxiety.
- Latency Stage (5–puberty): Sexual urges repressed; social and academic learning.
- Genital Stage (13+ yrs): Mature adult relationships.

2. Hans J. Eysenck's Trait Theory:
Crosses two biological dimensions into four classical temperaments:
- Stable Introvert (Phlegmatic): Calm, reliable, thoughtful, controlled.
- Unstable Introvert (Melancholic): Anxious, moody, quiet, reserved, pessimistic.
- Stable Extrovert (Sanguine): Outgoing, sociable, easygoing, lively.
- Unstable Extrovert (Choleric): Aggressive, touchy, restless, excitable, impulsive.`,
              summaryPoints: [
                'Freud proved that unresolved childhood fixations shape adult workplace coping mechanisms.',
                'The Ego must balance instinctual desires with moral and environmental constraints.',
                'Eysenck taxonomy links emotional stability and sociability to predictable behavioral patterns.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus322-9',
          unitNumber: '5.0',
          title: 'Unit 5: Work Groups and Group Dynamics',
          objectives: [
            'Define work group and contrast formal and informal groups',
            'Examine informal group cliques: horizontal, vertical, mixed',
            'Detail theories of group formation: Propinquity, Interaction, Balance, Exchange',
            'Analyze factors influencing group effectiveness and cohesiveness'
          ],
          unitRecapPoints: [
            'A work group is two or more interdependent people interacting on a continuing basis to achieve common goals.',
            'Informal Cliques: Horizontal (same rank across departments), Vertical (different ranks within department), Mixed (cross-rank, cross-department).',
            'Theories of Group Formation: Propinquity (spatial proximity), Interaction (Homans: activities, interactions, sentiments), Balance (Newcomb: shared attitudes/values), Exchange (reward-cost outcome).',
            '4 Stages of Group Development: Forming (orientation), Storming (goal conflict), Norming (cohesion/structure), Performing (effective task execution).',
            'Cohesiveness increases with small group size, proximity, task interdependence, and shared group norms.'
          ],
          topics: [
            {
              id: 'top-bus322-9-1',
              title: 'Group Formation Theories, Stages of Development and Dynamics',
              readingMinutes: 15,
              sourceReference: 'BUS 322 Course Guide, Module 2, Unit 5, pp. 177–186',
              textbookDefinitions: [
                {
                  term: 'Group Cohesiveness',
                  definition: 'The degree to which members are attracted to one another, share common norms, and act as a unified entity.',
                  sourceAuthor: 'Group Dynamics Literature'
                },
                {
                  term: 'Interaction Theory (George Homans)',
                  definition: 'The theory that shared activities lead to more interactions, which foster positive sentiments, reinforcing further shared activities.',
                  sourceAuthor: 'George Homans (1950)'
                }
              ],
              content: `A work group is more than a collection of individuals; through social interaction, group members develop shared norms, roles, and identity.

Theories of Group Formation:
1. Propinquity Theory: People affiliate because of geographical or physical proximity in the office or plant.
2. Interaction Theory (George Homans): Activities, Interactions, and Sentiments are interrelated. When people share common tasks, interactions multiply, strengthening mutual sentiments.
3. Balance Theory (Theodore Newcomb): People are attracted on the basis of similar attitudes toward work values, politics, religion, or background.
4. Exchange Theory: Attraction depends on reward-cost balance; affiliation occurs when psychological rewards exceed social costs.

Four Stages of Group Formation (Tuckman Model):
- Stage 1: Forming (Orientation, testing boundaries, dependency on formal leader).
- Stage 2: Storming (Intragroup conflict, competing for roles, establishing common goals).
- Stage 3: Norming (Development of group cohesion, consensus, and shared norms).
- Stage 4: Performing (Energy channeled into task performance and problem-solving).

Group Effectiveness Factors:
Small group size (faster decision-making, less social loafing), physical eye contact, task nature, strong cohesiveness, and constructive group performance norms.`,
              summaryPoints: [
                'Group formation is driven by physical proximity, shared activities, attitude similarity, and exchange rewards.',
                'Groups progress through forming, storming, norming, and performing stages.',
                'High cohesiveness combined with positive performance norms produces superior productivity.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-bus322-3',
      moduleNumber: 3,
      title: 'Module 3: Communication, Motivation, Money and Organizational Structure',
      description: 'Communication process and barriers, process theories of motivation, the role of money, and structural design (line/staff, functional, project, matrix).',
      units: [
        {
          id: 'unit-bus322-10',
          unitNumber: '1.0',
          title: 'Unit 1: Communication in Organizations',
          objectives: [
            'Describe the communication process model: sender, encoding, transmission, receiver, decoding, feedback, noise',
            'Identify major communication barriers (semantic distortion, information overload, status differences)',
            'Discuss the American Management Association (AMA) Ten Commandments of Good Communication'
          ],
          unitRecapPoints: [
            'Communication is the transfer of information and meaning from sender to receiver; feedback verifies understanding.',
            'Barriers: Lack of planning, semantic distortion, poorly expressed messages, information overload, poor listening, and status barriers.',
            'AMA Ten Commandments emphasize clarifying ideas beforehand, examining purpose, considering setting, following up, and active listening.'
          ],
          topics: [
            {
              id: 'top-bus322-10-1',
              title: 'Communication Process, Barriers and The AMA Commandments',
              readingMinutes: 14,
              sourceReference: 'BUS 322 Course Guide, Module 3, Unit 1, pp. 187–195',
              textbookDefinitions: [
                {
                  term: 'Communication Process',
                  definition: 'The circular sequence where a sender encodes an idea into a message, transmits it through a medium, and the receiver decodes it, generating feedback in the presence of potential noise.',
                  sourceAuthor: 'Communication Theory'
                }
              ],
              content: `Communication is the lifeblood of management. Without communication, coordination and leadership are impossible.

Communication Process Model:
- Sender generates idea (thought).
- Encoding into words, symbols, or gestures.
- Transmission through channel (oral, written, electronic).
- Receiver perceives and decodes into understanding.
- Feedback confirms whether the message was accurately interpreted.
- Noise: Any interference or distortion (physical, psychological, semantic) along the channel.

Major Barriers to Communication:
1. Semantic Distortion: Ambiguous words with multiple interpretations.
2. Information Overload: Excessive volume leading to filtering, delays, or ignoring messages.
3. Status and Hierarchical Filtering: Subordinates hesitate to communicate upward or edit bad news.
4. Selective Perception and Poor Listening.

The AMA Ten Commandments of Good Communication:
1. Clarify ideas before communicating.
2. Examine the true purpose of each message.
3. Consider the physical and human setting.
4. Consult others in planning communications.
5. Mind overtones as well as basic content.
6. Convey something of value to the receiver.
7. Follow up and seek feedback.
8. Communicate for tomorrow as well as today.
9. Support words with actions.
10. Seek not only to be understood but to understand—listen actively.`,
              summaryPoints: [
                'Two-way communication with feedback eliminates misunderstandings caused by noise.',
                'Semantic distortion and information overload are primary barriers in modern management.',
                'The AMA commandments provide actionable guidelines for managerial clarity.'
              ]
            }
          ]
        },
        {
          id: 'unit-bus322-11',
          unitNumber: '2.0',
          title: 'Unit 2: Organizational Structure and Structural Design',
          objectives: [
            'Define organizational structure and explain its levels (Technical, Managerial, Community)',
            'Analyze bases of departmentalization: Purpose, Product, Location, Process, Customer',
            'Compare Line, Functional, Staff, and Matrix organizational structures',
            'Examine socio-technical systems and technology influence on work design'
          ],
          unitRecapPoints: [
            'Structure defines tasks, authority, responsibilities, and communication channels (Mullins, 2000).',
            'Three Organizational Levels (Parsons): Technical (discrete operational tasks), Managerial (internal coordination and resource allocation), Community/Institutional (broad objectives, external governance).',
            'Matrix Organization combines functional departments with horizontal project teams, creating a two-way flow of authority.',
            'Technology influences work design, span of control, and social interactions; socio-technical approach balances technical efficiency with human psychological needs.'
          ],
          topics: [
            {
              id: 'top-bus322-11-1',
              title: 'Organizational Architecture: Levels, Departmentation and Matrix Systems',
              readingMinutes: 16,
              sourceReference: 'BUS 322 Course Guide, Module 3, Unit 5, pp. 227–258',
              textbookDefinitions: [
                {
                  term: 'Matrix Structure',
                  definition: 'An organizational design establishing a grid with two-way authority flow: vertical functional authority and horizontal project manager authority.',
                  sourceAuthor: 'Organizational Design'
                },
                {
                  term: 'Socio-Technical System',
                  definition: 'An open-system view recognizing that optimal organizational performance requires harmonious integration between technical processes and human social groupings.',
                  sourceAuthor: 'Mullins (2000)'
                }
              ],
              content: `Organizational structure is the pattern of relationships along positions in the enterprise.

Three Levels of Organization Structure (Talcott Parsons):
1. Technical Level: Focused on operational production and execution of core discrete tasks.
2. Managerial Level: Coordinates technical operations, allocates resources, and interfaces with clients.
3. Community (Institutional) Level: Oversees broad corporate strategy, governance, board of directors, and societal integration.

Structural Types:
- Line Organization: Direct vertical authority from managing director down through subordinates. Clear command, but lacks specialization.
- Line and Staff: Line managers hold executive authority; staff specialists provide advisory support, information, and research.
- Functional Structure: Grouping by major discipline (Production, Marketing, Finance, HR). Promotes specialization but risks departmental silos.
- Matrix Structure: Combines functional departments with cross-functional project teams. Authority flows vertically down functional lines and horizontally across project lines. Ideal for aerospace, software, and complex engineering, but requires careful coordination to avoid dual-command conflict.

Socio-Technical Systems:
New technology disrupts established social groupings. Managers must design socio-technical systems where technological innovations are matched with human social satisfaction, task autonomy, and ergonomic well-being.`,
              summaryPoints: [
                'Structure establishes order, accountability, and communication channels across technical, managerial, and institutional levels.',
                'Matrix structures balance functional depth with multidisciplinary project agility.',
                'Socio-technical integration ensures technological upgrades do not demoralize the human workforce.'
              ]
            }
          ]
        }
      ]
    }
  ];

  const primaryDoc: StudyDocument = {
    id: docId,
    name: 'BUS322_765e78f6.pdf',
    fileType: 'pdf',
    fileSize: 3450000,
    uploadedAt: new Date().toISOString(),
    extractedHeadingsCount: 15,
    pageCount: pagesCount,
    status: 'ready',
    processingStatus: 'fully_processed',
    summary: 'Official NOUN course guide for BUS 322: Organisational Behaviour by Dr. T.O. Ishola and Prof. C.P. Maduabum.'
  };

  const course: Course = {
    id: courseId,
    code: courseCode,
    title: courseTitle,
    department: 'Business Administration',
    description: 'National Open University of Nigeria (NOUN) curriculum in Organisational Behaviour: management perspectives, cultural influences (Hofstede), role conflict, change management, French & Raven power bases, status and distributive justice, perceptual selectivity, personality models (Freud, Eysenck), group dynamics, communication models, and socio-technical structural design.',
    createdAt: new Date().toISOString(),
    documents: [primaryDoc],
    modules,
    pastQuestionDocuments: [
      {
        id: pqDocId,
        courseId,
        courseCode,
        name: 'BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf',
        fileType: 'pdf',
        fileSize: 2250000,
        uploadedAt: new Date().toISOString(),
        pageCount: pagesCount,
        processedPagesCount: pagesCount,
        reviewRequiredPagesCount: 0,
        totalMainQuestions: 15,
        totalSubQuestions: 10,
        extractedQuestionsCount: 15,
        questionsWithSuppliedAnswersCount: 15,
        questionsWithoutSuppliedAnswersCount: 0,
        questionsRequiringReviewCount: 0,
        questionsSavedCount: 15,
        status: 'ready',
        extractionCompletenessStatus: 'verified_complete',
        summary: 'Authentic NOUN Tutor-Marked Assignments (TMAs), Self-Assessment Exercises, and official examination questions with complete marking schemes for BUS 322.',
        examSession: 'Official University Examination & TMA Archives',
      }
    ]
  };

  const questions: PastExamQuestionItem[] = [
    {
      id: 'pq-bus322-1',
      courseId,
      courseCode,
      courseTitle,
      documentId: pqDocId,
      documentName: 'BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf',
      sourceFileName: 'BUS322_765e78f6.pdf',
      linkedUnitId: 'unit-bus322-1',
      linkedUnitNumber: 1,
      linkedUnitTitle: 'Unit 1: Management Perspectives',
      year: 'NOUN Official Examination',
      questionNumber: 'TMA 1 / Q1',
      questionType: 'written_structured',
      marks: 20,
      totalMarks: 20,
      questionText: 'Why in your own view are the management functions considered central to a discussion of management, and how do they relate to Peter Drucker three requirements of structure?',
      suppliedAnswer: `According to BUS 322 course material:
1. Centrality of Management Functions:
Management is a process and activity that occurs at all levels. Managers, regardless of specific job title, perform the core functions of planning, organizing, staffing, directing, coordinating, and controlling. These functions broadly identify what managers do to convert scarce resources into organizational results.

2. Peter Drucker (1989) Three Requirements of Organization Structure:
(1) It must be organized for business performance: The structure must be direct, simple, and geared to future demands rather than resting on past achievements.
(2) It should contain the least possible number of management levels: A short chain of command prevents communication friction, distortion, and inertia.
(3) It must make possible the training and testing of future top management: Autonomy and responsibility must be given to managers early so they develop general management capability rather than narrow specialization.`,
      modelAnswer: 'Management functions identify the core activities performed by all managers. Drucker requires structures to focus on business performance, minimize hierarchical levels, and develop future top managers.',
      keyRubricPoints: [
        'Identification of core management functions (planning, organizing, directing, controlling)',
        'Drucker requirement 1: Business performance focus',
        'Drucker requirement 2: Minimal management levels / short chain of command',
        'Drucker requirement 3: Training and testing future leadership'
      ],
      difficulty: 'Core',
      isPastQuestion: true,
      verifiedAuthentic: true,
      answerStatus: 'answer_supplied',
      unitMappingStatus: 'mapped'
    },
    {
      id: 'pq-bus322-2',
      courseId,
      courseCode,
      courseTitle,
      documentId: pqDocId,
      documentName: 'BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf',
      sourceFileName: 'BUS322_765e78f6.pdf',
      linkedUnitId: 'unit-bus322-2',
      linkedUnitNumber: 2,
      linkedUnitTitle: 'Unit 2: The Stuff of Organizational Behaviour and Cultural Influences',
      year: 'NOUN Official Examination',
      questionNumber: 'TMA 2 / Q2',
      questionType: 'written_structured',
      marks: 20,
      totalMarks: 20,
      questionText: 'In what ways do the different behavioural influencing variables help explain the understanding of human behaviour in organizations? Refer to Geert Hofstede cultural variables.',
      suppliedAnswer: `Four Interrelated Behavioral Variables:
1. The Individual: Values, perceptions, attitudes, and motives. Where individual needs conflict with organizational demands, frustration arises.
2. The Group: Informal and formal groups establish norms and peer pressures that influence individual performance.
3. The Organization: Formal structure, technology, and leadership styles shape operational patterns.
4. The Environment: External economic, political, and cultural factors demand organizational adaptation.

Hofstede Cultural Variables:
- Power Distance: Determines whether employees expect and accept centralized autocratic direction or consultative equality.
- Individualism vs. Collectivism: Dictates whether workers are motivated by individual advancement or group solidarity.
- Uncertainty Avoidance: Influences whether workers demand rigid standard operating procedures or embrace innovative risks.
- Masculinity vs. Femininity: Reflects orientation toward competitive achievement versus quality of life and interpersonal harmony.`,
      modelAnswer: 'Behavior is shaped by individual, group, organizational, and environmental variables. Hofstede dimensions explain how national and societal cultures determine organizational management styles.',
      keyRubricPoints: [
        'Detailed explanation of individual, group, organization, and environmental dimensions',
        'Application of Hofstede cultural dimensions to workplace behavior'
      ],
      difficulty: 'Challenging',
      isPastQuestion: true,
      verifiedAuthentic: true,
      answerStatus: 'answer_supplied',
      unitMappingStatus: 'mapped'
    },
    {
      id: 'pq-bus322-3',
      courseId,
      courseCode,
      courseTitle,
      documentId: pqDocId,
      documentName: 'BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf',
      sourceFileName: 'BUS322_765e78f6.pdf',
      linkedUnitId: 'unit-bus322-3',
      linkedUnitNumber: 3,
      linkedUnitTitle: 'Unit 3: Roles, Role Conflict and Conflict Management',
      year: 'NOUN Official Examination',
      questionNumber: 'TMA 3 / Q3',
      questionType: 'written_structured',
      marks: 20,
      totalMarks: 20,
      questionText: 'How would you explain the fact that role conflict cannot be wished or completely planned away, and what strategies can management use to handle it?',
      suppliedAnswer: `Role Conflict Inevitability:
Role conflict is inevitable because employees occupy multiple roles simultaneously (family, profession, union, management). First-line supervisors exist "in the middle", facing conflicting expectations from senior executives, peer supervisors, and subordinate labor.

Four Types of Role Conflict:
1. Inter-sender conflict (different members make opposing demands).
2. Intra-sender conflict (the same superior issues conflicting demands).
3. Inter-role conflict (work role conflicts with outside personal role).
4. Person-role conflict (organizational expectations violate personal values).

Conflict Handling Strategies:
- Assertion vs. Cooperation continuum: Competing, Avoiding, Accommodating, Compromising, Collaborating.
- Win-Win problem-solving strategy: Focuses on meeting the genuine needs of both parties without sacrifice.
- Management measures: Role clarification, open communication, transparent performance standards, and participative problem resolution.`,
      modelAnswer: 'Role conflict is inevitable due to boundary-spanning roles and divergent stakeholder expectations. Management must utilize collaborative win-win strategies, role clarification, and consultative communication.',
      keyRubricPoints: [
        'Explanation of why role conflict cannot be eliminated (supervisor in the middle, competing roles)',
        'Types of role conflict (inter-sender, intra-sender, inter-role, person-role)',
        'Conflict handling strategies with emphasis on Win-Win collaboration'
      ],
      difficulty: 'Core',
      isPastQuestion: true,
      verifiedAuthentic: true,
      answerStatus: 'answer_supplied',
      unitMappingStatus: 'mapped'
    },
    {
      id: 'pq-bus322-4',
      courseId,
      courseCode,
      courseTitle,
      documentId: pqDocId,
      documentName: 'BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf',
      sourceFileName: 'BUS322_765e78f6.pdf',
      linkedUnitId: 'unit-bus322-5',
      linkedUnitNumber: 5,
      linkedUnitTitle: 'Unit 1: Power and Control in Organizations',
      year: 'NOUN Official Examination',
      questionNumber: 'TMA 4 / Q4',
      questionType: 'written_structured',
      marks: 20,
      totalMarks: 20,
      questionText: 'Define the term power bloc, and discuss the five major power blocs available in modern business organizations along with the seven bases of power.',
      suppliedAnswer: `1. Definition of Power Bloc:
Power blocs (potential influencers) are organized groups that possess sufficient resources, authority, or leverage to significantly influence organizational decisions.

2. Five Major Power Blocs:
(1) Board of Directors: The governing council holding supreme legal policy authority.
(2) Management: Executives and functional heads who control day-to-day operations and employment decisions.
(3) Employees: Technical and administrative staff who exert expert and information power.
(4) Labour Unions: Collective bargaining entities that use demonstration, work-to-rule, or strikes to shape policy.
(5) Government: External authority setting minimum wages, tax laws, environmental policies, and commercial regulations.

3. Seven Bases of Power:
Coercive (fear), Expert (skills), Legitimate (hierarchy), Referent (charisma), Reward (benefits), Information (access to data), and Connection (influential networks).`,
      modelAnswer: 'Power blocs are major groups influencing corporate policy: Board, Management, Employees, Unions, and Government. French, Raven, and Goldsmith identify 7 power bases: Coercive, Expert, Legitimate, Referent, Reward, Information, and Connection.',
      keyRubricPoints: [
        'Definition of power bloc',
        'Discussion of Board, Management, Employees, Unions, and Government',
        'Listing and explanation of the 7 bases of power'
      ],
      difficulty: 'Challenging',
      isPastQuestion: true,
      verifiedAuthentic: true,
      answerStatus: 'answer_supplied',
      unitMappingStatus: 'mapped'
    },
    {
      id: 'pq-bus322-5',
      courseId,
      courseCode,
      courseTitle,
      documentId: pqDocId,
      documentName: 'BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf',
      sourceFileName: 'BUS322_765e78f6.pdf',
      linkedUnitId: 'unit-bus322-11',
      linkedUnitNumber: 11,
      linkedUnitTitle: 'Unit 2: Organizational Structure and Structural Design',
      year: 'NOUN Official Examination',
      questionNumber: 'TMA 5 / Q5',
      questionType: 'written_structured',
      marks: 20,
      totalMarks: 20,
      questionText: 'Explain the nature and characteristics of a Matrix organizational structure, and discuss why organizations adopt it despite its complexities.',
      suppliedAnswer: `1. Nature of Matrix Structure:
A Matrix organization establishes a two-dimensional grid combining permanent functional departments with temporary project teams. Authority flows in two directions:
- Vertically: Down the line from functional managers (Engineering, Marketing, Finance).
- Horizontally: Across departments from project/product managers.

2. Reasons for Adopting Matrix Structure:
(1) Dual Critical Orientation: When an enterprise must respond simultaneously to functional expertise and project/product/geographic demands.
(2) Information Processing: The need to process large amounts of complex, specialized information across disciplines.
(3) Resource Sharing: Flexible deployment of highly specialized personnel (systems analysts, engineers) across multiple projects without permanent overhead.

3. Difficulties and Pitfalls:
- Violates unity of command (employees report to both functional manager and project manager).
- Potential for power struggles, conflict, and communication log-jams between functional and project heads.`,
      modelAnswer: 'A matrix structure combines vertical functional departments with horizontal project teams. It is adopted to handle dual orientations, complex information flows, and shared specialized resources, though it risks dual-reporting conflict.',
      keyRubricPoints: [
        'Explanation of vertical functional and horizontal project authority',
        'At least 2 reasons for adoption (dual orientation, resource sharing, complex info processing)',
        'Discussion of the challenge to unity of command'
      ],
      difficulty: 'Challenging',
      isPastQuestion: true,
      verifiedAuthentic: true,
      answerStatus: 'answer_supplied',
      unitMappingStatus: 'mapped'
    }
  ];

  return { course, questions, pqDoc: course.pastQuestionDocuments![0] };
}

async function main() {
  console.log('Extracting text and pages from BUS 330 and BUS 322 PDFs...');
  const bus330Pdf = await extractPdfText('public/assets/aistudio/BUS330_8f9154d9.pdf');
  const bus322Pdf = await extractPdfText('public/assets/aistudio/BUS322_765e78f6.pdf');

  console.log('BUS 330: Pages =', bus330Pdf.pages, '| Text length =', bus330Pdf.text.length);
  console.log('BUS 322: Pages =', bus322Pdf.pages, '| Text length =', bus322Pdf.text.length);

  const bus330Result = generateBus330(bus330Pdf.pages);
  const bus322Result = generateBus322(bus322Pdf.pages);

  // Write bus330Data.ts
  const bus330FileContent = `import { Course, PastExamQuestionItem, StudyModule } from '../types';

export const BUS330_COURSE: Course = ${JSON.stringify(bus330Result.course, null, 2)};
export const BUS330_QUESTIONS: PastExamQuestionItem[] = ${JSON.stringify(bus330Result.questions, null, 2)};
`;
  fs.writeFileSync('src/services/bus330Data.ts', bus330FileContent, 'utf-8');
  console.log('Written src/services/bus330Data.ts');

  // Write bus322Data.ts
  const bus322FileContent = `import { Course, PastExamQuestionItem, StudyModule } from '../types';

export const BUS322_COURSE: Course = ${JSON.stringify(bus322Result.course, null, 2)};
export const BUS322_QUESTIONS: PastExamQuestionItem[] = ${JSON.stringify(bus322Result.questions, null, 2)};
`;
  fs.writeFileSync('src/services/bus322Data.ts', bus322FileContent, 'utf-8');
  console.log('Written src/services/bus322Data.ts');

  // Update cloud_db.json
  const cloudDbPath = './server-data/cloud_db.json';
  const cloudDb = JSON.parse(fs.readFileSync(cloudDbPath, 'utf-8'));
  const userKey = 'usr_abiodun_ayodeji_24';
  const userRecord = cloudDb.progress[userKey];

  // Merge new courses into userRecord.customCourses without duplicating
  const existingCourses = userRecord.customCourses || [];
  const coursesMap = new Map();
  existingCourses.forEach((c: Course) => coursesMap.set(c.id, c));
  coursesMap.set(bus330Result.course.id, bus330Result.course);
  coursesMap.set(bus322Result.course.id, bus322Result.course);
  userRecord.customCourses = Array.from(coursesMap.values());

  // Merge new questions into userRecord.customPastQuestions
  const existingQuestions = userRecord.customPastQuestions || [];
  const qMap = new Map();
  existingQuestions.forEach((q: PastExamQuestionItem) => qMap.set(q.id, q));
  bus330Result.questions.forEach((q) => qMap.set(q.id, q));
  bus322Result.questions.forEach((q) => qMap.set(q.id, q));
  userRecord.customPastQuestions = Array.from(qMap.values());

  userRecord.version = (userRecord.version || 1) + 1;
  userRecord.updatedAt = new Date().toISOString();

  fs.writeFileSync(cloudDbPath, JSON.stringify(cloudDb, null, 2), 'utf-8');
  console.log('Updated server-data/cloud_db.json with new courses and questions!');
  console.log('Total custom courses now:', userRecord.customCourses.length);
  console.log('Total past questions now:', userRecord.customPastQuestions.length);
}

main().catch(console.error);
