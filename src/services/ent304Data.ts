import { Course, PastExamQuestionItem, StudyModule, StudyUnit, StudyTopic } from '../types';
import {
  ENT304_UPLOADED_PQ_DOCUMENTS,
  AUTHENTIC_ENT304_EXTRACTED_PAST_QUESTIONS
} from './ent304PastQuestionsData';

/**
 * ============================================================================
 * ENT 304: LEADERSHIP AND CORPORATE GOVERNANCE
 * Authoritative NOUN Study Material (National Open University of Nigeria)
 * Course Writers: Dr. (Mrs) Victoria Akpa & Oluwatoyin Olaniyan (Babcock University)
 * Course Editor: Prof. Onyemaechi Onwe (NOUN)
 * Head of Department: Dr. Lawal Kamaldeen (NOUN)
 * Dean: Dr. Timothy Ishola (NOUN)
 * Source Document: ENT 304 Course Guide & Main Content (145 pages)
 * Total Units in Source: Exactly 14 Units across 3 Modules (All 14 Units Verified)
 * ============================================================================
 */

export const ENT304_MODULES: StudyModule[] = [
  // --------------------------------------------------------------------------
  // MODULE 1: CONCEPT OF LEADERSHIP (Units 1 - 5)
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent304-1',
    moduleNumber: 1,
    title: 'Module 1: Concept of Leadership',
    units: [
      {
        id: 'unit-ent304-1',
        unitNumber: '1',
        title: 'Unit 1: Concept and Meaning of Leadership',
        objectives: [
          'Define the term leadership from multiple academic authorities',
          'Explain the 11 principles of leadership according to U.S. Army (1983)',
          'Explain the six types of leaders identified by Mullins L.J (1985)',
          'Identify the eight core qualities of effective leaders from Kouzes & Posner (2002)'
        ],
        unitRecapPoints: [
          'Leadership is defined as the process of giving purpose to collective effort and causing willing effort (Jacobs & Jacques, 1990).',
          'U.S. Army (1983) established 11 foundational leadership principles including knowing oneself, technical proficiency, and setting the example.',
          'Mullins (1985) classifies leaders into: Charismatic, Traditional, Situational, Appointed, Functional, and Principle-Centered.',
          'Kouzes & Posner (2002) 15-year global study of 75,000 respondents identified Honesty as the #1 leadership quality.'
        ],
        topics: [
          {
            id: 'top-ent304-1-1',
            title: 'Academic Definitions and Meaning of Leadership',
            readingMinutes: 6,
            sourceReference: 'ENT 304, Unit 1, Section 3.1, pp. 10–18',
            textbookDefinitions: [
              {
                term: 'Leadership (Jacobs & Jacques, 1990)',
                definition: 'A process of giving purpose (meaningful direction) to collective effort, and causing willing effort to be expended to achieve purpose (Jacobs & Jacques, 1990: 281).',
                sourceAuthor: 'Jacobs & Jacques (1990)'
              },
              {
                term: 'Leadership (Northouse, 2004)',
                definition: 'A process whereby an individual influences a group of individuals to achieve a common goal (Northouse, 2004: 3).',
                sourceAuthor: 'Northouse (2004)'
              },
              {
                term: 'Leadership (Batten, 1989)',
                definition: 'Development of a clear and complete system of expectations in order to identify, evoke and use the strengths of all resources in the organization, the most important of which is people (Batten, 1989: 35).',
                sourceAuthor: 'Batten (1989)'
              },
              {
                term: 'Leadership (Cribbin, 1981)',
                definition: 'An influence process that enables managers to get their people to do willingly what must be done, and do well what ought to be done.',
                sourceAuthor: 'Cribbin (1981)'
              }
            ],
            content: `History of leadership can be traced far back to the time of creation, when God created all creatures including humans, and ordered Adam to oversee and name other animals (Gen. 2:19-20), thereby making Adam the first leader in existence.

Research into leadership has evolved through distinct chronological phases:
1. Trait theories (Argyris, 1955; Mahoney et al., 1960; Stogdill, 1948) which assumed successful leaders possess innate personal qualities distinguishing them from non-leaders.
2. Style and Behavioural approaches (Hemphill & Coons, 1957; Likert, 1961) which shifted focus from leader traits to leader actions and styles (e.g. democratic vs autocratic).
3. Situational and Contingency theories (Fiedler, 1967; House, 1971; Vroom & Yetton, 1974) emphasizing that leader effectiveness is context-sensitive.
4. Transactional versus Transformational leadership (Bass & Avolio, 1993; Bycio et al., 1995; Howell & Avolio, 1993).

Empirical verification of leadership impact on performance was demonstrated by Thorlindsson (1987) in a detailed study of fishing ship captains under identical physical conditions, showing that captains' leadership qualities accounted for 35% to 49% of variation in fish catch across different crews.

Key Academic Definitions:
- Batten (1989: 35): "Leadership is a development of a clear and complete system of expectations in order to identify, evoke and use the strengths of all resources in the organization the most important of which is people."
- Bennis (1997): "Leadership is a function of knowing yourself, having a vision that is well communicated, building trust among colleagues, and taking effective action to realize your own leadership potential."
- Jacobs & Jacques (1990: 281): "Leadership is a process of giving purpose (meaningful direction) to collective effort, and causing willing effort to be expended to achieve purpose."
- Hollander (1978: 1): "Leadership is a process of influence between a leader and those who are followers."
- Northouse (2004: 3): "Leadership is a process whereby an individual influences a group of individuals to achieve a common goal."
- Cribbin (1981): "Leadership is an influence process that enables managers to get their people to do willingly what must be done, do well what ought to be done."
- Rauch & Behling (1984: 46): "Leadership is defined as the process of influencing the activities of an organized group toward goal achievement."`,
            summaryPoints: [
              'Thorlindsson (1987) proved leadership accounts for 35% to 49% of performance differences under identical conditions.',
              'Leadership fundamentally centers on influence, meaningful direction, and eliciting willing effort from followers.',
              'Major historical phases: Trait approach -> Behavioural/Style approach -> Situational/Contingency approach -> Transformational.'
            ],
            simplifiedExplanation: {
              analogy: 'Think of leadership like the captain of a fishing trawler (as tested by Thorlindsson). Two crews can have identical ships, identical nets, and fish the same ocean, but the captain who communicates purpose and motivates the crew catches nearly 50% more fish.',
              plainEnglish: 'Leadership is not about bossing people around; it is the art of giving people clear direction and inspiring them to willingly give their best effort.',
              keyTakeaway: 'According to NOUN ENT 304, leadership is an influence process that gives meaningful purpose to collective effort.',
              examTip: 'Cite Jacobs & Jacques (1990) or Northouse (2004) verbatim to score full definition marks in Section A questions.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-1-1',
                questionType: 'written_definition',
                prompt: 'Define the term "Leadership" according to at least two textbook authorities (e.g. Jacobs & Jacques, Northouse, or Batten) and explain how Thorlindsson (1987) empirically proved the impact of leadership on performance.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Unit 1, Section 3.1, pp. 11–13',
                expectedAnswerGuide: '1. Definition: Jacobs & Jacques (1990: 281) define leadership as "a process of giving purpose (meaningful direction) to collective effort, and causing willing effort to be expended to achieve purpose." Alternatively, Northouse (2004: 3) defines it as "a process whereby an individual influences a group of individuals to achieve a common goal." 2. Thorlindsson (1987) empirical study: Studied fishing ship captains over three years under identical conditions, revealing that leadership qualities accounted for 35% to 49% of variation in the catch of different crews, demonstrating that performance differences are directly attributable to leadership skill rather than luck or material resources.',
                keyRubricPoints: [
                  'Verbatim or accurate definition citing Jacobs & Jacques (1990) or Northouse (2004) or Batten (1989)',
                  'Identification of leadership as an influence process causing willing effort and shared goal attainment',
                  'Thorlindsson (1987) study of fishing ship captains cited',
                  'Mention of 35% to 49% variation in catch attributable to leadership skills under identical conditions'
                ],
                examinerTips: 'Include both the exact definition and the 35%-49% empirical statistic from Thorlindsson to receive 10/10.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 1 Question 1'
              }
            ]
          },
          {
            id: 'top-ent304-1-2',
            title: '11 Principles of Leadership, 6 Types of Leaders, and Leader Qualities',
            readingMinutes: 7,
            sourceReference: 'ENT 304, Unit 1, Sections 3.2–3.4, pp. 18–22',
            textbookDefinitions: [
              {
                term: 'Charismatic Leader',
                definition: 'A leader who gains influence mainly from strength of personality. Exceptional qualities that transform others into willing followers; cannot be acquired purely by training.',
                sourceAuthor: 'Mullins L.J (1985)'
              },
              {
                term: 'Traditional Leader',
                definition: 'A leader whose position is assured by birth (e.g. kings, queens, tribal chieftains). Rare outside family businesses.',
                sourceAuthor: 'Mullins L.J (1985)'
              },
              {
                term: 'Situational Leader',
                definition: 'A leader whose influence is effective primarily by being in the right place at the right time. Temporary in nature.',
                sourceAuthor: 'Mullins L.J (1985)'
              },
              {
                term: 'Appointed Leader',
                definition: 'A leader whose influence arises directly out of hierarchical position and legitimate power (e.g. managers and supervisors).',
                sourceAuthor: 'Mullins L.J (1985)'
              },
              {
                term: 'Functional Leader',
                definition: 'A leader who secures leadership position by adapting behaviour to meet the competing functional needs of the situation.',
                sourceAuthor: 'Mullins L.J (1985)'
              },
              {
                term: 'Principle-Centered Leader',
                definition: 'A leader whose approach is governed by moral and ethical principles involving equity, justice, integrity, honesty, fairness, and trust.',
                sourceAuthor: 'Mullins L.J (1985)'
              }
            ],
            content: `3.2 Principles of Leadership (U.S. Army, 1983)
To help you 'be, know, and do', follow these eleven principles:
1. Know yourself and seek self-improvement: Understand your be, know, and do attributes through self-study, reflection, and feedback.
2. Be technically proficient: Know your job and maintain solid familiarity with employees' tasks.
3. Seek responsibility and take responsibility for your actions: Search for ways to guide the organization; never blame others when things go wrong.
4. Make sound and timely decisions: Use good problem solving, decision making, and planning tools.
5. Set the example: Be a role model. As Mahatma Gandhi stated: "We must become the change we want to see."
6. Know your people and look out for their well-being: Understand human nature and sincerely care for workers.
7. Keep your workers informed: Communicate effectively with subordinates, seniors, and key stakeholders.
8. Develop a sense of responsibility in your workers: Foster good character traits that help them discharge obligations.
9. Ensure tasks are understood, supervised, and accomplished: Clear communication is the key.
10. Train as a team: Transform groups into authentic, cohesive teams rather than disconnected individuals.
11. Employ your team in accordance with its capabilities.

3.3 Types of Leaders (Mullins L.J, 1985):
1. Charismatic Leader: Influence from sheer strength of personality.
2. Traditional Leader: Position assured by birth or lineage (kings, queens).
3. Situational Leader: Influence effective only at a particular place and time.
4. Appointed Leader: Bureaucratic authority stemming from hierarchical position.
5. Functional Leader: Adapts behavior to meet competing functional needs.
6. Principle-Centered Leader: Guided by moral principles, equity, and integrity.

3.4 Qualities of Leaders (Kouzes & Posner, 2002):
Based on a study of 75,000 respondents on six continents over 15 years:
1. Honesty: Ranked #1 quality. Morally upright, unpretentious, true to oath.
2. Forward Oriented: Visionary 'Can Do' mindset, seeing ahead.
3. Competence: Technically and relationally competent generalist.
4. Inspiring: Stimulates followers to achieve extraordinary goals.
5. Intelligent: Sensible, rational, first-class decision maker.
6. Fair-Minded: Maintains balance between firmness and flexibility.
7. Broad-Minded: Vast in thought and deed, open to opportunities.
8. Self-Control: Exemplary self-discipline and emotional restraint.`,
            summaryPoints: [
              '11 U.S. Army (1983) principles guide leader actions, decision making, and team development.',
              'Mullins (1985) delineates 6 leader categories: Charismatic, Traditional, Situational, Appointed, Functional, Principle-Centered.',
              'Kouzes & Posner (2002) surveyed 75,000 people and confirmed Honesty is the foremost trait expected of leaders.'
            ],
            simplifiedExplanation: {
              analogy: 'A leader’s qualities are like the structural columns of a bridge. Without honesty at the center, the bridge collapses no matter how intelligent or forward-looking the design appears.',
              plainEnglish: 'To lead well, you must master yourself, care for your team, lead by personal example, and remain completely honest in all dealings.',
              keyTakeaway: 'Mullins gives 6 leader types; Kouzes & Posner identify 8 qualities, with Honesty ranked first.',
              examTip: 'Questions asking for "qualities of leadership" require listing Honesty first, followed by Forward-Oriented, Competence, Inspiring, and Self-Control.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-1-2',
                questionType: 'written_structured',
                prompt: 'List and explain the six types of leaders identified by Mullins L.J (1985) and discuss the top three qualities of leaders found in the Kouzes and Posner (2002) global study.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Unit 1, Sections 3.3–3.4, pp. 19–21',
                expectedAnswerGuide: '1. Six Types of Leaders (Mullins, 1985): (a) Charismatic: gains influence through strength of personality and innate qualities. (b) Traditional: position assured by birth/lineage (e.g. royalty). (c) Situational: influence depends on being in the right place at the right time. (d) Appointed: bureaucratic power arising from formal hierarchical position. (e) Functional: adapts behavior to solve task and situational needs. (f) Principle-Centered: guided by moral/ethical principles of justice, equity, and trust. 2. Kouzes & Posner (2002) Top Qualities: (a) Honesty (#1 quality): uprightness and integrity to followers and oath of office. (b) Forward-Oriented: having a clear vision and "Can Do" attitude. (c) Competence: technical and human-relations capability to guide the team.',
                keyRubricPoints: [
                  'Accurate naming and explanation of Mullins 6 leader types',
                  'Identification of Charismatic, Traditional, Situational, Appointed, Functional, Principle-Centered',
                  'Kouzes & Posner 2002 study reference (75,000 people)',
                  'Honesty identified as the #1 ranked quality',
                  'Forward-oriented and competence explained'
                ],
                examinerTips: 'Make sure you explicitly identify Honesty as number one, as emphasized in the research findings.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 1 Question 2'
              }
            ]
          }
        ]
      },

      // Unit 2
      {
        id: 'unit-ent304-2',
        unitNumber: '2',
        title: 'Unit 2: Principles of Leadership',
        objectives: [
          'Explain the five-stage Roadmap to Leadership by Kouzes & Posner (1987)',
          'Describe the three core Leadership Aspects identified by Kouzes (2002)',
          'Identify and evaluate the five sources of power formulated by French and Raven (1990)'
        ],
        unitRecapPoints: [
          'Roadmap to Leadership (Kouzes & Posner, 1987): Challenge the process, Inspire a shared vision, Enable others to act, Model the way, Encourage the hearts.',
          'Three leadership aspects: Challenge the process, Inspiring, and Modeling.',
          'French and Raven (1990) identify five power sources: Legitimate, Reward, Coercive, Reference, and Expert power.'
        ],
        topics: [
          {
            id: 'top-ent304-2-1',
            title: 'Roadmap to Leadership and the Three Leadership Aspects',
            readingMinutes: 5,
            sourceReference: 'ENT 304, Unit 2, Sections 3.1–3.2, pp. 23–24',
            textbookDefinitions: [
              {
                term: 'Roadmap to Leadership',
                definition: 'The common path to great leadership synthesized by Kouzes & Posner (1987): 1. Challenge the process, 2. Inspire a shared vision, 3. Enable others to act, 4. Model the way, 5. Encourage the hearts.',
                sourceAuthor: 'Kouzes & Posner (1987)'
              }
            ],
            content: `3.1 Roadmap to Leadership (Kouzes & Posner, 1987)
Successful leaders share a five-step path to greatness:
1. Challenge the process: Find a process that needs improvement most; be innovative rather than accepting the age-old status quo.
2. Inspire a shared vision: Communicate vision in plain words that followers understand and embrace.
3. Enable others to act: Equip followers with the tools, authority, and methods to solve problems.
4. Model the way: Get your hands dirty when things get tough. "A boss tells others what to do; a leader shows that it can be done."
5. Encourage the hearts: Share the glory and celebrations with your followers while carrying difficulties and personal pain within yourself.

3.2 Leadership Aspects (Kouzes J.M, 2002)
Leadership is defined as the ability to inspire other people to accomplish a preset objective. Kouzes identifies three major aspects:
1. Challenge the process: Finding easier, innovative ways to achieve goals without settling for outdated routines.
2. Inspiring: Clearly communicating organizational goals so people understand why their work matters.
3. Modeling: Teaching by personal example, working with highest standards, and expecting high quality from others.`,
            summaryPoints: [
              'Kouzes & Posner (1987) five practices: Challenge, Inspire, Enable, Model, Encourage.',
              'Modeling the way contrasts a boss ("do as I say") with a leader ("let me show you how it is done").',
              'Leadership aspects focus on innovation, clear communication, and personal role-modeling.'
            ],
            simplifiedExplanation: {
              analogy: 'A boss sits in the carriage shouting at the horses to pull harder. A leader straps on the harness, walks in the mud in front of the horses, and says "Follow me, we will reach the destination together."',
              plainEnglish: 'Great leaders do not just give instructions; they innovate, explain why the work matters, and demonstrate the standard through their own actions.',
              keyTakeaway: 'The three aspects of leadership are Challenge the process, Inspiring, and Modeling.',
              examTip: 'Remember the five roadmap steps verbatim: Challenge, Inspire, Enable, Model, Encourage.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-2-1',
                questionType: 'written_process',
                prompt: 'Explain the five-stage Roadmap to Leadership formulated by Kouzes and Posner (1987) and distinguish between a boss and a leader in modeling the way.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Unit 2, Section 3.1, pp. 23–24',
                expectedAnswerGuide: 'The five stages of the Roadmap to Leadership (Kouzes & Posner, 1987) are: (1) Challenge the process: seek improvement and innovate rather than settling for outdated routines. (2) Inspire a shared vision: communicate goals clearly so followers understand and embrace them. (3) Enable others to act: provide tools and methods to empower people to solve problems. (4) Model the way: lead by example. A boss tells others what to do; a leader gets their hands dirty and shows that it can be done. (5) Encourage the hearts: share glory with followers while bearing difficulties personally.',
                keyRubricPoints: [
                  'List all 5 stages in order: Challenge the process, Inspire shared vision, Enable others to act, Model the way, Encourage the hearts',
                  'Explanation of each stage',
                  'Distinction that a boss tells others what to do while a leader demonstrates and shows it can be done'
                ],
                examinerTips: 'Clearly articulate the distinction between bossing and modeling.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 2 Question 2'
              }
            ]
          },
          {
            id: 'top-ent304-2-2',
            title: 'Five Sources of Leadership Power (French & Raven, 1990)',
            readingMinutes: 5,
            sourceReference: 'ENT 304, Unit 2, Section 3.3, pp. 24–25',
            textbookDefinitions: [
              {
                term: 'Power',
                definition: 'The ability to command people’s obedience and influence their behavior.',
                sourceAuthor: 'ENT 304 / French & Raven (1990)'
              },
              {
                term: 'Legitimate Power',
                definition: 'Power based on one’s official hierarchical position within an organizational structure.',
                sourceAuthor: 'French & Raven (1990)'
              },
              {
                term: 'Reward Power',
                definition: 'Power stemming from the control over tangible or intangible rewards valued by subordinates.',
                sourceAuthor: 'French & Raven (1990)'
              },
              {
                term: 'Coercive Power',
                definition: 'Power based on fear of punishment, sanctions, or unpleasant consequences for failure to comply.',
                sourceAuthor: 'French & Raven (1990)'
              },
              {
                term: 'Reference (Referent) Power',
                definition: 'Power based on followers’ personal admiration, identification with, and desire to be like the leader.',
                sourceAuthor: 'French & Raven (1990)'
              },
              {
                term: 'Expert Power',
                definition: 'Power stemming from perceived and demonstrated technical competence, knowledge, and analytical skill.',
                sourceAuthor: 'French & Raven (1990)'
              }
            ],
            content: `3.3 Leadership Power and Sources (French and Raven, 1990)
Power refers to the ability to command people's obedience. French and Raven distinguished five distinct sources through which individuals exert influence:

1. Legitimate Power:
Derived from the formal hierarchical position an individual holds. For example, a corporation president has greater legitimate power than the vice-president of manufacturing, and the vice-president has more power than a first-line supervisor to decide capital expenditure and work flow.

2. Reward Power:
Stems from control over incentives valued by subordinates (promotions, salary increases, favorable assignments). Subordinates obey because they believe compliance will be rewarded.

3. Coercive Power:
Ground in fear. Subordinates alter behavior because they believe defiance will lead to disciplinary sanctions, demotion, or dismissal.

4. Reference (Referent) Power:
Rests on followers' personal identification with, charisma of, and admiration for the leader. Followers comply because they want to emulate the leader.

5. Expert Power:
Arises from demonstrated knowledge, specialized competence, and intellectual capability to analyze, evaluate, and solve complex problems.`,
            summaryPoints: [
              'Five sources of power: Legitimate (positional), Reward, Coercive (fear), Reference (charisma/admiration), and Expert (competence).',
              'Legitimate and coercive power come with office; expert and reference power come from personal attributes.'
            ],
            simplifiedExplanation: {
              analogy: 'A police officer has legitimate power because of the uniform. A doctor has expert power because of medical knowledge. A beloved mentor has reference power because people admire them.',
              plainEnglish: 'Leaders get power either from their job title and ability to reward/punish, or from their personal skills and the respect they earn.',
              keyTakeaway: 'The five sources of power (French & Raven) are Legitimate, Reward, Coercive, Reference, and Expert.',
              examTip: 'Exam questions often ask to contrast Legitimate power with Expert power.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-2-2',
                questionType: 'written_structured',
                prompt: 'Identify and explain the five sources of power available to leaders according to French and Raven (1990). Provide examples for each.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Unit 2, Section 3.3, pp. 24–25',
                expectedAnswerGuide: 'French and Raven (1990) distinguish five sources of power: (1) Legitimate Power: based on formal organizational hierarchy (e.g. CEO deciding corporate policy). (2) Reward Power: based on control over valued incentives like bonuses and promotions. (3) Coercive Power: based on fear of punishment or termination. (4) Reference Power: based on personal admiration and desire of followers to identify with the leader. (5) Expert Power: based on recognized superior skills, knowledge, and competence.',
                keyRubricPoints: [
                  'Legitimate power defined with hierarchical example',
                  'Reward power defined with incentive example',
                  'Coercive power defined with fear/punishment example',
                  'Reference power defined with identification/charisma example',
                  'Expert power defined with knowledge/competence example'
                ],
                examinerTips: 'Cite French and Raven (1990) and clearly explain all five types.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 2 Question 1'
              }
            ]
          }
        ]
      },

      // Unit 3
      {
        id: 'unit-ent304-3',
        unitNumber: '3',
        title: 'Unit 3: Types of Leader',
        objectives: [
          'Explain early Trait Theory and its criticisms',
          'Describe Action-Centered Leadership by John Adair (1984)',
          'Analyze the Ohio State Leadership Studies and the Blake & Mouton Managerial Grid',
          'Compare Likert’s Systems of Management, Fiedler’s Contingency Model, and Vroom-Yetton Participatory Model'
        ],
        unitRecapPoints: [
          'Trait theories assumed innate traits; criticized for lack of empirical consistency and cultural bias.',
          'John Adair (1984) Action-Centered Leadership consists of three overlapping circles: Task Needs, Team Maintenance Needs, and Individual Needs.',
          'Blake & Mouton (1964) Managerial Grid maps Concern for Production vs Concern for People across 81 positions (1.1, 9.1, 1.9, 5.5, 9.9).',
          'Fiedler (1971) Contingency Model relies on the LPC scale and three situational factors (Leader-Member Relations, Task Structure, Position Power).'
        ],
        topics: [
          {
            id: 'top-ent304-3-1',
            title: 'Trait, Functional, and Action-Centered Leadership (John Adair, 1984)',
            readingMinutes: 6,
            sourceReference: 'ENT 304, Unit 3, Sections 3.1.1–3.1.4, pp. 27–31',
            textbookDefinitions: [
              {
                term: 'Action-Centered Leadership',
                definition: 'A functional model of leadership developed by John Adair (1984) where leader effectiveness depends upon satisfying three overlapping areas of need: Task needs, Team maintenance needs, and Individual needs.',
                sourceAuthor: 'John Adair (1984)'
              }
            ],
            content: `3.1.2 The Trait Theory
Early leadership research attempted to identify physical, intellectual, and personality traits distinguishing leaders from non-leaders (Argyris, 1955; Stogdill, 1948). Common myths held that leaders are naturally taller and more aggressive (e.g. Abraham Lincoln, Charles De Gaulle).
Criticisms:
- Cultural bias in selection.
- The 'glass ceiling' preventing women from top executive roles despite equal effectiveness (Donnell & Hall, 1980).
- Failure across hundreds of studies to isolate a single universal trait ensuring leadership success.

3.1.3 The Functional or Group Approach
Shifts focus from the leader's personality to the functions performed within a group. It asserts that leadership skills can be learned, developed, and perfected (Kotler, 1990).

3.1.4 Action-Centered Leadership (John Adair, 1984)
Adair symbolizes leadership effectiveness as three overlapping circles:
1. Task Functions:
- Defining group task and objectives
- Planning work and allocating resources
- Organizing duties and controlling quality
- Reviewing progress

2. Team Maintenance Functions:
- Maintaining morale and building team spirit
- Ensuring cohesiveness and discipline
- Establishing communication systems
- Appointing sub-leaders and training the group

3. Individual Functions:
- Meeting individual needs and attending to personal problems
- Giving praise, recognition, and status
- Reconciling conflicts between individual and group needs
- Training individuals

The core principle: Action in any one circle directly affects the other two circles. Complete integration of all three yields optimal organizational performance.`,
            summaryPoints: [
              'Trait theory failed because no consistent set of innate traits guarantees leadership success.',
              'Adair (1984) Action-Centered Model balances Task, Team, and Individual needs in three overlapping circles.',
              'Neglecting individual needs harms team morale, which in turn causes task failure.'
            ],
            simplifiedExplanation: {
              analogy: 'Imagine juggling three interconnected balls labeled Task, Team, and Individual. If you drop the Individual ball (ignore personal problems), the Team ball wobbles (morale drops), and the Task ball crashes (deadlines missed).',
              plainEnglish: 'Good leaders balance three things: getting the work done, keeping the team united, and supporting each individual person.',
              keyTakeaway: 'John Adair’s three circles are Task needs, Team maintenance needs, and Individual needs.',
              examTip: 'Examiners expect you to list the specific functions under each of Adair’s three circles.'
            },
            tables: [
              {
                title: 'Table 3.1: John Adair (1984) Action-Centered Functions Breakdown',
                headers: ['Task Functions', 'Team Maintenance Functions', 'Individual Functions'],
                rows: [
                  ['Achieving work group objectives', 'Maintaining morale and team spirit', 'Meeting individual needs'],
                  ['Defining group task & planning', 'Ensuring group cohesiveness', 'Attending to personal problems'],
                  ['Allocation of resources & duties', 'Setting standards & discipline', 'Giving praise and status'],
                  ['Controlling quality & performance', 'Establishing communication systems', 'Reconciling group/individual conflicts']
                ],
                sourceCitation: 'ENT 304, Unit 3, Section 3.1.4, p. 30'
              }
            ],
            writtenQuestions: [
              {
                id: 'wq-ent304-3-1',
                questionType: 'written_discussion',
                prompt: 'Discuss John Adair’s (1984) Action-Centered Leadership theory. Outline the specific functions required under Task, Team Maintenance, and Individual needs.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Unit 3, Section 3.1.4, pp. 29–31',
                expectedAnswerGuide: 'John Adair (1984) formulated Action-Centered Leadership, represented by three overlapping circles: Task Needs, Team Maintenance Needs, and Individual Needs. Effectiveness requires balancing all three, as action in one affects the others. 1. Task Functions: defining group tasks, planning work, allocating resources, organizing duties, controlling quality, reviewing progress. 2. Team Maintenance Functions: maintaining morale, ensuring cohesiveness, setting discipline, establishing communication systems, training the group. 3. Individual Functions: meeting individual needs, attending to personal problems, giving praise/status, reconciling conflicts.',
                keyRubricPoints: [
                  'Three overlapping circles identified: Task, Team Maintenance, Individual',
                  'Interdependence principle explained (action in one affects others)',
                  'At least 3 specific Task functions listed',
                  'At least 3 specific Team maintenance functions listed',
                  'At least 3 specific Individual functions listed'
                ],
                examinerTips: 'List the distinct bullet points under each of the three circles for maximum marks.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 3 Question 1'
              }
            ]
          },
          {
            id: 'top-ent304-3-2',
            title: 'Behavioral Approaches, Managerial Grid, Likert, Fiedler, and Vroom-Yetton',
            readingMinutes: 8,
            sourceReference: 'ENT 304, Unit 3, Sections 3.1.5–3.1.13, pp. 31–46',
            textbookDefinitions: [
              {
                term: 'Managerial Grid',
                definition: 'A two-dimensional leadership model developed by Blake and Mouton (1964) plotting Concern for Production (horizontal axis) against Concern for People (vertical axis) on a 1 to 9 scale.',
                sourceAuthor: 'Robert Blake & James Mouton (1964)'
              },
              {
                term: 'Likert’s Participative Team (System 4)',
                definition: 'The ideal management system where employees are fully involved in setting goals and making work-related decisions with supportive management.',
                sourceAuthor: 'Rensis Likert (1967)'
              },
              {
                term: 'Least Preferred Co-worker (LPC)',
                definition: 'A scale used by Fiedler (1971) to measure leadership style; high LPC indicates relationship-oriented, low LPC indicates task-oriented.',
                sourceAuthor: 'Fred Fiedler (1971)'
              }
            ],
            content: `3.1.5 Behavioural Approach & Ohio State Studies (1957)
Stogdill et al. identified two independent dimensions:
1. Initiating Structure: Goal setting, defining tasks, structuring roles.
2. Consideration: Mutual trust, respect, two-way communication, and warmth.

3.1.6 The Managerial Grid (Blake & Mouton, 1964)
Identifies 81 interactions; 5 primary positions:
- 1.1 Impoverished Management: Low concern for people and production (laissez-faire).
- 9.1 Authoritarian Management: High concern for production, low concern for people (stern taskmaster).
- 1.9 Country Club Management: High concern for people, low concern for production.
- 5.5 Middle-of-the-Road Management: Compromise and moderate concern for both.
- 9.9 Team Management: High concern for both people and production (the ideal style).

3.1.7 Likert’s Systems of Management (1967)
1. Explosive Autocratic: Total managerial control via threats and punishment.
2. Benevolent Autocratic: Management decides; limited employee flexibility.
3. Consultative: Management consults employees before deciding.
4. Participative Team: Full employee involvement in goal-setting (recommended).

3.1.10 Fiedler’s Contingency Model (1971)
Argues leadership style is rigid; effectiveness requires matching leader to the situation.
Three situational variables determine favorableness:
1. Leader-Member Relations: Degree of trust and loyalty (most important).
2. Task Structure: Degree of routine clarity vs complexity.
3. Leader’s Position Power: Extent of formal authority.
Low LPC (task-motivated) leaders perform best in very favorable (octants 1, 2, 3) or very unfavorable situations (octant 8). High LPC (relationship-motivated) leaders excel in intermediate situations (octants 4, 5, 6, 7).

3.1.13 Vroom & Yetton Participatory Model (1973)
Uses a decision tree (Questions A–G) to select from 5 decision styles:
- AI (Autocratic I): Leader solves problem alone with existing data.
- AII (Autocratic II): Leader gets info from subordinates, then decides alone.
- CI (Consultative I): Leader shares problem with subordinates individually, then decides.
- CII (Consultative II): Leader shares problem with subordinates as a group, then decides.
- G (Group): Consensus decision with leader as coordinator.`,
            summaryPoints: [
              'Blake & Mouton (1964) 9.9 Team Management combines high concern for production and people.',
              'Likert (1967) recommends System 4 (Participative Team).',
              'Fiedler (1971) uses LPC and 3 situational variables; low LPC leaders excel in extreme situations, high LPC in moderate ones.',
              'Vroom & Yetton (1973) provides a mathematical decision tree for 5 participatory styles (AI, AII, CI, CII, G).'
            ],
            simplifiedExplanation: {
              analogy: 'Fiedler says you cannot change a tiger into an elephant. If the weather is dry and rugged, bring the tiger (low LPC task leader). If the environment needs gentle diplomacy, bring the elephant (high LPC relationship leader).',
              plainEnglish: 'Different situations require different styles. The Managerial Grid advises striving for high people + high task focus (9.9), while Fiedler proves that extreme crisis situations need directive task leadership.',
              keyTakeaway: 'The five positions on Blake & Mouton’s grid are 1.1, 9.1, 1.9, 5.5, and 9.9.',
              examTip: 'Expect exam questions asking to contrast Fiedler’s Contingency Model with Blake & Mouton’s Managerial Grid.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-3-2',
                questionType: 'written_difference',
                prompt: 'Differentiate between the five extreme leadership positions on the Blake and Mouton (1964) Managerial Grid and explain Fiedler’s (1971) three situational variables.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Unit 3, Sections 3.1.6 & 3.1.10, pp. 32–38',
                expectedAnswerGuide: '1. Blake & Mouton (1964) 5 Positions: (a) 1.1 Impoverished: low concern for people and production; (b) 9.1 Authoritarian: high production, low people (stern taskmaster); (c) 1.9 Country Club: high people, low production; (d) 5.5 Middle-of-the-Road: moderate compromise; (e) 9.9 Team Management: high people, high production (ideal style). 2. Fiedler (1971) Three Situational Variables: (a) Leader-Member Relations: level of trust, confidence, and loyalty between leader and subordinates (most critical factor); (b) Task Structure: degree to which tasks are structured and routine vs complex; (c) Leader Position Power: formal authority vested in the position to reward or punish.',
                keyRubricPoints: [
                  'All 5 Managerial Grid positions correctly identified with coordinates (1.1, 9.1, 1.9, 5.5, 9.9)',
                  'Explanation of each grid position',
                  'Fiedler three situational variables correctly listed: Leader-member relations, Task structure, Position power',
                  'Explanation of why leader-member relations is most critical'
                ],
                examinerTips: 'Clearly write down the coordinate numbers (9.1, 1.9, etc.) along with the official names.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 3 Question 2'
              }
            ]
          }
        ]
      },

      // Unit 4
      {
        id: 'unit-ent304-4',
        unitNumber: '4',
        title: 'Unit 4: Qualities of Leaders',
        objectives: [
          'Explain Leader-Member Exchange (LMX) Theory and the in-group versus out-group dynamic',
          'Describe Charismatic Leadership Theory and its six identifying features (Robert House, 1980)',
          'Contrast Transactional Leadership with Transformational Leadership',
          'Examine the four components of Transformational Leadership (Yalokwu, 2006)'
        ],
        unitRecapPoints: [
          'LMX Theory (Bedian, 1993): Leaders develop different quality exchanges with in-group (high trust/support) vs out-group (mechanistic/rules).',
          'Charismatic Leadership (House, 1980; Bennis, 1978): Vision, self-confidence, strong conviction, and out-of-the-ordinary behavior.',
          'Transactional leadership focuses on exchanges and management by exception.',
          'Transformational leadership (Bass, 1985; Yalokwu, 2006) operates through 4 I’s: Charisma, Inspiration, Individualized Consideration, Intellectual Stimulation.'
        ],
        topics: [
          {
            id: 'top-ent304-4-1',
            title: 'LMX Theory, Charismatic Leadership, and Transformational Leadership',
            readingMinutes: 7,
            sourceReference: 'ENT 304, Unit 4, Sections 3.1–3.5, pp. 46–52',
            textbookDefinitions: [
              {
                term: 'Leader-Member Exchange (LMX) Theory',
                definition: 'A theory holding that leadership is a one-on-one exchange where leaders behave differently toward different subordinates, creating an in-group (high trust) and an out-group (formal authority).',
                sourceAuthor: 'Bedian (1993)'
              },
              {
                term: 'Transformational Leadership',
                definition: 'Leadership built on top of transactional leadership that inspires followers to transcend self-interest for the organizational good through charisma, inspiration, individualized consideration, and intellectual stimulation.',
                sourceAuthor: 'Bass (1985) / Yalokwu (2006)'
              }
            ],
            content: `3.1 Leader-Member Exchange (LMX) Theory
Unlike traditional theories assuming uniform leader behavior, LMX theory (Bedian, 1993) argues leadership is a series of dyadic exchanges:
- In-Group: Higher quality exchanges characterized by mutual trust, support, and social interaction. In-group members perform better and have higher job satisfaction.
- Out-Group: Lower quality exchanges characterized by formal supervision, strict adherence to rules, and low trust.

3.2 Charismatic Leadership Theory
Followers attribute heroic leadership abilities when observing specific behaviors. Robert House (1980) identified six features:
1. Self-confidence: Complete confidence in judgment.
2. A vision: An idealized future state superior to status quo.
3. Ability to articulate vision: Communicating in understandable, compelling terms.
4. Strong conviction about vision: Willingness to take personal risk and self-sacrifice.
5. Behavior out of the ordinary: Novel, unconventional actions evoking admiration.
6. Environmental sensitivity: Realistic assessment of constraints and resources.

3.3 Transactional Leadership Theory
Focuses on contractual exchanges:
- Contingent Reward: Rewards for effort and performance.
- Management by Exception: Active searching for deviations from rules.
- Laissez-Faire: Avoidance of decision making.

3.4 Transformational Leadership Theory (Bass, 1985; Yalokwu, 2006)
Transformational leaders play dual roles: the 'mover-and-shaker' (transforming fortunes) and the 'gentle persuader' (converting followers into leaders).
Four Leadership Factors (The 4 I’s):
1. Charisma (Idealized Influence): Provides clear vision, instills pride, and gains trust.
2. Inspiration (Inspirational Motivation): Excites followers that great things are achievable with extra effort.
3. Individualized Consideration: Acts as mentor, recognizes individual differences, and treats followers with respect.
4. Intellectual Stimulation: Promotes new ways of thinking, questions old assumptions, and views problems as challenges.`,
            summaryPoints: [
              'LMX separates subordinates into in-group (high trust/rewards) and out-group (formal control).',
              'Charismatic leaders possess 6 traits including vision, articulation, and personal risk-taking.',
              'Transformational leadership surpasses transactional through Charisma, Inspiration, Individualized Consideration, and Intellectual Stimulation.'
            ],
            simplifiedExplanation: {
              analogy: 'A transactional leader is like a cashier at a shop: "You give me 8 hours of work, I give you a salary." A transformational leader is like a master architect who shows you the blueprint of a cathedral and inspires you to build something legendary together.',
              plainEnglish: 'Transformational leaders don’t just reward workers; they change how workers think, care for them individually, and inspire them to achieve greatness.',
              keyTakeaway: 'The four factors of transformational leadership are Charisma, Inspiration, Individualized Consideration, and Intellectual Stimulation.',
              examTip: 'Be prepared to explain the differences between transactional and transformational leadership.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-4-1',
                questionType: 'written_difference',
                prompt: 'Contrast Transactional Leadership with Transformational Leadership. Fully explain the four leadership factors of transformational leaders identified by Yalokwu (2006).',
                maxMarks: 10,
                sourceReference: 'ENT 304, Unit 4, Sections 3.3–3.4, pp. 50–51',
                expectedAnswerGuide: '1. Contrast: Transactional leadership focuses on contractual exchanges (contingent reward, management by exception), maintaining routine operations through rewards and penalties. Transformational leadership inspires followers to transcend self-interest for the organizational good, transforming followers into leaders. 2. Four Factors (Yalokwu, 2006): (a) Charisma: provides clear vision, instills pride, gains respect and trust. (b) Inspiration: motivates followers to achieve great things through extra effort. (c) Individualized Consideration: treats each follower as an individual worthy of respect, providing mentoring and coaching. (d) Intellectual Stimulation: encourages followers to question old assumptions and view difficulties as creative challenges.',
                keyRubricPoints: [
                  'Clear contrast between transactional (exchange-based) and transformational (vision/change-based)',
                  'Explanation of Charisma (vision and trust)',
                  'Explanation of Inspiration (enthusiasm and motivation)',
                  'Explanation of Individualized Consideration (mentoring and personal care)',
                  'Explanation of Intellectual Stimulation (creativity and problem solving)'
                ],
                examinerTips: 'Name each of the 4 factors clearly and explain their impact on employee performance.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 4 Question 1'
              }
            ]
          }
        ]
      },

      // Unit 5
      {
        id: 'unit-ent304-5',
        unitNumber: '5',
        title: 'Unit 5: Leadership Styles',
        objectives: [
          'Examine the three core leadership styles: Autocratic, Democratic, and Laissez-faire (Bass, 1985)',
          'Analyze the seven other emergent leadership styles in organizations',
          'Evaluate the criteria for selecting an effective situational leadership style'
        ],
        unitRecapPoints: [
          'Bass (1985) identifies three foundational styles: Autocratic (directive), Democratic (participative), and Laissez-faire (hands-off).',
          'Autocratic style uses one-way communication and close supervision; Democratic fosters two-way communication; Laissez-faire grants maximum operational independence.',
          'Emergent styles include Benevolent, Charismatic, People-Oriented, Servant, Task-Oriented, Transactional, and Transformational.',
          'Situational leadership requires matching style to member skills, work nature, organizational environment, and personal inclinations.'
        ],
        topics: [
          {
            id: 'top-ent304-5-1',
            title: 'Autocratic, Democratic, Laissez-Faire, and Emergent Leadership Styles',
            readingMinutes: 6,
            sourceReference: 'ENT 304, Unit 5, Sections 3.1–3.4, pp. 52–60',
            textbookDefinitions: [
              {
                term: 'Autocratic Leadership Style',
                definition: 'A job-centered leadership situation characterized by one-way communication, centralized decision making around the leader, and compliance achieved through legitimate power and fear of punishment.',
                sourceAuthor: 'Bass (1985) / ENT 304'
              },
              {
                term: 'Democratic Leadership Style',
                definition: 'An employee-oriented, participative style where the leader consults subordinates, encourages upward and downward communication, and facilitates group decision making while retaining final accountability.',
                sourceAuthor: 'Bass (1985) / ENT 304'
              },
              {
                term: 'Laissez-Faire Leadership Style',
                definition: 'A hands-off leadership style where the leader exercises minimal power, providing complete operational freedom to highly skilled and self-motivated subordinates.',
                sourceAuthor: 'Bass (1985) / ENT 304'
              }
            ],
            content: `3.1 Autocratic Leadership Style
Characterized by one-way communication, centralized control, and directive supervision. The leader is the sole determiner of what is done and how. Subordinates comply through fear of losing employment. While it generates short-term output gains while the leader is present, it fosters worker alienation, resentment, and dependency.

3.2 Democratic Leadership Style
Characterized by employee orientation, active two-way communication, and consultation. The leader delegates authority, encourages participatory decision-making, and synthesizes available information into optimal choices. This style brings out the best in skilled teams, enhances innovation, and builds organizational loyalty. The leader maintains final responsibility.

3.3 Laissez-Faire Leadership Style
A hands-off approach where the leader exercises minimal control, allowing employees complete freedom to set goals and execute tasks. Works effectively only when group members are highly trained, self-motivated specialists with proven excellence. In unqualified groups, it results in chaos and lack of direction.

3.4 Other Emergent Styles:
1. Benevolent Leadership: Ensures exact compliance with procedures; vital in high-risk safety environments.
2. Charismatic Leadership: High enthusiasm; risks collapse if leader leaves.
3. People-Oriented Leadership: Focuses primarily on supporting and developing staff.
4. Servant Leadership: Leads by meeting team needs and serving others first.
5. Task-Oriented Leadership: Focuses exclusively on deadlines and task completion.
6. Transactional Leadership: Contractual reward-for-performance.
7. Transformational Leadership: Shared vision, inspirational, and empowering.
8. Situational Leadership: Adaptively switching styles based on member experience, work nature, and environment.`,
            summaryPoints: [
              'No single leadership style fits every situation; contingency approach is essential.',
              'Autocratic is suitable for emergency crises; Democratic is optimal for skilled teams; Laissez-faire suits self-directed experts.',
              'Situational leadership adapts style to team maturity and context.'
            ],
            simplifiedExplanation: {
              analogy: 'Autocratic is an emergency surgeon shouting orders in the operating theater. Democratic is a research committee deciding university policy. Laissez-faire is managing a team of Nobel-prize-winning scientists.',
              plainEnglish: 'Autocratic tells people what to do; Democratic asks people for their input before deciding; Laissez-faire lets skilled people manage themselves.',
              keyTakeaway: 'The three traditional styles are Autocratic, Democratic, and Laissez-faire.',
              examTip: 'Exam essays require detailing the advantages, disadvantages, and situational conditions for each style.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-5-1',
                questionType: 'written_discussion',
                prompt: 'Compare and contrast Autocratic, Democratic, and Laissez-faire leadership styles. Explain the circumstances under which each style is most appropriate.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Unit 5, Sections 3.1–3.3, pp. 53–57',
                expectedAnswerGuide: '1. Autocratic: one-way communication, centralized decisions, close supervision, obedience through fear. Appropriate in emergency situations, crises, or with unskilled workers requiring strict direction. 2. Democratic: two-way communication, consultative, shared decision-making, employee-oriented. Appropriate with skilled professionals, dynamic environments, and where team commitment is required. 3. Laissez-faire: hands-off, minimal leader interference, complete operational independence. Appropriate only with highly trained, mature, and self-motivated specialists who require autonomy.',
                keyRubricPoints: [
                  'Detailed explanation of Autocratic style with communication flow',
                  'Detailed explanation of Democratic style with communication flow',
                  'Detailed explanation of Laissez-faire style with communication flow',
                  'Specific organizational circumstances where Autocratic is effective',
                  'Specific organizational circumstances where Democratic and Laissez-faire are effective'
                ],
                examinerTips: 'Mention communication flow (one-way vs two-way) and situational fitness for full marks.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 5 Question 1'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 2: SERVANT LEADERSHIP AND PROBLEM OF LEADERSHIP IN NIGERIA (Units 6 - 8)
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent304-2',
    moduleNumber: 2,
    title: 'Module 2: Servant Leadership and Problem of Leadership in Nigeria',
    units: [
      // Unit 6 (Module 2 Unit 1)
      {
        id: 'unit-ent304-6',
        unitNumber: '6',
        title: 'Unit 6: Servant Leadership',
        objectives: [
          'Examine the origin and concept of servant leadership by Robert Greenleaf (1970/1977)',
          'Explain the four central variables of servant leadership (Spears, 1996)',
          'Detail the ten critical characteristics of servant leaders (Spears, 2002)'
        ],
        unitRecapPoints: [
          'Robert Greenleaf coined the paradoxical term "servant leadership" based on the premise that a true leader is servant first.',
          'Spears (1996) formulated four central variables: Service to Others, Holistic Approach to Work, Sense of Community, and Sharing Power.',
          'Spears (2002) identified 10 characteristics: Listening, Empathy, Healing, Awareness, Persuasion, Conceptualization, Foresight, Stewardship, Commitment to Growth of People, and Building Community.'
        ],
        topics: [
          {
            id: 'top-ent304-6-1',
            title: 'Concept, Central Variables, and Ten Characteristics of Servant Leadership',
            readingMinutes: 7,
            sourceReference: 'ENT 304, Module 2, Unit 1, Sections 3.1–3.3, pp. 60–67',
            textbookDefinitions: [
              {
                term: 'Servant Leadership',
                definition: 'A leadership model which puts serving others as the number one priority. The servant-leader is servant first. It begins with the natural feeling that one wants to serve, then conscious choice brings one to aspire to lead.',
                sourceAuthor: 'Robert Greenleaf (1977/2002)'
              },
              {
                term: 'Greenleaf Best Test',
                definition: 'Do those served grow as persons: do they, while being served, become healthier, wiser, freer, more autonomous, more likely themselves to become servants? And what is the effect on the least privileged in society?',
                sourceAuthor: 'Robert Greenleaf (2002: 27)'
              }
            ],
            content: `3.1 Overview of Servant Leadership
The words 'servant' and 'leader' are usually thought of as opposites. Robert Greenleaf brought them together. Danah Zohar in 'Rewiring the Corporate Brain' (1997) states: "Servant-leadership is the essence of quantum thinking and quantum leadership" (p. 146).

3.2 Definition & Four Central Variables (Spears, 1996: 33)
1. Service to Others: Authentic leadership arises not from exercising power, but from a fundamental desire to help others.
2. Holistic Approach to Work: "The work exists for the person as much as the person exists for the work" (Greenleaf, 1996: 8).
3. Promoting a Sense of Community: Rebuilding community among workers, which Greenleaf termed "the lost knowledge of these times."
4. Sharing of Power in Decision-Making: Cultivating leadership in others. As Russell (2001) stated: "Leaders enable others to act not by hoarding the power they have but by giving it away" (p. 80).

3.3 Ten Characteristics of Servant Leaders (Spears, 2002)
1. Listening: Deep commitment to listening intently and hearing one’s own inner voice.
2. Empathy: Striving to understand and accept colleagues for their unique spirit.
3. Healing: Potential for emotional healing of oneself and others to achieve wholeness.
4. Awareness: General and self-awareness strengthening ethics, power, and values.
5. Persuasion: Reliance on convincing others rather than coercive positional authority (roots in Quaker beliefs).
6. Conceptualization: Thinking beyond day-to-day operational realities to dream great dreams.
7. Foresight: Ability to foresee likely outcomes from past lessons and present realities.
8. Stewardship: "Holding something in trust for another" (Peter Block, 1993).
9. Commitment to the Growth of People: Believing people have intrinsic value beyond tangible contributions.
10. Building Community: Creating authentic community within large corporate institutions.`,
            summaryPoints: [
              'Servant leadership prioritizes the growth and well-being of people and communities.',
              'Greenleaf’s Test assesses whether followers become wiser, healthier, freer, and more autonomous.',
              'The 10 characteristics synthesize listening, empathy, healing, stewardship, and community building.'
            ],
            simplifiedExplanation: {
              analogy: 'A traditional boss sits at the top of the pyramid expecting everyone to lift him up. A servant leader flips the pyramid upside down, standing at the bottom supporting and holding everyone else up.',
              plainEnglish: 'A servant leader focuses on serving workers first—helping them grow and succeed—rather than seeking personal prestige or control.',
              keyTakeaway: 'The servant-leader is servant first; power is shared rather than hoarded (Russell, 2001).',
              examTip: 'Greenleaf’s test ("do those served become healthier, wiser, freer...") is frequently tested in NOUN examinations.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-6-1',
                questionType: 'written_discussion',
                prompt: 'Define Servant Leadership according to Robert Greenleaf. Explain Greenleaf’s "Best Test" and discuss five of the ten characteristics identified by Spears (2002).',
                maxMarks: 10,
                sourceReference: 'ENT 304, Module 2, Unit 1, Sections 3.2–3.3, pp. 61–66',
                expectedAnswerGuide: '1. Definition: Servant leadership puts serving others as the number one priority. It begins with the natural feeling that one wants to serve first, and conscious choice brings one to aspire to lead. 2. Greenleaf’s Best Test (2002: 27): "Do those served grow as persons: do they, while being served, become healthier, wiser, freer, more autonomous, more likely themselves to become servants? And, what is the effect on the least privileged in society; will they benefit, or, at least, not be further deprived?" 3. Five Characteristics (Spears, 2002): (a) Listening: listening intently to what is said and unsaid. (b) Empathy: understanding and accepting others. (c) Healing: healing broken spirits and relationships. (d) Persuasion: consensus-building over coercive authority. (e) Stewardship (Peter Block, 1993): holding institutional assets in trust for the greater good of society.',
                keyRubricPoints: [
                  'Definition of servant leadership (servant first)',
                  'Verbatim or accurate statement of Greenleaf Best Test',
                  'Identification of 5 characteristics from Spears (2002)',
                  'Detailed explanation of each of the 5 chosen characteristics',
                  'Peter Block (1993) stewardship citation included'
                ],
                examinerTips: 'State Greenleaf’s test questions accurately to earn the test-criterion marks.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 6 Question 1'
              }
            ]
          }
        ]
      },

      // Unit 7 (Module 2 Unit 2)
      {
        id: 'unit-ent304-7',
        unitNumber: '7',
        title: 'Unit 7: Leaders as Agent of Change',
        objectives: [
          'Explain the concept of change and Kurt Lewin’s (1947) 3-phase change process',
          'Describe the four dimensions of change management (Nickols, 2016)',
          'Examine the six qualities required of change agent leaders'
        ],
        unitRecapPoints: [
          'Kurt Lewin (1947) divided change into three phases: Unfreezing, Moving, and Refreezing.',
          'Nickols (2016) defined four dimensions: Task of managing change, Area of professional practice, Body of knowledge, and Control mechanism.',
          'Change agent qualities: Coaching, Communication, Involving Others, Motivation, Rewarding (LeBoeuf, 1985), and Promoting Teamwork.'
        ],
        topics: [
          {
            id: 'top-ent304-7-1',
            title: 'Lewin’s 3-Phase Model, Change Dimensions, and Change Agent Qualities',
            readingMinutes: 6,
            sourceReference: 'ENT 304, Module 2, Unit 2, Sections 3.1–3.2, pp. 68–74',
            textbookDefinitions: [
              {
                term: 'Change Process (Lewin, 1947)',
                definition: 'A three-phase process consisting of (1) Unfreezing (readiness to leave comfort zone), (2) Moving (stepping into the new setup), and (3) Refreezing (establishing the new change as standard routine).',
                sourceAuthor: 'Kurt Lewin (1947)'
              }
            ],
            content: `3.1 Concept of Change & Kurt Lewin’s Model (1947)
Over 70% of organizational change plans fail due to lack of implementation know-how (Nickols, 2006). Kurt Lewin conceptualized change as three phases:
1. Unfreezing: Breaking old habits and preparing people to leave comfort zones for future benefits.
2. Moving: Adopting new systems and behaviors; the most fearful stage for employees.
3. Refreezing: Solidifying the new setup into organizational routine and permanent culture (Zaccaro, 2007).

Four Dimensions of Change Management (Nickols, 2016):
(a) The task of managing change: Planned implementation of new systems.
(b) An area of professional practice: Expertise applied by professional change agents.
(c) A body of knowledge: Models, methods, tools, and skills.
(d) A control mechanism: Standards, requirements, processes, and procedures.

3.2 Six Qualities of Leaders as Change Agents:
1. Coaching: Developing synergistic relationships via training, counseling, and mentoring (Gilley & Boughton, 1996; Whitmore, 1997).
2. Communication: Communicating risks of clinging to status quo and rewards of the future (Denning, 2005; Lewis et al., 2006).
3. Involving Others: Employee involvement (EI) programs to reduce resistance and increase performance (Glew et al., 1995; Lawler et al., 1982).
4. Motivation: Driving sustainable energy and direction (Kroth, 2007; Maslow; Vroom).
5. Rewarding: "The things that get rewarded get done" (LeBoeuf, 1985: 9; Ulrich et al., 1999).
6. Promoting Teamwork: Synergistic collaboration achieving more than isolated individuals (Trent, 2004; Towry, 2003).`,
            summaryPoints: [
              'Lewin’s 3 phases: Unfreezing (preparation), Moving (transition), Refreezing (institutionalization).',
              '70% failure rate in change initiatives highlights the critical role of leadership.',
              'Six change agent skills: Coaching, Communication, Involving Others, Motivation, Rewarding, Teamwork.'
            ],
            simplifiedExplanation: {
              analogy: 'To reshape an ice sculpture, you cannot just hammer it (it breaks). You must first unfreeze it (melt into water), move it into the new mold, and refreeze it into the desired shape.',
              plainEnglish: 'Managing change requires convincing people to let go of old routines, guiding them through the uncomfortable transition, and cementing the new procedures.',
              keyTakeaway: 'The three stages of change are Unfreezing, Moving, and Refreezing (Lewin, 1947).',
              examTip: 'Remember LeBoeuf’s rule: "The things that get rewarded get done."'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-7-1',
                questionType: 'written_structured',
                prompt: 'Explain Kurt Lewin’s (1947) three-phase model of change. Detail the four dimensions of change management identified by Nickols (2016).',
                maxMarks: 10,
                sourceReference: 'ENT 304, Module 2, Unit 2, Section 3.1, pp. 69–70',
                expectedAnswerGuide: '1. Lewin’s (1947) Three-Phase Model: (a) Unfreezing: recognizing the need for change, overcoming resistance, and preparing to leave current comfort zones. (b) Moving: transitioning into the new state, adopting new methods and behaviors (stage with highest fear and uncertainty). (c) Refreezing: establishing and stabilizing the change as the new organizational norm and permanent culture. 2. Nickols (2016) Four Dimensions: (a) The task of managing change: planned and systematic implementation. (b) An area of professional practice: specialized expertise of change agents. (c) A body of knowledge: models, methods, techniques, and tools. (d) A control mechanism: standards, requirements, and compliance procedures.',
                keyRubricPoints: [
                  'Unfreezing explained accurately',
                  'Moving explained accurately with psychological difficulty noted',
                  'Refreezing explained accurately as institutionalization',
                  'Four dimensions of Nickols (2016) listed and explained'
                ],
                examinerTips: 'Cite Lewin (1947) and Nickols (2016) clearly.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 7 Question 1'
              }
            ]
          }
        ]
      },

      // Unit 8 (Module 2 Unit 3)
      {
        id: 'unit-ent304-8',
        unitNumber: '8',
        title: 'Unit 8: Problem of Leadership in Nigeria',
        objectives: [
          'Examine Chinua Achebe’s (1983) thesis on the Nigerian leadership problem',
          'Analyze the six core elements of leadership failure in Nigeria',
          'Discuss solutions and core values needed for Nigerian transformation'
        ],
        unitRecapPoints: [
          'Chinua Achebe (1983) famously asserted: "The trouble with Nigeria is simply and squarely a failure of leadership."',
          'Six core elements of the Nigerian leadership problem: Incompetency and Mediocrity, Ethnicity and Tribalism (1946 Arthur Richards regionalism), Mono-economy (1956 Oloibiri oil discovery), Greed and Financial Corruption ($380B stolen - Adebanjo, 2008), Insincerity and Hypocrisy (selective justice), and Lack of National Identity.',
          'Transformation requires patriotic leadership, moral accountability, and putting public good above cabalism (Anazodo & Igbokwe-Ibeto, 2015).'
        ],
        topics: [
          {
            id: 'top-ent304-8-1',
            title: 'Achebe’s Thesis and the Six Elements of Leadership Failure in Nigeria',
            readingMinutes: 7,
            sourceReference: 'ENT 304, Module 2, Unit 3, Sections 1.0–3.1, pp. 75–81',
            textbookDefinitions: [
              {
                term: 'The Trouble with Nigeria (Achebe, 1983)',
                definition: 'The trouble with Nigeria is simply and squarely a failure of leadership. There is nothing wrong with the Nigerian land, climate, water, or air. The Nigerian problem is the unwillingness or inability of its leaders to rise to responsibility and personal example.',
                sourceAuthor: 'Chinua Achebe (1983)'
              }
            ],
            content: `1.0 Introduction to the Nigerian Leadership Problem
Close to sixty years after independence, Nigeria—the largest economy in Africa endowed with human and material resources—remains hindered by poor leadership (Esu, 2001; Nwagboso & Duke, 2012). Symptoms include massive unemployment, insecurity, financial corruption, tribal rivalry, pipeline vandalism, educational crisis, and decay of vital infrastructure (power, health, roads).

3.1 Six Elements Describing the Nigerian Leadership Problem:
1. Incompetency and Mediocrity:
Leadership occupied by theoreticians rather than competent practitioners lacking political will. Leaders intentionally appoint mediocre subordinates to loot without query and select weak successors to cover up malpractices.

2. Ethnicity and Tribalism:
Traceable to 1946 when British Governor-General Sir Arthur Richards introduced Regional Government, dividing Nigeria into NEW (Northern, Eastern, Western Nigeria) with regional Premiers (Oduguwa, 2012). Leaders prioritize their ethnic micro-nations (Hausa-Fulani, Yoruba, Igbo) over national development.

3. Mono-Economy:
Oil discovery on Sunday, 15 January 1956 at Oloibiri Oilfield by Shell Darcy plunged Nigeria into an oil dependency trap. Previous agricultural and solid mineral sectors (cocoa, groundnut, coal, palm oil, fish) were abandoned, fostering corruption, oil theft, and massive unemployment.

4. Greed and Financial Corruption:
Post-independence leaders looted an estimated $380 billion of collective wealth (Adebanjo, 2008). The Babangida regime failed to account for $12.4 billion in Gulf War oil windfalls (Apter, 2005; Igbokwe-Ibeto & Okoye, 2014).

5. Insincerity and Hypocrisy:
Anti-graft agencies (such as EFCC established under Obasanjo) frequently subjected to selective justice—fighting political opponents while shielding corrupt loyalists.

6. Lack of National Identity:
Citizens identify primarily with ethnic and religious groups rather than nationhood. Governance is dominated by cabals rather than meritocracy.

Solutions (Anazodo & Igbokwe-Ibeto, 2015):
Purposeful, visionary leadership; patriotic and nationalistic spirit; transparency and accountability; and fear of God leading to equity for all citizens.`,
            summaryPoints: [
              'Achebe (1983): The Nigerian failure is squarely a failure of leadership, not climate or resources.',
              'Arthur Richards 1946 constitution institutionalized regional ethnic divisions.',
              'Oloibiri oil discovery (Jan 15, 1956) turned Nigeria into a vulnerable mono-economy.',
              'An estimated $380 billion was looted by post-independence leaders (Adebanjo, 2008).'
            ],
            simplifiedExplanation: {
              analogy: 'Nigeria is like a luxury ship with the latest engines and abundant food, but the captains refuse to look at the compass, fight over cabin keys, and drill holes in the hull to sell the scrap metal.',
              plainEnglish: 'Nigeria’s struggles are caused by poor, corrupt leadership and ethnic division, not a lack of natural resources or talent.',
              keyTakeaway: 'The six problems of leadership in Nigeria are Incompetency, Ethnicity/Tribalism, Mono-economy, Greed/Corruption, Insincerity, and Lack of National Identity.',
              examTip: 'Cite Achebe (1983), the 1946 Richards Constitution, and the 1956 Oloibiri oil discovery date.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-8-1',
                questionType: 'written_discussion',
                prompt: 'Discuss Chinua Achebe’s (1983) view on the Nigerian condition and analyze four of the six elements of the leadership problem in Nigeria.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Module 2, Unit 3, Sections 1.0–3.1, pp. 76–80',
                expectedAnswerGuide: '1. Achebe’s (1983) View: "The trouble with Nigeria is simply and squarely a failure of leadership." There is nothing wrong with Nigerian land, climate, water, or air; the issue is the unwillingness or inability of leaders to rise to personal example. 2. Four Elements: (a) Incompetency and Mediocrity: appointment of unqualified persons to facilitate unmonitored looting. (b) Ethnicity and Tribalism: rooted in the 1946 Richards Constitution creating regionalism, leading to parochial nepotism. (c) Mono-economy: post-1956 Oloibiri oil discovery led to neglect of agriculture (cocoa, groundnut) and created an oil-dependent rentier state. (d) Greed and Corruption: looting of public wealth ($380 billion estimated by Adebanjo, 2008).',
                keyRubricPoints: [
                  'Achebe (1983) thesis quoted or explained accurately',
                  'Four elements selected and thoroughly analyzed',
                  'Historical references included (e.g. 1946 Richards Constitution, 1956 Oloibiri discovery, Adebanjo $380B figure)',
                  'Impact on Nigerian national development discussed'
                ],
                examinerTips: 'Cite the specific historical milestones (1946 and 1956) mentioned in the textbook.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 8 Question 1'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 3: CORPORATE GOVERNANCE (Units 9 - 14)
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent304-3',
    moduleNumber: 3,
    title: 'Module 3: Corporate Governance',
    units: [
      // Unit 9 (Module 3 Unit 1)
      {
        id: 'unit-ent304-9',
        unitNumber: '9',
        title: 'Unit 9: Meaning, Objectives and Elements of Effective Corporate Governance',
        objectives: [
          'Define corporate governance from narrow and broad perspectives',
          'Identify the seven core objectives of good corporate governance',
          'Explain the four fundamental elements of corporate governance (Millstein Report, 1998)'
        ],
        unitRecapPoints: [
          'Narrow definition: relations between managers, directors, and shareholders. Broad definition: combination of laws, regulations, listing rules, and voluntary practices.',
          'Seven corporate governance objectives focus on independent board structure, transparency, and stakeholder protection.',
          'Four pillars from the Millstein Report (OECD, 1998): Fairness, Transparency, Accountability, and Responsibility.'
        ],
        topics: [
          {
            id: 'top-ent304-9-1',
            title: 'Definitions, Objectives, and the Four Pillars of Corporate Governance',
            readingMinutes: 6,
            sourceReference: 'ENT 304, Module 3, Unit 1, Sections 3.1–3.3, pp. 83–91',
            textbookDefinitions: [
              {
                term: 'Corporate Governance (Narrow Definition)',
                definition: 'The relationships between corporate managers, directors, and shareholders.',
                sourceAuthor: 'ENT 304 (p. 84)'
              },
              {
                term: 'Corporate Governance (Broad Definition)',
                definition: 'A system of structuring, operating and controlling a company to achieve long-term strategic goals to satisfy shareholders, creditors, employees, customers, suppliers, and regulatory requirements (Mengistae & Xu, 2004).',
                sourceAuthor: 'Mengistae & Xu (2004)'
              }
            ],
            content: `3.1 Meaning of Corporate Governance
- Narrow definition: Focuses on the relationship among corporate managers, directors, and shareholders.
- Broad definition: Encompasses the combination of laws, regulations, listing rules, and voluntary private sector practices that enable corporations to attract capital, perform efficiently, generate profit, and meet legal and societal obligations (Bryan, Nash & Patel, 2002; Mengistae & Xu, 2004).

3.2 Seven Objectives of Corporate Governance:
1. Properly structured Board capable of independent, objective decision making.
2. Balanced Board with adequate representation of non-executive and independent directors.
3. Transparent procedures and practices based on adequate information.
4. Effective machinery to subserve stakeholder concerns.
5. Keeping shareholders informed of developments impacting the company.
6. Regular and effective monitoring of the management team.
7. Board remaining in effective control of corporate affairs at all times.

3.3 Elements of Effective Corporate Governance (Millstein Report / OECD, 1998; Peng, 2001):
1. Fairness: Protection of shareholder rights (including minority and foreign investors) and contract enforceability.
2. Transparency: Timely, accurate disclosure of financial performance, ownership, and governance structures.
3. Accountability: Clarifying governance roles and monitoring managerial performance by the board.
4. Responsibility: Ensuring corporate compliance with societal laws, environmental standards, and ethical values.`,
            summaryPoints: [
              'Effective accountability to all shareholders is the essence of corporate governance (Mengistae & Xu, 2004).',
              'The four OECD pillars are Fairness, Transparency, Accountability, and Responsibility.',
              'Good governance balances profitability with ethical, environmental, and stakeholder demands.'
            ],
            simplifiedExplanation: {
              analogy: 'Corporate governance is like traffic rules and street lights in a busy city. It ensures drivers (managers) do not crash into pedestrians (stakeholders) or run off with the passengers’ money (shareholders).',
              plainEnglish: 'Corporate governance sets up the rules, board supervision, and disclosures that protect investors and make sure companies are run honestly.',
              keyTakeaway: 'The four essential pillars are Fairness, Transparency, Accountability, and Responsibility.',
              examTip: 'Examiners award distinct marks for separating the narrow definition from the broad definition.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-9-1',
                questionType: 'written_structured',
                prompt: 'Define Corporate Governance from both narrow and broad perspectives. Detail the four essential elements articulated in the OECD Millstein Report (1998).',
                maxMarks: 10,
                sourceReference: 'ENT 304, Module 3, Unit 1, Sections 3.1 & 3.3, pp. 84–89',
                expectedAnswerGuide: '1. Narrow Definition: Concerns the internal relationship between corporate managers, directors, and shareholders. Broad Definition: The combination of laws, regulations, listing rules, and voluntary private practices structuring and controlling a company to attract capital, perform efficiently, generate profit, and meet legal and societal obligations (Mengistae & Xu, 2004). 2. Four Elements (Millstein Report / OECD 1998): (a) Fairness: protecting rights of all shareholders, especially minority and foreign investors. (b) Transparency: timely and accurate disclosure of financial performance, governance, and ownership. (c) Accountability: clear board roles in monitoring management. (d) Responsibility: compliance with laws and environmental/societal standards.',
                keyRubricPoints: [
                  'Narrow definition accurately explained',
                  'Broad definition accurately explained citing legal and societal framework',
                  'Fairness pillar explained with minority shareholder protection',
                  'Transparency pillar explained with disclosure standards',
                  'Accountability and Responsibility pillars explained'
                ],
                examinerTips: 'Include both definitions and all four OECD pillars.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 9 Question 1'
              }
            ]
          }
        ]
      },

      // Unit 10 (Module 3 Unit 2)
      {
        id: 'unit-ent304-10',
        unitNumber: '10',
        title: 'Unit 10: Why Corporate Governance Matters and Corporate Governance Theories',
        objectives: [
          'Explain why corporate governance matters to corporations and national economies (Anderson & Reeb, 2003)',
          'Analyze the seven theories of corporate governance',
          'Differentiate between Agency Theory and Stewardship Theory'
        ],
        unitRecapPoints: [
          'Corporate governance impacts asset efficiency, cost of capital, societal expectations, and firm performance (Anderson & Reeb, 2003).',
          'Seven corporate governance theories: Agency, Stakeholder, Resource Dependency, Stewardship, Social Contract, Legitimacy, and Political Theory.',
          'Agency theory views managers as self-interested agents requiring monitoring; Stewardship theory views managers as collectivists acting in the owners’ best interests.'
        ],
        topics: [
          {
            id: 'top-ent304-10-1',
            title: 'Seven Theories of Corporate Governance',
            readingMinutes: 8,
            sourceReference: 'ENT 304, Module 3, Unit 2, Sections 1.0–3.1, pp. 93–107',
            textbookDefinitions: [
              {
                term: 'Agency Theory',
                definition: 'A theory originating from Berle & Means (1932) and Jensen & Meckling (1976) focusing on the separation of ownership and control, creating principal-agent conflicts and requiring monitoring mechanisms and agency costs.',
                sourceAuthor: 'Jensen & Meckling (1976)'
              },
              {
                term: 'Stewardship Theory',
                definition: 'A model of management rooted in social psychology where managers are viewed as good stewards who act in the best interests of owners, seeking dynamic performance equilibrium (Donaldson & Davis, 1991).',
                sourceAuthor: 'Donaldson & Davis (1991)'
              },
              {
                term: 'Stakeholder Theory',
                definition: 'Stipulates that a corporate entity must balance the interests of diverse stakeholders (investors, employees, suppliers, communities, public) rather than serving shareholders alone (Abrams, 1951; Freeman et al., 2004).',
                sourceAuthor: 'Freeman et al. (2004)'
              }
            ],
            content: `1.0 Why Corporate Governance Matters (Anderson & Reeb, 2003)
Impacts four core dimensions:
(a) Efficiency of asset employment
(b) Ability to attract lower-cost capital
(c) Meeting societal expectations
(d) Overall firm performance

3.1 Seven Theories of Corporate Governance:
1. Agency Theory (Berle & Means, 1932; Jensen & Meckling, 1976):
Separation of ownership (shareholders/principals) and management (agents). Agents have firm-specific knowledge and may act in self-interest rather than maximizing shareholder wealth. Results in Agency Costs:
- Monitoring expenditure by principals
- Bonding expenditure by agents
- Residual loss

2. Stakeholder Theory (Abrams, 1951; Freeman et al., 2004):
Corporations affect external environments and owe accountability to wider society. Anderson & Reeb (2003) classify stakeholders into:
- Consubstantial: Essential for existence (shareholders, strategic partners, employees).
- Contractual: Formal contracts (suppliers, financial institutions, customers).
- Contextual: Social/natural systems (public administration, local communities, society).

3. Resource Dependency Theory (Pfeffer & Salancik, 1978; Williamson, 1985):
Boards connect the firm with external resources to reduce environmental uncertainty and transaction costs (Hillman et al., 2000).

4. Stewardship Theory (Donaldson & Davis, 1991; Davis et al., 1997):
Contrasts with agency theory. Assumes managers are collectivists and pro-organizational stewards whose utility aligns with organizational success. Supports combining Chairman and CEO roles.

5. Social Contract Theory (Gray, Owen & Adams, 1996; Donaldson & Dunfee, 1999):
Society operates through macro-social and micro-social contracts; businesses owe moral obligations to communities.

6. Legitimacy Theory (Suchman, 1995; Ramanathan, 1976):
Firms must act in accordance with socially constructed norms, values, and beliefs to maintain their license to operate.

7. Political Theory (Pound, 1983; Hawley & Williams, 1996):
Corporate power and privileges are negotiated through government influence, voting power, and public policy.`,
            summaryPoints: [
              'Agency theory (Jensen & Meckling) focuses on reducing agency costs via monitoring and contracts.',
              'Stewardship theory (Donaldson & Davis) views managers as loyal stewards rather than opportunistic agents.',
              'Stakeholders are classified into Consubstantial, Contractual, and Contextual (Anderson & Reeb).'
            ],
            simplifiedExplanation: {
              analogy: 'Agency theory assumes the tenant will trash the apartment unless the landlord checks regularly. Stewardship theory assumes the tenant loves the house and will maintain the garden better than the owner.',
              plainEnglish: 'Agency theory says managers need watching because they might look out for themselves. Stewardship theory says managers want the company to succeed and can be trusted with responsibility.',
              keyTakeaway: 'The seven theories are Agency, Stakeholder, Resource Dependency, Stewardship, Social Contract, Legitimacy, and Political.',
              examTip: 'Expect direct exam questions contrasting Agency Theory with Stewardship Theory.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-10-1',
                questionType: 'written_difference',
                prompt: 'Critically contrast Agency Theory with Stewardship Theory under corporate governance. Outline the three components of agency costs defined by Jensen and Meckling (1976).',
                maxMarks: 10,
                sourceReference: 'ENT 304, Module 3, Unit 2, Sections 3.1.1 & 3.1.4, pp. 96–104',
                expectedAnswerGuide: '1. Contrast: Agency Theory (Jensen & Meckling, 1976) assumes managers are individualistic, self-interested agents who may expropriate shareholder wealth, requiring independent boards to monitor and control them. Stewardship Theory (Donaldson & Davis, 1991) assumes managers are pro-organizational, collectivist stewards whose goals align with firm success, favoring empowerment over control (e.g. combined CEO/Chairman). 2. Three Components of Agency Costs (Jensen & Meckling, 1976): (a) Monitoring expenditure: costs incurred by principals to inspect and limit agent activities (audits, board fees). (b) Bonding expenditure: costs borne by agents to guarantee they will not harm the principal. (c) Residual loss: dollar reduction in welfare resulting from divergence between agent decisions and welfare-maximizing decisions.',
                keyRubricPoints: [
                  'Accurate theoretical contrast between Agency and Stewardship theories',
                  'Behavioral assumptions compared (individualist vs collectivist)',
                  'Governance structure differences (monitoring vs empowering; separated vs combined CEO/Chairman)',
                  'Monitoring expenditure defined',
                  'Bonding expenditure defined',
                  'Residual loss defined'
                ],
                examinerTips: 'Mention all three agency cost components specifically.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 10 Question 1'
              }
            ]
          }
        ]
      },

      // Unit 11 (Module 3 Unit 3)
      {
        id: 'unit-ent304-11',
        unitNumber: '11',
        title: 'Unit 11: Responsibilities and Functions of a Board of Directors',
        objectives: [
          'Examine the major responsibilities and six functions of a Board of Directors (Allen, 2015; Bainbridge, 2013)',
          'Explain the composition criteria of an efficient Board and separation of Chairman and CEO',
          'Describe the ten rights of shareholders and the statutory composition of Audit Committees under CAMA'
        ],
        unitRecapPoints: [
          'Responsibilities (Allen, 2015): Firm control in lawful manner, value sharing among stakeholders, and ensuring transparency.',
          'Six functions (Bainbridge, 2013): Strategic planning, senior executive compensation, succession, communication, financial integrity, legal compliance.',
          'CAMA (1990) specifies Audit Committee composition: maximum 6 members (equal 3 management/directors and 3 shareholders).',
          'Shareholder rights: 21 working days notice for AGM; 20% blockholders entitled to board representation.'
        ],
        topics: [
          {
            id: 'top-ent304-11-1',
            title: 'Board Responsibilities, Composition, Shareholder Rights, and Audit Committee',
            readingMinutes: 7,
            sourceReference: 'ENT 304, Module 3, Unit 3, Sections 3.1–3.6, pp. 108–117',
            textbookDefinitions: [
              {
                term: 'Board of Directors Functions (Bainbridge, 2013)',
                definition: 'The six core governance functions: Strategic planning; Executive selection/appraisal/compensation; Succession planning; Shareholder communication; Financial controls integrity; and Ethical/legal compliance.',
                sourceAuthor: 'Bainbridge (2013)'
              },
              {
                term: 'Audit Committee (CAMA 1990)',
                definition: 'A statutory committee in a public limited liability company with a maximum of six members, equally divided between three directors/management and three shareholders, conversant with basic financial statements.',
                sourceAuthor: 'CAMA 1990 / Bar-Gill et al. (2013)'
              }
            ],
            content: `3.1 Board Responsibilities (Allen, 2015):
1. Firm control in a lawful, efficient, and effective manner to improve value creation.
2. Ensuring created value is fairly shared among stakeholders (shareholders, employees).
3. Ensuring transparency, accountability, equity, and fairness.

3.2 Six Functions of the Board (Bainbridge, 2013):
1. Strategic planning.
2. Selection, performance appraisal, and compensation of senior executives.
3. Succession planning.
4. Communicating with shareholders.
5. Ensuring integrity of financial controls and reports.
6. Ensuring ethical standards and compliance with Nigerian laws.

3.3 Board Composition (Adams et al., 2012):
- Diversity of experience without compromising independence and integrity.
- Separation of Chairman and Chief Executive Officer positions.
- If Chairman and CEO roles are combined, there must be a strong non-executive independent director as Vice Chairman.
- Compliance with CAMA (Cap. C20, LFN 2004) and Nigerian Code of Corporate Governance 2003.

3.4 Rights of Shareholders (Beasley, 1996):
- AGM notices dispatched at least 21 working days in advance with audited accounts.
- Election of directors and approval of terms.
- Shareholders holding over 20% of issued share capital entitled to board representation.
- At least one director representing minority shareholders.

3.5 & 3.6 Role of Audit Committee (CAMA 1990; Aggarwal et al., 2008):
- Statutory maximum of six members (three directors, three shareholders).
- Qualifications: Ability to read/understand basic financial statements, integrity, dedication, business knowledge, risk awareness.
- Reviews internal and external audit reports to ensure credibility.`,
            summaryPoints: [
              'Chairman and CEO positions should ideally be separated to prevent concentration of power.',
              'Shareholders must receive 21 days notice before AGMs.',
              'Audit Committees must have equal representation (3 directors, 3 shareholders; max 6).'
            ],
            simplifiedExplanation: {
              analogy: 'The CEO drives the car day-to-day. The Board sits in the passenger seat with the map (strategy) and has an emergency brake (oversight). If the CEO drives too fast or towards a cliff, the Board steps in.',
              plainEnglish: 'The Board oversees management, ensures accurate accounts, protects shareholders, and ensures company actions obey Nigerian law.',
              keyTakeaway: 'The Audit Committee has a maximum of 6 members (3 management, 3 shareholders) under CAMA 1990.',
              examTip: 'Remember the 21 days AGM notice and the 3-and-3 composition of the Audit Committee.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-11-1',
                questionType: 'written_structured',
                prompt: 'Detail the six functions of a Board of Directors identified by Bainbridge (2013) and state the statutory composition and role of an Audit Committee under CAMA 1990.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Module 3, Unit 3, Sections 3.2 & 3.5–3.6, pp. 110–115',
                expectedAnswerGuide: '1. Six Functions (Bainbridge, 2013): (a) Strategic planning; (b) Executive selection, performance appraisal, and compensation; (c) Succession planning; (d) Communicating with shareholders; (e) Ensuring integrity of financial controls and reports; (f) Maintaining ethical standards and compliance with Nigerian law (CAMA). 2. Audit Committee under CAMA 1990: Maximum of six members with equal representation (3 directors/management and 3 shareholders). Members must understand basic financial statements. Role: strengthen auditor independence, review internal and external audit reports, and enhance public confidence in published financial statements.',
                keyRubricPoints: [
                  'All 6 Bainbridge board functions listed and explained',
                  'CAMA 1990 statutory maximum of 6 members stated',
                  'Equal 3 directors / 3 shareholders split stated',
                  'Audit committee objectives and reporting role explained'
                ],
                examinerTips: 'State both the 6 board functions and the CAMA 3-and-3 split.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 11 Question 1'
              }
            ]
          }
        ]
      },

      // Unit 12 (Module 3 Unit 4)
      {
        id: 'unit-ent304-12',
        unitNumber: '12',
        title: 'Unit 12: Basic Principles of OECD and Corporate Governance in Practice',
        objectives: [
          'Explain the five OECD Principles of Corporate Governance (1999)',
          'Describe the role of Shareholder Activism in internal corporate governance',
          'Examine Relationship Investing using the Warren Buffett model'
        ],
        unitRecapPoints: [
          'OECD Principles (1999): Principle I & II Fairness, Principle III Responsibility, Principle IV Transparency, Principle V Accountability.',
          'Shareholder activism (TIAA-CREF, CALPERS) enables institutional investors to influence corporate policy and reduce agency costs.',
          'Relationship investing (Warren Buffett model) involves long-term, supportive, friendly ownership providing value-added mentoring.'
        ],
        topics: [
          {
            id: 'top-ent304-12-1',
            title: 'OECD Principles, Shareholder Activism, and Relationship Investing',
            readingMinutes: 6,
            sourceReference: 'ENT 304, Module 3, Unit 4, Sections 3.1–3.2, pp. 118–127',
            textbookDefinitions: [
              {
                term: 'OECD Principles of Corporate Governance',
                definition: 'International non-binding standards established in April 1999 by representatives of 29 nations expanding on Fairness, Transparency, Accountability, and Responsibility.',
                sourceAuthor: 'OECD (1999) / Beasley (2013)'
              },
              {
                term: 'Relationship Investing',
                definition: 'Involved ownership where large shareholders positively influence management through active, two-way, friendly communication and long-term mentoring (e.g. Warren Buffett approach).',
                sourceAuthor: 'Bryan & Patel (2002)'
              }
            ],
            content: `3.1 The OECD Principles of Corporate Governance (1999)
Convened after the Asian financial crisis; issued by a Task Force of 29 member nations:
- Principle I & II (Fairness): Protects property rights of shareholders, free transferability of shares, voting rights, and equitable treatment of minority/foreign shareholders with redress mechanisms (Bebchuk et al., 2010).
- Principle III (Responsibility): Recognizes stakeholder rights established by law and encourages active co-operation in creating wealth and employment (Allen, 2015).
- Principle IV (Transparency): Requires timely, accurate disclosure of all material matters including financial results, ownership, and governance; mandates independent annual audits (Bertrand et al., 2002).
- Principle V (Accountability): Fiduciary duties of loyalty and care by directors to all shareholders; independent board oversight of professional managers (Becht et al., 2008).

3.2 Corporate Governance in Practice
- Shareholder Activism:
Aggressive monitoring by institutional investors (e.g. CALPERS, TIAA-CREF) to enforce internal control changes. Research (Bryan & Patel, 2002; Bethel et al., 1998) shows 87% of targeted firms adopt negotiated terms, reducing agency costs.
- Relationship Investing (The Warren Buffett Approach):
Rather than hostile takeovers or passive exit, large investors maintain patient, value-added, friendly involvement, acting as mentors to corporate managers (Bryan & Patel, 2002).`,
            summaryPoints: [
              'OECD’s 5 principles provide global benchmarks for fairness, disclosure, and board duties.',
              'Shareholder activism leverages liquid stock markets to discipline underperforming managers.',
              'Warren Buffett exemplifies relationship investing through supportive long-term mentorship.'
            ],
            simplifiedExplanation: {
              analogy: 'An activist investor is like a strict teacher who calls you out when homework is late. A relationship investor (like Warren Buffett) is like a patient mentor who sits down with you, gives advice, and helps you build the business.',
              plainEnglish: 'The OECD sets global standards for fair treatment and honest accounting. Investors can enforce these through voting (activism) or constructive partnership (relationship investing).',
              keyTakeaway: 'The five OECD principles expand upon Fairness, Transparency, Accountability, and Responsibility.',
              examTip: 'Cite the Warren Buffett model when asked about Relationship Investing.'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-12-1',
                questionType: 'written_discussion',
                prompt: 'Discuss the five OECD Principles of Corporate Governance (1999) and explain how Relationship Investing (the Warren Buffett approach) functions in practice.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Module 3, Unit 4, Sections 3.1–3.2, pp. 119–125',
                expectedAnswerGuide: '1. OECD Principles (1999): (a) Principle I & II (Fairness): shareholder property rights, equitable treatment of minority and foreign shareholders, right to redress. (b) Principle III (Responsibility): recognition of legal stakeholder rights and social cooperation. (c) Principle IV (Transparency): timely, accurate disclosure of material matters and independent audit. (d) Principle V (Accountability): fiduciary duties of loyalty/care and independent board monitoring. 2. Relationship Investing: Defined by Bryan and Patel (2002) as involved ownership in helping and positively influencing management. Exemplified by Warren Buffett, who takes an active, friendly, patient role with directors, providing valuable business experience and mentorship rather than hostile control.',
                keyRubricPoints: [
                  'OECD principles explained across Fairness, Responsibility, Transparency, Accountability',
                  'Role of independent audit under Transparency',
                  'Relationship investing defined',
                  'Warren Buffett approach described as friendly, patient, value-added involvement'
                ],
                examinerTips: 'Reference the OECD Asian financial crisis background and Warren Buffett model.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 12 Question 1'
              }
            ]
          }
        ]
      },

      // Unit 13 (Module 3 Unit 5)
      {
        id: 'unit-ent304-13',
        unitNumber: '13',
        title: 'Unit 13: Good Governance with Value Addition and Dual Process',
        objectives: [
          'Identify the six value additions achieved through good corporate governance (Abor & Nicholas, 2014)',
          'Describe the role of SEBI and the Narayana Murthy committee in due process',
          'Explain the four components of Standard & Poor’s Corporate Governance Scores (Doidge et al., 2004)'
        ],
        unitRecapPoints: [
          'Abor & Nicholas (2014) outline six value additions including enterprise stability, stakeholder confidence, and competitive advantage.',
          'SEBI (Securities and Exchange Board of India) commissioned the Narayana Murthy committee to establish listing due process and whistle-blowing mechanisms.',
          'Standard & Poor Corporate Governance Scores evaluate 4 components: Ownership structure, Financial stakeholder relations, Financial transparency, and Board structure.'
        ],
        topics: [
          {
            id: 'top-ent304-13-1',
            title: 'Value Addition, Due Process, and Standard & Poor’s Governance Scores',
            readingMinutes: 6,
            sourceReference: 'ENT 304, Module 3, Unit 5, Sections 3.1–3.2, pp. 128–135',
            textbookDefinitions: [
              {
                term: 'Good Governance Value Addition',
                definition: 'The concrete commercial advantages gained from ethical governance: stability, stakeholder trust, enhanced competitive advantage, and respect as a corporate citizen (Abor & Nicholas, 2014).',
                sourceAuthor: 'Abor & Nicholas (2014)'
              },
              {
                term: 'Corporate Governance Scores',
                definition: 'A scoring service launched by Standard & Poor evaluating country-level and company-level corporate governance practices across four analytical components (Doidge et al., 2004).',
                sourceAuthor: 'Standard & Poor / Doidge et al. (2004)'
              }
            ],
            content: `3.1 Benefits of Good Governance (Abor & Nicholas, 2014):
1. Provides stability and growth to the enterprise.
2. Builds confidence amongst existing and prospective stakeholders.
3. Leverages competitive advantage through demonstrated excellence.
4. Provides long-term sustenance and strengthens relationships.
5. Establishes the company as an esteemed corporate citizen icon.
6. Attracts premier partners seeking exemplary governance credentials.

3.2 Due Process, Rating, and Benchmarking
Securities and Exchange Board of India (SEBI) and the Narayana Murthy Committee introduced key listing reforms including whistle-blowing facilitation. ICRA evaluates business processes and disclosure discipline over 4 to 6 weeks.

Standard & Poor’s Corporate Governance Scores (Doidge, Karoly & Rene, 2004)
Evaluates companies across four key components:
- Component 1: Ownership Structure: Transparency of ownership, concentration, and influence.
- Component 2: Financial Stakeholder Relations: Regularity of shareholder meetings, voting procedures, and rights access.
- Component 3: Financial Transparency & Disclosure: Quality and content of public disclosures, timing, and auditor independence.
- Component 4: Board Structure & Process: Board composition, outside director independence, and executive compensation/succession policies.`,
            summaryPoints: [
              'Good governance delivers measurable financial and relational benefits (Abor & Nicholas).',
              'S&P evaluates four core areas: Ownership, Stakeholder Relations, Disclosure, and Board Processes.',
              'Anglo-Saxon systems focus on shareholders, while German systems balance creditors, employees, and community.'
            ],
            simplifiedExplanation: {
              analogy: 'Standard & Poor’s governance score is like a credit score for management integrity. A high score proves to global investors that the company is transparent, fair, and safe to invest in.',
              plainEnglish: 'Companies with good governance earn more trust, attract cheaper capital, and stay profitable longer because they are independently rated across ownership, transparency, and board quality.',
              keyTakeaway: 'The four S&P components are Ownership Structure, Financial Stakeholder Relations, Financial Transparency, and Board Structure.',
              examTip: 'Memorize the four S&P rating components (Doidge et al., 2004).'
            },
            writtenQuestions: [
              {
                id: 'wq-ent304-13-1',
                questionType: 'written_structured',
                prompt: 'State the benefits of good corporate governance according to Abor and Nicholas (2014). Explain the four components of Standard & Poor’s Corporate Governance Scores (Doidge et al., 2004).',
                maxMarks: 10,
                sourceReference: 'ENT 304, Module 3, Unit 5, Sections 3.1–3.2, pp. 130–133',
                expectedAnswerGuide: '1. Benefits (Abor & Nicholas, 2014): (a) Enterprise stability and growth; (b) Builds confidence among stakeholders; (c) Leverages competitive advantage; (d) Long-term sustenance of relationships; (e) Becoming an esteemed corporate citizen; (f) Attracting valuable business partnerships. 2. Four S&P Components (Doidge et al., 2004): Component 1 (Ownership Structure): transparency and concentration of ownership. Component 2 (Financial Stakeholder Relations): shareholder meeting regularity, voting procedures, ownership rights. Component 3 (Financial Transparency & Disclosure): quality/timing of public disclosures and auditor independence. Component 4 (Board Structure & Process): board composition, outside director independence, and executive compensation.',
                keyRubricPoints: [
                  'At least 4 benefits from Abor & Nicholas (2014) listed',
                  'Component 1 (Ownership Structure) explained',
                  'Component 2 (Financial Stakeholder Relations) explained',
                  'Component 3 (Financial Transparency) explained',
                  'Component 4 (Board Structure) explained'
                ],
                examinerTips: 'List the four components in numbered order with their exact sub-categories.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 13 Question 1'
              }
            ]
          }
        ]
      },

      // Unit 14 (Module 3 Unit 6)
      {
        id: 'unit-ent304-14',
        unitNumber: '14',
        title: 'Unit 14: Corporate Control Designs around the World',
        objectives: [
          'Compare dispersed shareholding (US/UK) with concentrated and cross-shareholding systems (Germany and Japan)',
          'Explain the Japanese Keiretsu and German two-tier board system (Naughton & Hovey, 1999)',
          'Analyze the role of shareholder activism and the market for partial control'
        ],
        unitRecapPoints: [
          'US and UK models feature dispersed shareholding relying on legal protection and capital market discipline.',
          'Germany and Japan feature concentrated cross-shareholding with banks and corporate groups holding substantial voting rights.',
          'Japan’s Keiretsu utilizes the Presidents’ Council; Germany employs a two-tier board (Management Board and Supervisory Board including labor representatives).',
          'Market for partial control reduces agency costs in dispersed systems via block share purchases and activist monitoring.'
        ],
        topics: [
          {
            id: 'top-ent304-14-1',
            title: 'Dispersed vs Concentrated Cross-Shareholding Systems and International Designs',
            readingMinutes: 7,
            sourceReference: 'ENT 304, Module 3, Unit 6, Sections 3.1–3.3, pp. 136–144',
            textbookDefinitions: [
              {
                term: 'Dispersed Shareholding System',
                definition: 'A corporate governance design prevalent in the U.S. and U.K. where shares are widely distributed among millions of retail and institutional investors, relying on capital market liquidity, independent boards, and legal protection (Anderson & Reeb, 2003).',
                sourceAuthor: 'Anderson & Reeb (2003)'
              },
              {
                term: 'Cross-Shareholding System (Keiretsu)',
                definition: 'A concentrated corporate control system in Japan where allied corporations and lending banks hold mutual equity stakes and coordinate governance through the Presidents’ Council (Che & Qian, 1998; Naughton & Hovey, 1999).',
                sourceAuthor: 'Naughton & Hovey (1999)'
              }
            ],
            content: `3.1 Global Variation in Corporate Governance Systems
Corporate control designs reflect distinct national legal traditions, capital market maturity, and cultural values (Bhagat & Black, 2002):
- Highly Dispersed System (United States & United Kingdom):
Shareholding is widely dispersed among retail and institutional investors. Boards are dominated by outside independent directors. Dissatisfied investors use the "exit option" (selling shares), depressing share price and triggering hostile takeovers or management removal.

3.2 Shareholder Activism & The Market for Partial Control
In the U.S., liquid capital markets allow activist shareholders (e.g. CALPERS) to buy block shares and enforce management changes without full takeovers, overcoming the "free rider" problem and reducing agency costs (Bethel et al., 1998; Mengistae & Xu, 2004).

3.3 Concentrated and Cross-Shareholding Systems:
- Germany:
Banks own equity in companies they lend to, using voting rights to maintain direct control (Che & Qian, 1998). Governance uses a two-tier board:
1. Management Board (Vorstand): Executive managers running daily operations, headed by the Chairman.
2. Supervisory Board (Aufsichtsrat): Outside board representing shareholders and labor representatives (codetermination).

- Japan:
Characterized by cross-shareholding known as Keiretsu. Allied firms and main lending banks hold shares in each other. The Presidents' Council meets regularly to coordinate strategy and resolve financial challenges. Boards consist largely of insiders, with the President serving as CEO alongside representative directors.`,
            summaryPoints: [
              'US/UK model: Dispersed shares, independent outside boards, market takeovers, legal enforcement.',
              'Germany: Concentrated bank ownership, two-tier board (Management vs Supervisory with labor).',
              'Japan: Keiretsu cross-shareholding, Presidents’ Council, insider boards, close bank relationships.'
            ],
            simplifiedExplanation: {
              analogy: 'The US system is like buying shares on an open stock exchange where investors sell if they don’t like the CEO. The Japanese Keiretsu is like a family alliance of companies holding hands and sitting together in council meetings to solve problems mutually.',
              plainEnglish: 'In America, millions of separate shareholders rely on laws and the stock market. In Germany and Japan, big banks and partner companies hold huge blocks of shares and directly supervise management.',
              keyTakeaway: 'The three major international systems are Anglo-Saxon (dispersed), German (two-tier bank-led), and Japanese (Keiretsu cross-shareholding).',
              examTip: 'Always contrast the German two-tier board and Japanese Keiretsu with the US dispersed system.'
            },
            tables: [
              {
                title: 'Table 14.1: Comparison of International Corporate Governance Systems',
                headers: ['Feature', 'United States & UK', 'Germany', 'Japan (Keiretsu)'],
                rows: [
                  ['Ownership Pattern', 'Highly dispersed among public investors', 'Concentrated bank and corporate holdings', 'Cross-shareholding among allied firms'],
                  ['Board Structure', 'Single unitary board with independent outsiders', 'Two-tier (Management Board & Supervisory Board)', 'Unitary board primarily consisting of insiders'],
                  ['Key Influence', 'Capital markets and institutional activists', 'Lending banks and labor representatives', 'Main bank and Presidents’ Council'],
                  ['Disciplinary Mechanism', 'Hostile takeovers and stock price decline', 'Direct intervention by supervisory board', 'Negotiated consensus and bank restructuring']
                ],
                sourceCitation: 'ENT 304, Module 3, Unit 6, pp. 138–142'
              }
            ],
            writtenQuestions: [
              {
                id: 'wq-ent304-14-1',
                questionType: 'written_structured',
                prompt: 'Compare and contrast the Anglo-Saxon corporate governance system with the German two-tier board system and the Japanese Keiretsu cross-shareholding system.',
                maxMarks: 10,
                sourceReference: 'ENT 304, Module 3, Unit 6, Sections 3.1–3.3, pp. 138–143',
                expectedAnswerGuide: '1. Anglo-Saxon (US/UK): Highly dispersed shareholding; single unitary board with independent outside directors; discipline enforced through stock market exit and hostile takeovers; strict legal protection of minority shareholders. 2. German System: Concentrated shareholding with banks owning substantial equity; two-tier board structure: (a) Management Board (executives running daily affairs) and (b) Supervisory Board (outside directors including shareholder and labor representatives under codetermination). 3. Japanese System (Keiretsu): Cross-shareholding networks between allied firms and main lending banks; Presidents’ Council meets regularly to coordinate; unitary board dominated by insiders and representative directors; reliance on bank mentoring rather than public takeovers.',
                keyRubricPoints: [
                  'Dispersed shareholding in US/UK explained',
                  'German two-tier board (Management and Supervisory) explained',
                  'Labor representation in German supervisory board noted',
                  'Japanese Keiretsu cross-shareholding and Presidents’ Council explained',
                  'Disciplinary mechanisms compared (takeovers vs bank oversight)'
                ],
                examinerTips: 'Explain the German two-tier structure and Japanese Keiretsu clearly.',
                origin: 'original_textbook_tma',
                sourceLabel: 'TMA 14 Question 1'
              }
            ]
          }
        ]
      }
    ]
  }
];

export const ENT304_AUTHENTIC_COURSE: Course = {
  id: 'course-ent304-leadership',
  code: 'ENT 304',
  title: 'Leadership and Corporate Governance',
  department: 'Department of Entrepreneurial Studies, Faculty of Management Sciences',
  description: 'Authoritative study curriculum for NOUN ENT 304. Covers the complete 14-unit sequence across 3 modules: Concept of Leadership, Servant Leadership & Nigerian Leadership Challenges, and Corporate Governance Principles & Designs.',
  colorTheme: '#1E3A2F',
  createdAt: '2026-10-17T11:00:00.000Z',
  documents: [
    {
      id: 'doc-ent304-main',
      name: 'ENT_304_Leadership_and_Corporate_Governance.pdf',
      fileType: 'pdf',
      fileSize: 4892400,
      uploadedAt: '2026-10-17T11:00:00.000Z',
      pageCount: 145,
      wordCount: 46200,
      status: 'ready',
      extractedHeadingsCount: 14,
      isPartiallyProcessed: false,
      summary: 'National Open University of Nigeria (NOUN) complete textbook and course guide for ENT 304. Comprises 3 study modules and all 14 chronological units verified from source pages 1 to 145.',
      processingNotes: 'Fully processed and verified against source document table of contents. All 14 units, modules, definitions, and TMAs extracted in original sequence.'
    }
  ],
  pastQuestionDocuments: ENT304_UPLOADED_PQ_DOCUMENTS,
  modules: ENT304_MODULES
};

export const ENT304_PAST_QUESTIONS: PastExamQuestionItem[] = AUTHENTIC_ENT304_EXTRACTED_PAST_QUESTIONS;
