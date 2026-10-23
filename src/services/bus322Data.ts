import { Course, PastExamQuestionItem, PastQuestionDocument, StudyModule } from '../types';
import { BUS322_UPLOADED_PQ_DOCUMENTS } from './bus322PastQuestionsData';

export { BUS322_UPLOADED_PQ_DOCUMENTS } from './bus322PastQuestionsData';

export const BUS322_COURSE: Course = {
  "id": "course-bus322",
  "code": "BUS 322",
  "title": "Organisational Behaviour",
  "department": "Business Administration",
  "description": "National Open University of Nigeria (NOUN) curriculum in Organisational Behaviour: management perspectives, cultural influences (Hofstede), role conflict, change management, French & Raven power bases, status and distributive justice, perceptual selectivity, personality models (Freud, Eysenck), group dynamics, communication models, and socio-technical structural design.",
  "createdAt": "2026-10-22T08:53:14.073Z",
  "documents": [
    {
      "id": "doc-bus322-textbook",
      "name": "BUS322_765e78f6.pdf",
      "fileType": "pdf",
      "fileSize": 3450000,
      "uploadedAt": "2026-10-22T08:53:14.073Z",
      "extractedHeadingsCount": 15,
      "pageCount": 169,
      "status": "ready",
      "processingStatus": "fully_processed",
      "summary": "Official NOUN course guide for BUS 322: Organisational Behaviour by Dr. T.O. Ishola and Prof. C.P. Maduabum."
    },
    {
      "id": "doc-bus322-psalmdata-pop",
      "name": "BUS322_ORGANISATIONAL_BEHAVIOUR_COMPLETE_POP_SUMMARY_edb84b70.pdf",
      "fileType": "pdf",
      "fileSize": 980000,
      "uploadedAt": "2026-10-23T07:56:00Z",
      "extractedHeadingsCount": 10,
      "pageCount": 19,
      "status": "ready",
      "processingStatus": "fully_processed",
      "summary": "Official NOUN POP examination past questions and marking schemes for BUS 322 spanning 2019–2025 from Psalmdata Telecom & Computer Cafe."
    },
    {
      "id": "doc-bus322-winsmart-summary",
      "name": "BUS322_ORGANISATIONAL_BEHAVIOUR_SUMMARY_08024665051_1__38c18bb8.pdf",
      "fileType": "pdf",
      "fileSize": 1850000,
      "uploadedAt": "2026-10-23T07:55:00Z",
      "extractedHeadingsCount": 15,
      "pageCount": 49,
      "status": "ready",
      "processingStatus": "fully_processed",
      "summary": "Comprehensive POP exam summary and detailed academic solutions guide for BUS 322 from Winsmart Academy."
    }
  ],
  "pastQuestionDocuments": BUS322_UPLOADED_PQ_DOCUMENTS,
  "modules": [
    {
      "id": "mod-bus322-1",
      "moduleNumber": 1,
      "title": "Module 1: Foundations of Management, Roles and Change Management",
      "description": "Management perspectives, organizational behavior dimensions, formal/informal structures, role conflicts, and managing resistance to organizational change.",
      "units": [
        {
          "id": "unit-bus322-1",
          "unitNumber": "1.0",
          "title": "Unit 1: Management Perspectives",
          "objectives": [
            "Explain the technical, conceptual, and human dimensions of management",
            "Differentiate between management and administration",
            "Discuss the universal management functions (planning, organizing, staffing, directing, controlling)",
            "Analyze Peter Drucker three requirements for organization structure"
          ],
          "unitRecapPoints": [
            "Management has three major dimensions: technical, conceptual, and human. Organizational Behaviour directly addresses the human and conceptual side.",
            "Drucker specifies 3 structural requirements: organized for business performance, least possible management levels, and training/testing future leadership.",
            "Administration is concerned with installation of procedures and regulation against plans; management implies broader discretion and goal attainment."
          ],
          "topics": [
            {
              "id": "top-bus322-1-1",
              "title": "Dimensions and Functions of Management",
              "readingMinutes": 14,
              "sourceReference": "BUS 322 Course Guide, Module 1, Unit 1, pp. 98–106",
              "textbookDefinitions": [
                {
                  "term": "Organizational Behaviour",
                  "definition": "The field that seeks enhanced knowledge of behavior in organizational settings through the scientific study of individual, group, and organizational processes.",
                  "sourceAuthor": "BUS 322 Syllabus"
                },
                {
                  "term": "Management Functions",
                  "definition": "Planning, organizing, staffing, directing, coordinating, and controlling across all hierarchical levels.",
                  "sourceAuthor": "Koontz & O’Donnell"
                }
              ],
              "content": "Management operates across three core dimensions: technical, conceptual, and human. While managers possess technical competence, achieving productivity requires mastering the human and conceptual dimensions through Organizational Behaviour (O.B.).\n\nManagement Functions:\n1. Planning: Decision-making process determining future objectives and selecting means to meet them.\n2. Organizing: Arranging and allocating work, authority, and resources to establish the organizational structure.\n3. Staffing: Recruiting, selecting, appraising, and developing qualified personnel.\n4. Directing: Guiding, leading, motivating, and supervising people to perform assigned tasks willingly.\n5. Coordinating: Synchronizing and unifying activities across departments to prevent friction.\n6. Controlling: Monitoring performance against planned standards and compelling events to conform to plans.\n\nManagement versus Administration:\nE.F.L. Brech defined administration as that part of management concerned with installing and carrying out procedures and checking progress against plans. Administration operates in accordance with established rules, whereas management exercises strategic discretion.",
              "summaryPoints": [
                "O.B. focuses on the human and conceptual dimensions of enterprise management.",
                "Management functions encompass planning, organizing, staffing, directing, and controlling.",
                "Management exercises strategic discretion; administration executes and regulates established procedures."
              ]
            }
          ]
        },
        {
          "id": "unit-bus322-2",
          "unitNumber": "2.0",
          "title": "Unit 2: The Stuff of Organizational Behaviour and Cultural Influences",
          "objectives": [
            "Define Organizational Behaviour and its two primary goals",
            "Identify four major influences on workplace behavior: individual, group, organization, and environment",
            "Analyze Hofstede four cultural variables: power distance, individualism, uncertainty avoidance, masculinity"
          ],
          "unitRecapPoints": [
            "O.B. goals: (1) Increased understanding of human behavior in organizations, (2) Application of knowledge to enhance organizational effectiveness and individual well-being.",
            "Four interrelated dimensions influence behavior: The individual, The group, The organization, and The environment.",
            "Culture is socially transmitted action. Hofstede identifies Power Distance, Individualism, Uncertainty Avoidance, and Masculinity as key cultural determinants."
          ],
          "topics": [
            {
              "id": "top-bus322-2-1",
              "title": "Behavioral Influences and Hofstede Cultural Framework",
              "readingMinutes": 14,
              "sourceReference": "BUS 322 Course Guide, Module 1, Unit 2, pp. 107–114",
              "textbookDefinitions": [
                {
                  "term": "Power Distance (Geert Hofstede)",
                  "definition": "The extent to which members of a society accept that power is distributed unequally in organizations and institutions.",
                  "sourceAuthor": "Geert Hofstede (1980)"
                },
                {
                  "term": "Uncertainty Avoidance",
                  "definition": "The extent to which society members feel uncomfortable with ambiguity, risk, and unstructured situations.",
                  "sourceAuthor": "Geert Hofstede"
                }
              ],
              "content": "Organizational Behaviour is the scientific study of human behavior in organizational settings. Four interrelated dimensions shape organizational behavior:\n- The Individual: Personal attributes, values, perceptions, attitudes, and motives.\n- The Group: Informal and formal groups, group pressures, social norms, and peer leadership.\n- The Organization: Formal structure, technology, leadership styles, policies, and authority patterns.\n- The Environment: Economic conditions, technological changes, cultural values, and government regulations.\n\nHofstede's Four Cultural Dimensions:\n1. Power Distance: High power distance accepts steep hierarchy and inequality; low power distance strives for consultation and equality.\n2. Individualism vs. Collectivism: Individualistic cultures prioritize personal autonomy and immediate family; collectivist cultures emphasize group cohesion and loyalty.\n3. Uncertainty Avoidance: High uncertainty avoidance relies on rigid rules and security; low uncertainty avoidance tolerates ambiguity and welcomes change.\n4. Masculinity vs. Femininity: Masculine cultures emphasize material achievement, competition, and assertiveness; feminine cultures emphasize quality of life, interpersonal care, and equality.",
              "summaryPoints": [
                "O.B. integrates psychology, sociology, and management science to optimize human performance.",
                "Work behavior is a product of individual, group, structural, and environmental forces.",
                "Hofstede dimensions show that management practices must align with cultural values."
              ]
            }
          ]
        },
        {
          "id": "unit-bus322-3",
          "unitNumber": "3.0",
          "title": "Unit 3: Roles, Role Conflict and Conflict Management",
          "objectives": [
            "Define organizational role and role expectations",
            "Identify four types of role conflict: inter-sender, intra-sender, inter-role, person-role",
            "Contrast task ambiguity and emotional ambiguity",
            "Evaluate conflict resolution strategies: assertion vs. cooperation, win-win, win-lose, lose-lose"
          ],
          "unitRecapPoints": [
            "A role is a position defined by a set of expectations about behavior; supervisors are often \"persons in the middle\" facing conflicting demands.",
            "Four types of role conflict: Inter-sender (different group members make conflicting demands), Intra-sender (same manager makes conflicting demands), Inter-role (external role conflicts with workplace role), Person-role (demands conflict with personal values).",
            "Conflict handling grid: Competing (high assertion, low cooperation), Collaborating (high assertion, high cooperation), Avoiding (low assertion, low cooperation), Accommodating (low assertion, high cooperation), Compromising (midpoint).",
            "Win-Win strategy solves underlying problems; Win-Lose creates bitterness; Lose-Lose results from mutual exhaustion or bribes."
          ],
          "topics": [
            {
              "id": "top-bus322-3-1",
              "title": "Role Dynamics, Conflict Typology, and Resolution Strategies",
              "readingMinutes": 16,
              "sourceReference": "BUS 322 Course Guide, Module 1, Unit 4, pp. 121–134",
              "textbookDefinitions": [
                {
                  "term": "Role Conflict",
                  "definition": "Incompatibility between job tasks, resources, policies, and interpersonal expectations placed upon an individual.",
                  "sourceAuthor": "Organizational Psychology"
                },
                {
                  "term": "Win-Win Strategy",
                  "definition": "Problem-solving conflict resolution where creative solutions are devised meeting the genuine needs of both parties without sacrifice.",
                  "sourceAuthor": "Conflict Management Literature"
                }
              ],
              "content": "A role is a position in an organization defined by a set of expectations about behavior. The first-line supervisor is famously the \"person in the middle\", subject to simultaneous conflicting expectations from management, workers, and peer supervisors.\n\nFour Types of Role Conflict:\n1. Inter-sender Role Conflict: Different members of an organization make contradictory demands on the same person.\n2. Intra-sender Role Conflict: The same manager or office issues incompatible orders (e.g. demanding higher quality while cutting budget and time).\n3. Inter-role Conflict: Outside roles (father, spouse, church member) conflict with organizational duties.\n4. Person-role Conflict: Job demands violate the individual's personal ethics, religious conscience, or values.\n\nRole Ambiguity:\nArises from lack of clear information. Task ambiguity occurs when a worker is uncertain about performance requirements; emotional ambiguity occurs when an employee is unsure of how the supervisor evaluates him.\n\nConflict Resolution Strategies:\nPlotting Assertion against Cooperation yields five outcomes:\n- Competing: High assertion, low cooperation (win-lose confrontation).\n- Accommodating: Low assertion, high cooperation (sacrificing one's needs).\n- Avoiding: Low assertion, low cooperation (withdrawing or ignoring).\n- Compromising: Moderate assertion and cooperation (sharing concessions).\n- Collaborating: High assertion, high cooperation (win-win problem-solving).",
              "summaryPoints": [
                "Supervisors experience severe role conflict as boundary spanners.",
                "Role ambiguity damages morale through lack of clarity or feedback.",
                "Collaborative win-win strategies resolve core conflicts without residual resentment."
              ]
            }
          ]
        },
        {
          "id": "unit-bus322-4",
          "unitNumber": "4.0",
          "title": "Unit 4: Management of Organizational Change",
          "objectives": [
            "Identify external and internal causes of organizational change",
            "Analyze the power distribution continuum: Unilateral action, Power sharing, Delegated authority",
            "Explain Kurt Lewin 3-stage change process: Unfreezing, Moving, Freezing",
            "Discuss strategies for managing and overcoming resistance to change"
          ],
          "unitRecapPoints": [
            "Forces of change: Technological change, knowledge explosion, product obsolescence, social/demographic changes.",
            "External forces are uncontrollable and require coping adaptation; internal forces are controllable.",
            "Kurt Lewin 3-step change model: Unfreezing (breaking equilibrium), Moving/Changing (adopting new behaviors), Freezing (institutionalizing new norms).",
            "Resistance is a natural behavioral response signaling anxiety or lack of communication; management must involve staff in planning and clarify benefits."
          ],
          "topics": [
            {
              "id": "top-bus322-4-1",
              "title": "Forces of Change, Lewin Model, and Managing Resistance",
              "readingMinutes": 14,
              "sourceReference": "BUS 322 Course Guide, Module 1, Unit 5, pp. 135–144",
              "textbookDefinitions": [
                {
                  "term": "Unfreezing-Moving-Freezing (Kurt Lewin)",
                  "definition": "Three-stage model of planned change: Unfreezing existing habits, moving toward new operational behaviors, and freezing the new level to ensure permanence.",
                  "sourceAuthor": "Kurt Lewin"
                }
              ],
              "content": "Change is an inevitable reality in modern organizations driven by external forces (technology, knowledge explosion, market shifts) and internal forces (new leadership, restructuring, employee expectations).\n\nApproaches to Introducing Change:\n- Unilateral Action: Top-down decree with one-way communication.\n- Power Sharing: Consultation and interaction between executives and staff, with final decision retained by management.\n- Delegated Authority: Subordinates are given responsibility to analyze the problem and design the change solution.\n\nKurt Lewin's Three-Stage Change Process:\n1. Unfreezing: Disrupting the existing equilibrium, challenging old habits, and creating readiness for change.\n2. Moving (Changing): Developing new behaviors, values, and operating procedures.\n3. Freezing (Refreezing): Institutionalizing the change through supportive reward systems, policies, and culture to prevent backsliding.\n\nManaging Resistance:\nResistance is neither good nor bad; it is a signal that communication or trust is deficient. To overcome resistance: involve staff in planning, communicate objectives early, provide retraining, minimize status threats, and demonstrate the advantages of the new method.",
              "summaryPoints": [
                "Change requires balancing operational dynamism with workplace stability.",
                "Lewin model ensures changes are deeply assimilated rather than temporarily tolerated.",
                "Participatory change introduction minimizes employee resistance and sabotage."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "mod-bus322-2",
      "moduleNumber": 2,
      "title": "Module 2: Power, Status, Perception, Personality and Work Groups",
      "description": "French & Raven bases of power, status hierarchies, perceptual selectivity, Freudian and trait personality models, and group dynamics.",
      "units": [
        {
          "id": "unit-bus322-5",
          "unitNumber": "1.0",
          "title": "Unit 1: Power and Control in Organizations",
          "objectives": [
            "Define power, authority, and influence",
            "Analyze the seven bases of power (French, Raven, Goldsmith): Coercive, Expert, Legitimate, Referent, Reward, Information, Connection",
            "Explain the cost of using power and identify organizational power blocs"
          ],
          "unitRecapPoints": [
            "Power is the potential for influence; leadership is the exercise of power.",
            "Seven Bases of Power: Coercive (fear/punishment), Expert (skill/knowledge), Legitimate (formal position), Referent (attractiveness/charisma), Reward (valuable outcomes), Information (access to vital data), Connection (ties to influential figures).",
            "Power Blocs: Board of Directors, Management, Employees, Labor Unions, and Government."
          ],
          "topics": [
            {
              "id": "top-bus322-5-1",
              "title": "Seven Bases of Power and Organizational Power Blocs",
              "readingMinutes": 14,
              "sourceReference": "BUS 322 Course Guide, Module 2, Unit 1, pp. 145–152",
              "textbookDefinitions": [
                {
                  "term": "Power (Rogers)",
                  "definition": "The potential for influence—the resource that enables a leader to induce compliance or behavior change in another.",
                  "sourceAuthor": "Rogers"
                },
                {
                  "term": "Seven Bases of Power",
                  "definition": "Framework identifying Coercive, Expert, Legitimate, Referent, Reward, Information, and Connection power.",
                  "sourceAuthor": "French & Raven (1959), Raven (1965), Goldsmith et al. (1979)"
                }
              ],
              "content": "Power is the ability or potential to induce another person or group to change behavior. While authority is legitimized formal power derived from office, power can exist without formal authority.\n\nSeven Bases of Power:\n1. Coercive Power: Based on fear of punishment (dismissal, demotion, pay cuts).\n2. Expert Power: Based on specialized knowledge, technical skill, and recognized credibility.\n3. Legitimate Power: Derived from hierarchical position and societal values of obedience to authority.\n4. Referent Power: Based on personal charisma, attractiveness, and identification with the leader.\n5. Reward Power: Based on the ability to distribute valued outcomes (promotions, pay raises, praise).\n6. Information Power: Based on control over or access to vital operational information.\n7. Connection Power: Based on perceived relationships with influential persons inside or outside the organization.\n\nPower Blocs:\nMajor interest groups possessing strong influence over corporate decisions:\n- Board of Directors (governing authority)\n- Management (executive operational control)\n- Employees (operational technical knowledge)\n- Labor Unions (collective bargaining and strike leverage)\n- Government (regulatory and economic oversight).",
              "summaryPoints": [
                "Expert and referent power generate true commitment; coercive power produces mere compliance or resistance.",
                "Reward power is effective only when the recipient values the offered reward.",
                "Organizations balance multiple internal and external power blocs."
              ]
            }
          ]
        },
        {
          "id": "unit-bus322-6",
          "unitNumber": "2.0",
          "title": "Unit 2: The Concept of Status and Occupational Prestige",
          "objectives": [
            "Define status and differentiate formal status from informal status",
            "Examine sources of status: wealth, occupation, culture, personal achievement, education, family, leisure",
            "Contrast Distributive Justice and Status Congruence",
            "Discuss the role of occupational prestige in job satisfaction"
          ],
          "unitRecapPoints": [
            "Status is the social rank or worth of an individual as estimated by a group; Role is what a person is expected to do, Status is who he is.",
            "Distributive Justice is the perception that outcomes are directly proportional to effort and costs invested.",
            "Status Congruence requires that all status symbols and privileges of a position match expectations (e.g. supervisors earning more than subordinates).",
            "Occupational prestige reflects educational investment and societal value, serving as a primary basis of social stratification."
          ],
          "topics": [
            {
              "id": "top-bus322-6-1",
              "title": "Status Hierarchies, Distributive Justice and Occupational Prestige",
              "readingMinutes": 14,
              "sourceReference": "BUS 322 Course Guide, Module 2, Unit 2, pp. 153–158",
              "textbookDefinitions": [
                {
                  "term": "Distributive Justice",
                  "definition": "The principle that an individual rewards or outcomes should be directly proportional to their investments and efforts.",
                  "sourceAuthor": "Social Exchange Theory"
                },
                {
                  "term": "Status Congruence",
                  "definition": "Consistency among the various status indicators (salary, office size, title, authority) possessed by an individual relative to comparison peers.",
                  "sourceAuthor": "Organizational Sociology"
                }
              ],
              "content": "Status is the social rank or value conferred upon a person by others in a social system.\n\nSources of Status:\n- Societal: Wealth, occupation, culture, education, personal achievement, family background, and leisure club memberships.\n- Organizational: Hierarchy level, job title, salary grade, budget authority, and research publications.\n\nDistributive Justice and Status Congruence:\n- Distributive Justice: Employees demand that outcomes reflect invested inputs (effort, education, training). If an employee invests more effort but receives fewer rewards than an associate, perceived injustice triggers disequilibrium.\n- Status Congruence: Consistency among status symbols. An assistant manager having a larger office or higher salary than the manager creates status incongruence, producing resentment and operational dysfunction.\n\nOccupational Prestige:\nReflects the training, education, and societal value of a profession. Highly skilled professions (banking, oil/gas engineering, law) enjoy greater prestige than unskilled labor, directly influencing employee self-esteem and job satisfaction.",
              "summaryPoints": [
                "Status is conferred through social perception rather than unilaterally possessed.",
                "Distributive justice ensures fair proportionality between effort and reward.",
                "Status incongruence produces operational friction and interpersonal tension."
              ]
            }
          ]
        },
        {
          "id": "unit-bus322-7",
          "unitNumber": "3.0",
          "title": "Unit 3: Perception and Social Perception",
          "objectives": [
            "Define perception and explain perceptual selectivity",
            "Detail external attention factors: intensity, size, contrast, repetition, motion, novelty",
            "Examine social perception errors: Attribution theory, Stereotyping, and the Halo Effect"
          ],
          "unitRecapPoints": [
            "Perception is the process of selecting, organizing, and interpreting sensory information to understand the environment.",
            "External attention principles: Intensity (louder/brighter), Size (larger objects), Contrast (stands out from background), Repetition, Motion, Novelty/Familiarity.",
            "Attribution Theory (Kelley): People attribute behavior to internal or external causes based on Distinctiveness, Consensus, and Consistency.",
            "Stereotyping categorizes people based on group traits; Halo Effect allows a single trait (positive or negative) to color overall evaluation."
          ],
          "topics": [
            {
              "id": "top-bus322-7-1",
              "title": "Perceptual Selectivity, Attribution and Perceptual Errors",
              "readingMinutes": 15,
              "sourceReference": "BUS 322 Course Guide, Module 2, Unit 3, pp. 159–166",
              "textbookDefinitions": [
                {
                  "term": "Perceptual Selectivity",
                  "definition": "The process by which individuals filter out vast environmental stimuli to focus only on a few salient inputs.",
                  "sourceAuthor": "Cognitive Psychology"
                },
                {
                  "term": "Halo Effect",
                  "definition": "The cognitive bias where a single prominent trait (e.g. appearance, cooperativeness) excessively influences overall appraisal of an individual performance and personality.",
                  "sourceAuthor": "Social Psychology"
                }
              ],
              "content": "People act not on objective reality, but on what they perceive to be real. Perception selects, organizes, and translates sensory stimuli into meaningful impressions.\n\nPrinciples of Perceptual Selectivity:\n- External Attention Factors: Intensity, Size, Contrast, Repetition, Motion, and Novelty/Familiarity.\n- Internal Motivational Factors: Current physiological drives, established attitudes/values, and past experiences.\n\nSocial Perception and Attribution:\nHarold Kelley identified three criteria governing whether behavior is attributed to internal (ability, effort) or external (task difficulty, luck) causes:\n1. Distinctiveness: Does the person behave differently across different situations?\n2. Consensus: Do others behave similarly in this situation?\n3. Consistency: Does the person behave the same way over time?\nInternal attribution occurs with low distinctiveness, low consensus, and high consistency.\n\nCommon Perceptual Distortions:\n- Stereotyping: Ascribing blanket traits to an individual based on racial, occupational, or gender group membership.\n- Halo Effect: Allowing an overall impression or single favorable/unfavorable trait to bias evaluation of all specific abilities.",
              "summaryPoints": [
                "Selective perception filters environmental noise based on contrast, intensity, and motives.",
                "Kelley attribution framework determines whether credit or blame is assigned internally or externally.",
                "Halo effects and stereotyping distort performance appraisals and managerial decisions."
              ]
            }
          ]
        },
        {
          "id": "unit-bus322-8",
          "unitNumber": "4.0",
          "title": "Unit 4: Personality Concepts and Theories",
          "objectives": [
            "Define personality and examine determinants (genetic, social, role, situational)",
            "Analyze Sigmund Freud psycho-analytic theory (Id, Ego, Super-Ego, psychosexual stages)",
            "Explain Hans Eysenck two-dimensional trait theory (Stable/Unstable, Introvert/Extrovert)"
          ],
          "unitRecapPoints": [
            "Personality is the enduring pattern of psychological characteristics by which an individual is unique.",
            "Determinants: Inherited body constitution (genetics, Sheldon somatotypes), Cultural socialization, Social roles, and Situational environment.",
            "Freudian Structure: Id (pleasure principle, libido), Super-Ego (conscience, societal morals), Ego (reality principle, balancing unit).",
            "Freudian Stages: Oral (0-1), Anal (1-3, stingy/orderly fixation), Phallic (4-5, Oedipus/Electra), Latency (5-puberty), Genital (13+).",
            "Eysenck 4 Temperaments: Phlegmatic (Stable Introvert), Melancholic (Unstable Introvert), Sanguine (Stable Extrovert), Choleric (Unstable Extrovert)."
          ],
          "topics": [
            {
              "id": "top-bus322-8-1",
              "title": "Freudian Psychoanalysis and Eysenck Personality Trait Taxonomy",
              "readingMinutes": 16,
              "sourceReference": "BUS 322 Course Guide, Module 2, Unit 4, pp. 167–176",
              "textbookDefinitions": [
                {
                  "term": "Id, Ego, and Super-Ego (Sigmund Freud)",
                  "definition": "The three personality systems: Id (instinctual pleasure-seeking drive), Super-Ego (moral conscience and societal rules), and Ego (rational mediator governed by the reality principle).",
                  "sourceAuthor": "Sigmund Freud"
                },
                {
                  "term": "Eysenck Personality Dimensions",
                  "definition": "Two orthogonal personality axes: Emotional Stability vs. Neuroticism (Unstable), and Introversion vs. Extroversion.",
                  "sourceAuthor": "Hans J. Eysenck"
                }
              ],
              "content": "Personality represents the relatively enduring pattern of behaviors, attitudes, and emotional traits that distinguish an individual.\n\n1. Sigmund Freud's Psycho-Analytical Theory:\nPersonality is governed by three interacting mental systems:\n- The Id: Present at birth, driven by instinctual libido and the pleasure principle without regard for social rules.\n- The Super-Ego: Developed through parental socialization, representing conscience, moral laws, and self-restraint.\n- The Ego: Governed by the reality principle; acts as the executive mediator balancing the primitive urges of the Id with the moral prohibitions of the Super-Ego.\n\nFreudian Psychosexual Stages & Fixation:\n- Oral Stage (0–1 yr): Pleasure centered on mouth. Fixation: smoking, overeating, excessive dependency.\n- Anal Stage (1–3 yrs): Pleasure in elimination/retention. Fixation: stinginess, hoarding, obstinacy, excessive neatness.\n- Phallic Stage (4–5 yrs): Oedipus/Electra conflict; identification with same-sex parent resolves infantile anxiety.\n- Latency Stage (5–puberty): Sexual urges repressed; social and academic learning.\n- Genital Stage (13+ yrs): Mature adult relationships.\n\n2. Hans J. Eysenck's Trait Theory:\nCrosses two biological dimensions into four classical temperaments:\n- Stable Introvert (Phlegmatic): Calm, reliable, thoughtful, controlled.\n- Unstable Introvert (Melancholic): Anxious, moody, quiet, reserved, pessimistic.\n- Stable Extrovert (Sanguine): Outgoing, sociable, easygoing, lively.\n- Unstable Extrovert (Choleric): Aggressive, touchy, restless, excitable, impulsive.",
              "summaryPoints": [
                "Freud proved that unresolved childhood fixations shape adult workplace coping mechanisms.",
                "The Ego must balance instinctual desires with moral and environmental constraints.",
                "Eysenck taxonomy links emotional stability and sociability to predictable behavioral patterns."
              ]
            }
          ]
        },
        {
          "id": "unit-bus322-9",
          "unitNumber": "5.0",
          "title": "Unit 5: Work Groups and Group Dynamics",
          "objectives": [
            "Define work group and contrast formal and informal groups",
            "Examine informal group cliques: horizontal, vertical, mixed",
            "Detail theories of group formation: Propinquity, Interaction, Balance, Exchange",
            "Analyze factors influencing group effectiveness and cohesiveness"
          ],
          "unitRecapPoints": [
            "A work group is two or more interdependent people interacting on a continuing basis to achieve common goals.",
            "Informal Cliques: Horizontal (same rank across departments), Vertical (different ranks within department), Mixed (cross-rank, cross-department).",
            "Theories of Group Formation: Propinquity (spatial proximity), Interaction (Homans: activities, interactions, sentiments), Balance (Newcomb: shared attitudes/values), Exchange (reward-cost outcome).",
            "4 Stages of Group Development: Forming (orientation), Storming (goal conflict), Norming (cohesion/structure), Performing (effective task execution).",
            "Cohesiveness increases with small group size, proximity, task interdependence, and shared group norms."
          ],
          "topics": [
            {
              "id": "top-bus322-9-1",
              "title": "Group Formation Theories, Stages of Development and Dynamics",
              "readingMinutes": 15,
              "sourceReference": "BUS 322 Course Guide, Module 2, Unit 5, pp. 177–186",
              "textbookDefinitions": [
                {
                  "term": "Group Cohesiveness",
                  "definition": "The degree to which members are attracted to one another, share common norms, and act as a unified entity.",
                  "sourceAuthor": "Group Dynamics Literature"
                },
                {
                  "term": "Interaction Theory (George Homans)",
                  "definition": "The theory that shared activities lead to more interactions, which foster positive sentiments, reinforcing further shared activities.",
                  "sourceAuthor": "George Homans (1950)"
                }
              ],
              "content": "A work group is more than a collection of individuals; through social interaction, group members develop shared norms, roles, and identity.\n\nTheories of Group Formation:\n1. Propinquity Theory: People affiliate because of geographical or physical proximity in the office or plant.\n2. Interaction Theory (George Homans): Activities, Interactions, and Sentiments are interrelated. When people share common tasks, interactions multiply, strengthening mutual sentiments.\n3. Balance Theory (Theodore Newcomb): People are attracted on the basis of similar attitudes toward work values, politics, religion, or background.\n4. Exchange Theory: Attraction depends on reward-cost balance; affiliation occurs when psychological rewards exceed social costs.\n\nFour Stages of Group Formation (Tuckman Model):\n- Stage 1: Forming (Orientation, testing boundaries, dependency on formal leader).\n- Stage 2: Storming (Intragroup conflict, competing for roles, establishing common goals).\n- Stage 3: Norming (Development of group cohesion, consensus, and shared norms).\n- Stage 4: Performing (Energy channeled into task performance and problem-solving).\n\nGroup Effectiveness Factors:\nSmall group size (faster decision-making, less social loafing), physical eye contact, task nature, strong cohesiveness, and constructive group performance norms.",
              "summaryPoints": [
                "Group formation is driven by physical proximity, shared activities, attitude similarity, and exchange rewards.",
                "Groups progress through forming, storming, norming, and performing stages.",
                "High cohesiveness combined with positive performance norms produces superior productivity."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "mod-bus322-3",
      "moduleNumber": 3,
      "title": "Module 3: Communication, Motivation, Money and Organizational Structure",
      "description": "Communication process and barriers, process theories of motivation, the role of money, and structural design (line/staff, functional, project, matrix).",
      "units": [
        {
          "id": "unit-bus322-10",
          "unitNumber": "1.0",
          "title": "Unit 1: Communication in Organizations",
          "objectives": [
            "Describe the communication process model: sender, encoding, transmission, receiver, decoding, feedback, noise",
            "Identify major communication barriers (semantic distortion, information overload, status differences)",
            "Discuss the American Management Association (AMA) Ten Commandments of Good Communication"
          ],
          "unitRecapPoints": [
            "Communication is the transfer of information and meaning from sender to receiver; feedback verifies understanding.",
            "Barriers: Lack of planning, semantic distortion, poorly expressed messages, information overload, poor listening, and status barriers.",
            "AMA Ten Commandments emphasize clarifying ideas beforehand, examining purpose, considering setting, following up, and active listening."
          ],
          "topics": [
            {
              "id": "top-bus322-10-1",
              "title": "Communication Process, Barriers and The AMA Commandments",
              "readingMinutes": 14,
              "sourceReference": "BUS 322 Course Guide, Module 3, Unit 1, pp. 187–195",
              "textbookDefinitions": [
                {
                  "term": "Communication Process",
                  "definition": "The circular sequence where a sender encodes an idea into a message, transmits it through a medium, and the receiver decodes it, generating feedback in the presence of potential noise.",
                  "sourceAuthor": "Communication Theory"
                }
              ],
              "content": "Communication is the lifeblood of management. Without communication, coordination and leadership are impossible.\n\nCommunication Process Model:\n- Sender generates idea (thought).\n- Encoding into words, symbols, or gestures.\n- Transmission through channel (oral, written, electronic).\n- Receiver perceives and decodes into understanding.\n- Feedback confirms whether the message was accurately interpreted.\n- Noise: Any interference or distortion (physical, psychological, semantic) along the channel.\n\nMajor Barriers to Communication:\n1. Semantic Distortion: Ambiguous words with multiple interpretations.\n2. Information Overload: Excessive volume leading to filtering, delays, or ignoring messages.\n3. Status and Hierarchical Filtering: Subordinates hesitate to communicate upward or edit bad news.\n4. Selective Perception and Poor Listening.\n\nThe AMA Ten Commandments of Good Communication:\n1. Clarify ideas before communicating.\n2. Examine the true purpose of each message.\n3. Consider the physical and human setting.\n4. Consult others in planning communications.\n5. Mind overtones as well as basic content.\n6. Convey something of value to the receiver.\n7. Follow up and seek feedback.\n8. Communicate for tomorrow as well as today.\n9. Support words with actions.\n10. Seek not only to be understood but to understand—listen actively.",
              "summaryPoints": [
                "Two-way communication with feedback eliminates misunderstandings caused by noise.",
                "Semantic distortion and information overload are primary barriers in modern management.",
                "The AMA commandments provide actionable guidelines for managerial clarity."
              ]
            }
          ]
        },
        {
          "id": "unit-bus322-11",
          "unitNumber": "2.0",
          "title": "Unit 2: Organizational Structure and Structural Design",
          "objectives": [
            "Define organizational structure and explain its levels (Technical, Managerial, Community)",
            "Analyze bases of departmentalization: Purpose, Product, Location, Process, Customer",
            "Compare Line, Functional, Staff, and Matrix organizational structures",
            "Examine socio-technical systems and technology influence on work design"
          ],
          "unitRecapPoints": [
            "Structure defines tasks, authority, responsibilities, and communication channels (Mullins, 2000).",
            "Three Organizational Levels (Parsons): Technical (discrete operational tasks), Managerial (internal coordination and resource allocation), Community/Institutional (broad objectives, external governance).",
            "Matrix Organization combines functional departments with horizontal project teams, creating a two-way flow of authority.",
            "Technology influences work design, span of control, and social interactions; socio-technical approach balances technical efficiency with human psychological needs."
          ],
          "topics": [
            {
              "id": "top-bus322-11-1",
              "title": "Organizational Architecture: Levels, Departmentation and Matrix Systems",
              "readingMinutes": 16,
              "sourceReference": "BUS 322 Course Guide, Module 3, Unit 5, pp. 227–258",
              "textbookDefinitions": [
                {
                  "term": "Matrix Structure",
                  "definition": "An organizational design establishing a grid with two-way authority flow: vertical functional authority and horizontal project manager authority.",
                  "sourceAuthor": "Organizational Design"
                },
                {
                  "term": "Socio-Technical System",
                  "definition": "An open-system view recognizing that optimal organizational performance requires harmonious integration between technical processes and human social groupings.",
                  "sourceAuthor": "Mullins (2000)"
                }
              ],
              "content": "Organizational structure is the pattern of relationships along positions in the enterprise.\n\nThree Levels of Organization Structure (Talcott Parsons):\n1. Technical Level: Focused on operational production and execution of core discrete tasks.\n2. Managerial Level: Coordinates technical operations, allocates resources, and interfaces with clients.\n3. Community (Institutional) Level: Oversees broad corporate strategy, governance, board of directors, and societal integration.\n\nStructural Types:\n- Line Organization: Direct vertical authority from managing director down through subordinates. Clear command, but lacks specialization.\n- Line and Staff: Line managers hold executive authority; staff specialists provide advisory support, information, and research.\n- Functional Structure: Grouping by major discipline (Production, Marketing, Finance, HR). Promotes specialization but risks departmental silos.\n- Matrix Structure: Combines functional departments with cross-functional project teams. Authority flows vertically down functional lines and horizontally across project lines. Ideal for aerospace, software, and complex engineering, but requires careful coordination to avoid dual-command conflict.\n\nSocio-Technical Systems:\nNew technology disrupts established social groupings. Managers must design socio-technical systems where technological innovations are matched with human social satisfaction, task autonomy, and ergonomic well-being.",
              "summaryPoints": [
                "Structure establishes order, accountability, and communication channels across technical, managerial, and institutional levels.",
                "Matrix structures balance functional depth with multidisciplinary project agility.",
                "Socio-technical integration ensures technological upgrades do not demoralize the human workforce."
              ]
            }
          ]
        }
      ]
    }
  ]
};
export const BUS322_QUESTIONS: PastExamQuestionItem[] = [
  {
    "id": "pq-bus322-1",
    "courseId": "course-bus322",
    "courseCode": "BUS 322",
    "courseTitle": "Organisational Behaviour",
    "documentId": "pq-doc-bus322-tma-archives",
    "documentName": "BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf",
    "sourceFileName": "BUS322_765e78f6.pdf",
    "linkedUnitId": "unit-bus322-1",
    "linkedUnitNumber": 1,
    "linkedUnitTitle": "Unit 1: Management Perspectives",
    "year": "NOUN Official Examination",
    "questionNumber": "TMA 1 / Q1",
    "questionType": "written_structured",
    "marks": 20,
    "totalMarks": 20,
    "questionText": "Why in your own view are the management functions considered central to a discussion of management, and how do they relate to Peter Drucker three requirements of structure?",
    "suppliedAnswer": "According to BUS 322 course material:\n1. Centrality of Management Functions:\nManagement is a process and activity that occurs at all levels. Managers, regardless of specific job title, perform the core functions of planning, organizing, staffing, directing, coordinating, and controlling. These functions broadly identify what managers do to convert scarce resources into organizational results.\n\n2. Peter Drucker (1989) Three Requirements of Organization Structure:\n(1) It must be organized for business performance: The structure must be direct, simple, and geared to future demands rather than resting on past achievements.\n(2) It should contain the least possible number of management levels: A short chain of command prevents communication friction, distortion, and inertia.\n(3) It must make possible the training and testing of future top management: Autonomy and responsibility must be given to managers early so they develop general management capability rather than narrow specialization.",
    "modelAnswer": "Management functions identify the core activities performed by all managers. Drucker requires structures to focus on business performance, minimize hierarchical levels, and develop future top managers.",
    "keyRubricPoints": [
      "Identification of core management functions (planning, organizing, directing, controlling)",
      "Drucker requirement 1: Business performance focus",
      "Drucker requirement 2: Minimal management levels / short chain of command",
      "Drucker requirement 3: Training and testing future leadership"
    ],
    "difficulty": "Core",
    "isPastQuestion": true,
    "verifiedAuthentic": true,
    "answerStatus": "answer_supplied",
    "unitMappingStatus": "mapped"
  },
  {
    "id": "pq-bus322-2",
    "courseId": "course-bus322",
    "courseCode": "BUS 322",
    "courseTitle": "Organisational Behaviour",
    "documentId": "pq-doc-bus322-tma-archives",
    "documentName": "BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf",
    "sourceFileName": "BUS322_765e78f6.pdf",
    "linkedUnitId": "unit-bus322-2",
    "linkedUnitNumber": 2,
    "linkedUnitTitle": "Unit 2: The Stuff of Organizational Behaviour and Cultural Influences",
    "year": "NOUN Official Examination",
    "questionNumber": "TMA 2 / Q2",
    "questionType": "written_structured",
    "marks": 20,
    "totalMarks": 20,
    "questionText": "In what ways do the different behavioural influencing variables help explain the understanding of human behaviour in organizations? Refer to Geert Hofstede cultural variables.",
    "suppliedAnswer": "Four Interrelated Behavioral Variables:\n1. The Individual: Values, perceptions, attitudes, and motives. Where individual needs conflict with organizational demands, frustration arises.\n2. The Group: Informal and formal groups establish norms and peer pressures that influence individual performance.\n3. The Organization: Formal structure, technology, and leadership styles shape operational patterns.\n4. The Environment: External economic, political, and cultural factors demand organizational adaptation.\n\nHofstede Cultural Variables:\n- Power Distance: Determines whether employees expect and accept centralized autocratic direction or consultative equality.\n- Individualism vs. Collectivism: Dictates whether workers are motivated by individual advancement or group solidarity.\n- Uncertainty Avoidance: Influences whether workers demand rigid standard operating procedures or embrace innovative risks.\n- Masculinity vs. Femininity: Reflects orientation toward competitive achievement versus quality of life and interpersonal harmony.",
    "modelAnswer": "Behavior is shaped by individual, group, organizational, and environmental variables. Hofstede dimensions explain how national and societal cultures determine organizational management styles.",
    "keyRubricPoints": [
      "Detailed explanation of individual, group, organization, and environmental dimensions",
      "Application of Hofstede cultural dimensions to workplace behavior"
    ],
    "difficulty": "Challenging",
    "isPastQuestion": true,
    "verifiedAuthentic": true,
    "answerStatus": "answer_supplied",
    "unitMappingStatus": "mapped"
  },
  {
    "id": "pq-bus322-3",
    "courseId": "course-bus322",
    "courseCode": "BUS 322",
    "courseTitle": "Organisational Behaviour",
    "documentId": "pq-doc-bus322-tma-archives",
    "documentName": "BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf",
    "sourceFileName": "BUS322_765e78f6.pdf",
    "linkedUnitId": "unit-bus322-3",
    "linkedUnitNumber": 3,
    "linkedUnitTitle": "Unit 3: Roles, Role Conflict and Conflict Management",
    "year": "NOUN Official Examination",
    "questionNumber": "TMA 3 / Q3",
    "questionType": "written_structured",
    "marks": 20,
    "totalMarks": 20,
    "questionText": "How would you explain the fact that role conflict cannot be wished or completely planned away, and what strategies can management use to handle it?",
    "suppliedAnswer": "Role Conflict Inevitability:\nRole conflict is inevitable because employees occupy multiple roles simultaneously (family, profession, union, management). First-line supervisors exist \"in the middle\", facing conflicting expectations from senior executives, peer supervisors, and subordinate labor.\n\nFour Types of Role Conflict:\n1. Inter-sender conflict (different members make opposing demands).\n2. Intra-sender conflict (the same superior issues conflicting demands).\n3. Inter-role conflict (work role conflicts with outside personal role).\n4. Person-role conflict (organizational expectations violate personal values).\n\nConflict Handling Strategies:\n- Assertion vs. Cooperation continuum: Competing, Avoiding, Accommodating, Compromising, Collaborating.\n- Win-Win problem-solving strategy: Focuses on meeting the genuine needs of both parties without sacrifice.\n- Management measures: Role clarification, open communication, transparent performance standards, and participative problem resolution.",
    "modelAnswer": "Role conflict is inevitable due to boundary-spanning roles and divergent stakeholder expectations. Management must utilize collaborative win-win strategies, role clarification, and consultative communication.",
    "keyRubricPoints": [
      "Explanation of why role conflict cannot be eliminated (supervisor in the middle, competing roles)",
      "Types of role conflict (inter-sender, intra-sender, inter-role, person-role)",
      "Conflict handling strategies with emphasis on Win-Win collaboration"
    ],
    "difficulty": "Core",
    "isPastQuestion": true,
    "verifiedAuthentic": true,
    "answerStatus": "answer_supplied",
    "unitMappingStatus": "mapped"
  },
  {
    "id": "pq-bus322-4",
    "courseId": "course-bus322",
    "courseCode": "BUS 322",
    "courseTitle": "Organisational Behaviour",
    "documentId": "pq-doc-bus322-tma-archives",
    "documentName": "BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf",
    "sourceFileName": "BUS322_765e78f6.pdf",
    "linkedUnitId": "unit-bus322-5",
    "linkedUnitNumber": 5,
    "linkedUnitTitle": "Unit 1: Power and Control in Organizations",
    "year": "NOUN Official Examination",
    "questionNumber": "TMA 4 / Q4",
    "questionType": "written_structured",
    "marks": 20,
    "totalMarks": 20,
    "questionText": "Define the term power bloc, and discuss the five major power blocs available in modern business organizations along with the seven bases of power.",
    "suppliedAnswer": "1. Definition of Power Bloc:\nPower blocs (potential influencers) are organized groups that possess sufficient resources, authority, or leverage to significantly influence organizational decisions.\n\n2. Five Major Power Blocs:\n(1) Board of Directors: The governing council holding supreme legal policy authority.\n(2) Management: Executives and functional heads who control day-to-day operations and employment decisions.\n(3) Employees: Technical and administrative staff who exert expert and information power.\n(4) Labour Unions: Collective bargaining entities that use demonstration, work-to-rule, or strikes to shape policy.\n(5) Government: External authority setting minimum wages, tax laws, environmental policies, and commercial regulations.\n\n3. Seven Bases of Power:\nCoercive (fear), Expert (skills), Legitimate (hierarchy), Referent (charisma), Reward (benefits), Information (access to data), and Connection (influential networks).",
    "modelAnswer": "Power blocs are major groups influencing corporate policy: Board, Management, Employees, Unions, and Government. French, Raven, and Goldsmith identify 7 power bases: Coercive, Expert, Legitimate, Referent, Reward, Information, and Connection.",
    "keyRubricPoints": [
      "Definition of power bloc",
      "Discussion of Board, Management, Employees, Unions, and Government",
      "Listing and explanation of the 7 bases of power"
    ],
    "difficulty": "Challenging",
    "isPastQuestion": true,
    "verifiedAuthentic": true,
    "answerStatus": "answer_supplied",
    "unitMappingStatus": "mapped"
  },
  {
    "id": "pq-bus322-5",
    "courseId": "course-bus322",
    "courseCode": "BUS 322",
    "courseTitle": "Organisational Behaviour",
    "documentId": "pq-doc-bus322-tma-archives",
    "documentName": "BUS322_ORGANISATIONAL_BEHAVIOUR_TMA_AND_EXAM_ARCHIVES.pdf",
    "sourceFileName": "BUS322_765e78f6.pdf",
    "linkedUnitId": "unit-bus322-11",
    "linkedUnitNumber": 11,
    "linkedUnitTitle": "Unit 2: Organizational Structure and Structural Design",
    "year": "NOUN Official Examination",
    "questionNumber": "TMA 5 / Q5",
    "questionType": "written_structured",
    "marks": 20,
    "totalMarks": 20,
    "questionText": "Explain the nature and characteristics of a Matrix organizational structure, and discuss why organizations adopt it despite its complexities.",
    "suppliedAnswer": "1. Nature of Matrix Structure:\nA Matrix organization establishes a two-dimensional grid combining permanent functional departments with temporary project teams. Authority flows in two directions:\n- Vertically: Down the line from functional managers (Engineering, Marketing, Finance).\n- Horizontally: Across departments from project/product managers.\n\n2. Reasons for Adopting Matrix Structure:\n(1) Dual Critical Orientation: When an enterprise must respond simultaneously to functional expertise and project/product/geographic demands.\n(2) Information Processing: The need to process large amounts of complex, specialized information across disciplines.\n(3) Resource Sharing: Flexible deployment of highly specialized personnel (systems analysts, engineers) across multiple projects without permanent overhead.\n\n3. Difficulties and Pitfalls:\n- Violates unity of command (employees report to both functional manager and project manager).\n- Potential for power struggles, conflict, and communication log-jams between functional and project heads.",
    "modelAnswer": "A matrix structure combines vertical functional departments with horizontal project teams. It is adopted to handle dual orientations, complex information flows, and shared specialized resources, though it risks dual-reporting conflict.",
    "keyRubricPoints": [
      "Explanation of vertical functional and horizontal project authority",
      "At least 2 reasons for adoption (dual orientation, resource sharing, complex info processing)",
      "Discussion of the challenge to unity of command"
    ],
    "difficulty": "Challenging",
    "isPastQuestion": true,
    "verifiedAuthentic": true,
    "answerStatus": "answer_supplied",
    "unitMappingStatus": "mapped"
  }
];
