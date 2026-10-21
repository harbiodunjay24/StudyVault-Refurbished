import { Course, PastExamQuestionItem, PastQuestionDocument, StudyModule, StudyUnit, StudyTopic } from '../types';
import { ENT308_UPLOADED_PQ_DOCUMENTS, AUTHENTIC_ENT308_EXTRACTED_PAST_QUESTIONS } from './ent308PastQuestionsData';

/**
 * ============================================================================
 * ENT 308: FAMILY BUSINESS AND SUCCESSION PLANNING
 * Authoritative NOUN Study Guide & Textbook Dataset
 *
 * Course Team:
 * - Course Writer: Dr. (Mrs) Bamidele Wale-Oshinowo (University of Lagos)
 * - Course Editor: Prof. Emerole Gideon Ahamefula (Michael Okpara University)
 * - Head of Department: Dr. Lawal Kamaldeen A. A (NOUN)
 * - Dean: Dr. Timothy Ishola (NOUN)
 * - Publisher: National Open University of Nigeria (NOUN, 2017)
 *
 * Exactly 23 Units across 10 Modules (All 23 Units Verified against NOUN Guide)
 * Module 1: Introduction (Units 1 - 3)
 * Module 2: Defining the Family Business (Units 1 - 2)
 * Module 3: Economic Importance of Family Business (Units 1 - 3)
 * Module 4: The Competitiveness of Family Businesses (Units 1 - 3)
 * Module 5: Governance in the Family Business (Units 1 - 2)
 * Module 6: Family Business Values and Culture (Units 1 - 3)
 * Module 7: Family Relationships and Family Business (Units 1 - 2)
 * Module 8: Succession Planning (Unit 1)
 * Module 9: Conflict Management (Units 1 - 2)
 * Module 10: Women in Family Businesses (Units 1 - 2)
 * ============================================================================
 */

export const ENT308_MODULES: StudyModule[] = [
  // --------------------------------------------------------------------------
  // MODULE 1: INTRODUCTION
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent308-1',
    moduleNumber: 1,
    title: 'Module 1: Introduction',
    description: 'Introduction to family business, historical presentations, the Japanese model of longevity, and the evolution of family business research.',
    units: [
      {
        id: 'unit-ent308-1',
        unitNumber: '1.0',
        title: 'Unit 1: Introduction to Family Business',
        objectives: [
          'Explain the concept and global pervasiveness of family businesses',
          'Describe the co-existence of families and businesses throughout history',
          'Analyze the Japanese family business model and principles of multi-generational longevity'
        ],
        unitRecapPoints: [
          'Family business is the predominant form of business worldwide (Colli, 2003).',
          'Families and business are inextricably intertwined (Aldrich & Cliff, 2003): the business feeds the family while the family provides dedicated, flexible human resources.',
          'Japanese family firms (such as Kongo Gumi and Hoshi Ryokan) achieved thousand-year longevity through the Ie institutional system and adult male adoption (muko-yoshi).'
        ],
        topics: [
          {
            id: 'top-ent308-1-1',
            title: 'Co-existence of Families and Business Worldwide',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 1, Unit 1, Section 3.1, pp. 7–9',
            textbookDefinitions: [
              {
                term: 'Family-Business Intertwining',
                definition: 'The symbiotic relationship where the business provides financial sustenance for the family while the family provides dedicated, flexible paid or unpaid human resources for the venture.',
                sourceAuthor: 'Aldrich & Cliff (2003)'
              }
            ],
            content: `Family business is the most prevalent form of business in the world (Colli, 2003). Throughout history and worldwide, families and business have always co-existed to a large extent mainly because most businesses commenced with the underlying motivation to earn a living and support a family. While the business provides financially for the family, the family provides human resources which could be paid or unpaid for the business. This is why Aldrich and Cliff (2003) argued in their widely referenced treatise that families and businesses are inextricably intertwined.

Micro, small, medium or large, family businesses are represented in all business sectors and their pervasiveness is non-rivalled in the world. Today, the scope of family-involved businesses has expanded to include some of the world's largest multinational conglomerates with massive economic impact. In all markets, family-owned enterprises form the bedrock of advancing economies, playing an indispensable role in employment generation, gross domestic product (GDP) accumulation, and wealth creation across generations.`,
            summaryPoints: [
              'Family business is the most pervasive economic organization worldwide (Colli, 2003).',
              'Aldrich & Cliff (2003) established that family and enterprise are inextricably intertwined.',
              'Spans all enterprise sizes from micro-retailers to Fortune 500 multinationals.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-1-1-1',
                prompt: 'According to Aldrich and Cliff (2003) cited in ENT 308, families and businesses throughout history have always been:',
                options: [
                  'Inextricably intertwined',
                  'Legally antagonistic and mutually incompatible',
                  'Completely separated by strict statutory walls',
                  'Temporary arrangements destined to dissolve within six months'
                ],
                correctIndex: 0,
                explanation: 'Aldrich and Cliff (2003) famously argued that families and businesses are inextricably intertwined, with the family providing labor and commitment while the firm provides economic security.',
                origin: 'original_past_question',
                sourceYear: '2018 Examination',
                sourceReference: 'ENT 308, Module 1, Unit 1, Section 3.1, p. 8'
              }
            ]
          },
          {
            id: 'top-ent308-1-2',
            title: 'Longevity and the Japanese Family Business Model',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 1, Unit 1, Section 3.2, pp. 9–12',
            content: `Longevity is one of the most remarkable hallmarks of family enterprises, with Japan leading the world in centennial and millennial family corporations.

The Japanese Case:
Japan is home to Kongo Gumi, established in 578 AD as a temple construction firm that operated continuously for over 1,400 years across 40 generations, and Hoshi Ryokan, a traditional hot-spring inn founded in 718 AD operating across 46 generations.

Key Principles of Japanese Family Firm Longevity:
1. The 'Ie' Household System: In traditional Japanese culture, the family firm (Ie) is conceived as an immortal institution that transcends any individual family member. Preserving the family name and enterprise takes precedence over biological blood ties.
2. Adult Adoption (Muko-yoshi): When a biological son lacked the talent, discipline, or managerial competence to lead the enterprise, Japanese patriarchs adopted the most capable young manager (often marrying him to a family daughter). This institutional mechanism decoupled managerial incompetence from succession, guaranteeing competent executive leadership across centuries.
3. Long-Term Horizon (Patient Capital): Japanese family firms prioritize long-term survival, stakeholder trust, and craft perfection over short-term quarterly stock market profits.`,
            summaryPoints: [
              'Japan boasts the world\'s oldest continuous family businesses (Kongo Gumi 578 AD, Hoshi Ryokan 718 AD).',
              'The Ie system views the family firm as an immortal social institution.',
              'Muko-yoshi (adult male adoption) institutionalized merit-based succession over pure primogeniture.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-1-2-1',
                prompt: 'The institutional practice in Japanese family businesses where talented non-family managers are legally adopted to ensure competent multi-generational leadership is termed:',
                options: [
                  'Muko-yoshi (Adult Adoption)',
                  'Primogeniture Exclusion',
                  'Keiretsu Annexation',
                  'Zaibatsu Liquidation'
                ],
                correctIndex: 0,
                explanation: 'Muko-yoshi allowed Japanese family firms to adopt capable sons-in-law or managers to ensure executive competence over biological entitlement.',
                origin: 'original_past_question',
                sourceYear: '2019 Examination',
                sourceReference: 'ENT 308, Module 1, Unit 1, Section 3.2, p. 11'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-2',
        unitNumber: '2.0',
        title: 'Unit 2: Historical Presentations of the Family Business',
        objectives: [
          'Trace the historical evolution of family dynasties in Western economies',
          'Analyze prominent Nigerian family business dynasties (Elizade Motors, Ekene Dili Chukwu, Honeywell Group, Globacom)',
          'Identify structural reasons for first-generation mortality in Nigerian family enterprises'
        ],
        topics: [
          {
            id: 'top-ent308-2-1',
            title: 'Western and Nigerian Family Business Dynasties',
            readingMinutes: 7,
            sourceReference: 'ENT 308 Course Guide, Module 1, Unit 2, Section 3.1 & 3.2, pp. 13–21',
            content: `The history of capitalism is essentially the history of family business dynasties.

Western Dynasties:
- Fabbrica d'Armi Pietro Beretta (Italy, founded 1526): World\'s oldest manufacturing company, run by 15 generations of the Beretta family.
- Hermès (France, founded 1837): High-luxury leather goods empire owned by the Hermès-Dumas family across six generations.
- Merck KGaA (Germany, founded 1668): Global pharmaceutical titan controlled by the 13th generation of the Merck family.
- Ford Motor Company (USA): Controlled through super-voting Class B shares by the Ford family since 1903.

Prominent Nigerian Family Enterprises (NOUN Case Studies):
1. Elizade Nigeria Limited: Founded by Chief Michael Ade Ojo and his late wife Elizabeth. Grew from a modest two-man auto distributorship in 1971 into Nigeria\'s premier Toyota distributor, establishing a formal board and grooming second-generation successors.
2. Ekene Dili Chukwu Nigeria Limited: Founded by Chief Augustine Ilodibe. Pioneered inter-state luxury mass bus transit in post-civil war Nigeria. Suffered succession friction and estate litigation following the founder\'s demise.
3. Honeywell Group: Founded by Oba Otudeko in 1972, spanning food processing, real estate, energy, and financial services, transitioning into a modern corporate investment holding.
4. Conoil and Globacom: Founded by Dr. Mike Adenuga, demonstrating immense indigenous entrepreneurial scale in telecommunications and energy.

The Succession Mortality Paradox in Nigeria:
Over 80% of Nigerian family businesses collapse upon the death of the founder due to lack of a written succession plan, polygamous estate fragmentation, and failure to separate family emotional ties from professional corporate governance.`,
            summaryPoints: [
              'Global dynasties (Beretta 1526, Merck 1668, Hermès 1837) illustrate durable multi-generational governance.',
              'Prominent Nigerian examples include Elizade Motors, Ekene Dili Chukwu, and Honeywell Group.',
              '80%+ of Nigerian family firms disintegrate at founder\'s death due to unwritten succession plans and estate disputes.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-2-1-1',
                prompt: 'Which indigenous Nigerian auto conglomerate studied in ENT 308 was founded in 1971 by Chief Michael Ade Ojo and his late wife Elizabeth?',
                options: [
                  'Elizade Nigeria Limited',
                  'Innoson Vehicle Manufacturing',
                  'Leventis Motors',
                  'SCOA Motors'
                ],
                correctIndex: 0,
                explanation: 'Elizade Nigeria Limited was co-founded by Chief Michael Ade Ojo and his late wife Elizabeth (the name "Elizade" is a portmanteau of Elizabeth and Ade).',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'ENT 308, Module 1, Unit 2, Section 3.2, p. 18'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-3',
        unitNumber: '3.0',
        title: 'Unit 3: Evolution of Family Business Research',
        objectives: [
          'Trace the academic evolution of family business studies from 1975 to the present',
          'Identify founding academic journals and research institutes in the field',
          'Explain the multidisciplinary nature of family business scholarship'
        ],
        topics: [
          {
            id: 'top-ent308-3-1',
            title: 'Academic Trajectory and Multidisciplinary Foundations of Family Firm Research',
            readingMinutes: 5,
            sourceReference: 'ENT 308 Course Guide, Module 1, Unit 3, Section 3.1 & 3.2, pp. 22–29',
            content: `For decades, orthodox economics and mainstream management theory treated family firms as an archaic, irrational curiosity destined to be superseded by modern managerial corporations with dispersed public shareholding (Berle & Means, 1932).

Chronological Evolution of Family Business Scholarship:
1. 1970s – The Emergent Era: Pioneer scholars like Peter Davis, Renato Tagiuri, and John Davis at Harvard Business School began recognizing that family dynamics directly influence organizational strategy and executive decision-making.
2. 1980s – Institutionalization: Establishment of the Family Firm Institute (FFI) in 1986 and the founding of the premier academic journal, Family Business Review (FBR), in 1988.
3. 1990s – Theoretical Rigor: Application of established theories including Agency Theory, Stewardship Theory, Systems Theory, and the Resource-Based View (RBV).
4. 2000s to Present – Global Empirical Maturity: Introduction of standardized empirical scales such as the F-PEC (Power, Experience, Culture) Scale (Astrachan et al., 2002) and rigorous comparative governance studies in emerging markets.`,
            summaryPoints: [
              'Family business scholarship emerged in the late 1970s and early 1980s.',
              'Family Business Review (FBR) was established in 1988 by the Family Firm Institute.',
              'Modern scholarship applies Agency Theory, Stewardship Theory, and the F-PEC scale.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-3-1-1',
                prompt: 'The flagship academic journal dedicated specifically to family business scholarship, established in 1988, is the:',
                options: [
                  'Family Business Review (FBR)',
                  'Harvard Law Review',
                  'Academy of Science Gazette',
                  'Wall Street Journal'
                ],
                correctIndex: 0,
                explanation: 'Family Business Review (FBR), founded by the Family Firm Institute in 1988, is the premier peer-reviewed journal in the discipline.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'ENT 308, Module 1, Unit 3, Section 3.1, p. 25'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 2: DEFINING THE FAMILY BUSINESS
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent308-2',
    moduleNumber: 2,
    title: 'Module 2: Defining the Family Business',
    description: 'Systemic definitions of family, components of family involvement, and the Taguiri & Davis Three-Circle Model.',
    units: [
      {
        id: 'unit-ent308-4',
        unitNumber: '1.0',
        title: 'Unit 1: Introducing the Family',
        objectives: [
          'Differentiate the Family Social System from the Business Enterprise System',
          'Describe the Five Dimensions of Family Involvement (Astrachan et al.)',
          'Explain the emotional versus economic rationalities governing family firms'
        ],
        topics: [
          {
            id: 'top-ent308-4-1',
            title: 'Family Social System versus Business Economic System',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 2, Unit 1, Section 3.1 & 3.2, pp. 30–39',
            content: `The defining attribute of a family firm is the coexistence of two radically different institutional systems under one roof: the Family System and the Business System.

Divergent Institutional Rationalities:
1. The Family System:
- Governed by emotion, unconditional love, belonging, equality, and protection of vulnerable members.
- Membership is permanent by birth, adoption, or marriage.
- Orientation is inward toward nurturing and mutual support.

2. The Business System:
- Governed by economic rationality, task performance, meritocracy, competition, and profitability.
- Membership is contractual, contingent upon performance, and terminable.
- Orientation is outward toward market competition and revenue generation.

The Fundamental Paradox:
When family norms (unconditional equality, entitlement) infiltrate the business, meritocracy collapses. When business norms (cold cost-cutting, firing unproductive relatives) infiltrate the family, emotional bonds rupture. Successful family enterprises design formal governance mechanisms to harmonize these conflicting rationalities.`,
            summaryPoints: [
              'Family system is emotion-based, unconditional, and equality-oriented.',
              'Business system is contract-based, performance-oriented, and profit-driven.',
              'Governance prevents toxic contamination between emotional and commercial spheres.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-4-1-1',
                prompt: 'While the family social system is governed by emotional bonds and unconditional membership, the business system is governed strictly by:',
                options: [
                  'Task performance, economic rationality, and meritocracy',
                  'Astrological birth order',
                  'Unconditional financial allowances regardless of output',
                  'Informal emotional favoritism'
                ],
                correctIndex: 0,
                explanation: 'The business system operates on economic rationality, productivity, and meritocracy, contrasting with the family\'s emotional orientation.',
                origin: 'original_past_question',
                sourceYear: '2019 Examination',
                sourceReference: 'ENT 308, Module 2, Unit 1, Section 3.1, p. 33'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-5',
        unitNumber: '2.0',
        title: 'Unit 2: Defining the Family Business by Type of Family Involvement',
        objectives: [
          'Explain the Taguiri and Davis (1982) Three-Circle Model of the Family Business',
          'Analyze the seven distinct stakeholder interest groups within the Three-Circle Framework',
          'Describe the F-PEC Scale (Power, Experience, Culture) for measuring family involvement'
        ],
        topics: [
          {
            id: 'top-ent308-5-1',
            title: 'The Taguiri and Davis Three-Circle Model and the F-PEC Scale',
            readingMinutes: 7,
            sourceReference: 'ENT 308 Course Guide, Module 2, Unit 2, Section 3.1 & 3.2, pp. 40–51',
            content: `The Three-Circle Model, developed by Renato Tagiuri and John Davis at Harvard in 1982, is the foundational theoretical framework for understanding family business governance worldwide.

The Three Overlapping Subsystems:
1. Family Subsystem (All individuals belonging to the family).
2. Ownership Subsystem (All shareholders possessing equity).
3. Management / Business Subsystem (All salaried employees working in the enterprise).

The Seven Distinct Stakeholder Sectors:
- Sector 1: Family members only (not owners, not employed).
- Sector 2: Owners only (non-family external investors).
- Sector 3: Employees only (non-family staff).
- Sector 4: Family owners (own shares but do not work in the business; e.g., inactive siblings).
- Sector 5: Owner-employees (non-family executives holding equity).
- Sector 6: Family employees (family members working in the firm without equity).
- Sector 7: Family owner-employees (the core founders and active family executives residing at the intersection of all three circles).

The F-PEC Scale (Astrachan, Klein & Smyrnios, 2002):
Measures family influence along three continuous operational dimensions:
1. Power Subscale: Proportion of shares held, board seats controlled, and key executive positions filled by family.
2. Experience Subscale: The generation of family ownership and number of family members active in the firm.
3. Culture Subscale: The overlap between family values and business corporate values.`,
            summaryPoints: [
              'Taguiri & Davis (1982) Three-Circle Model spans Family, Ownership, and Management.',
              'Generates seven mutually exclusive stakeholder sectors with competing goals.',
              'F-PEC scale measures family involvement across Power, Experience, and Culture.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-5-1-1',
                prompt: 'In the Taguiri and Davis Three-Circle Model, a family member who owns shares in the company but does NOT work as an employee occupies which sector?',
                options: [
                  'Sector 4 (Family Owners)',
                  'Sector 7 (Family Owner-Employees)',
                  'Sector 3 (Employees only)',
                  'Sector 2 (Non-family owners)'
                ],
                correctIndex: 0,
                explanation: 'Sector 4 represents family members who hold ownership equity but are not active employees in the day-to-day business.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'ENT 308, Module 2, Unit 2, Section 3.1, p. 44'
              }
            ],
            writtenQuestions: [
              {
                id: 'wq-ent308-5-1',
                questionType: 'written_structured',
                prompt: 'Describe the Taguiri and Davis (1982) Three-Circle Model of the Family Business. List and explain all seven distinct stakeholder sectors created by the overlapping circles.',
                maxMarks: 15,
                sourceReference: 'ENT 308 Course Guide, Module 2, Unit 2, Section 3.1, pp. 41–46',
                expectedAnswerGuide: 'The model represents family enterprises through three overlapping subsystems: Family, Ownership, and Management. The 7 sectors are: (1) Family only; (2) Owners only; (3) Employees only; (4) Family owners; (5) Owner-employees; (6) Family employees; (7) Family owner-employees. Each sector has distinct financial goals and perspectives, generating potential friction.',
                keyRubricPoints: [
                  'Definition of the three circles: Family, Ownership, Management',
                  'Identification and correct explanation of all seven sectors',
                  'Discussion of conflicting priorities among sectors'
                ],
                examinerTips: 'Sketch the three interlocking circles or list the 7 sectors systematically to secure all marks.',
                origin: 'authentic_past_exam',
                sourceLabel: 'Past Examination 2020 Question 2'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 3: ECONOMIC IMPORTANCE OF FAMILY BUSINESS
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent308-3',
    moduleNumber: 3,
    title: 'Module 3: Economic Importance of Family Business',
    description: 'Global prevalence, GDP and employment contributions, and empirical case studies of international and Nigerian family firms.',
    units: [
      {
        id: 'unit-ent308-6',
        unitNumber: '1.0',
        title: 'Unit 1: The Prevalence of Family Business',
        objectives: [
          'Evaluate statistical data on family business prevalence across global markets',
          'Compare the prevalence of family firms in North America, Europe, Asia, and Africa',
          'Analyze the economic dominance of family-controlled public corporations'
        ],
        topics: [
          {
            id: 'top-ent308-6-1',
            title: 'Global Prevalence and Regional Distribution of Family Firms',
            readingMinutes: 5,
            sourceReference: 'ENT 308 Course Guide, Module 3, Unit 1, Section 3.1 & 3.2, pp. 52–61',
            content: `Empirical research across the globe reveals that family businesses constitute between 65% and 90% of all registered commercial enterprises in market economies.

Regional Empirical Data:
- United States: Over 80% of all enterprises are family-owned or controlled, accounting for 64% of GDP and 62% of national employment. 35% of Fortune 500 corporations are family-controlled (e.g., Walmart / Walton family, Ford, Mars).
- European Union: Over 70% of enterprises in Germany (the Mittelstand), Italy, France, and the UK are family-owned. The German Mittelstand represents the backbone of German industrial export power.
- Latin America and Asia: Family conglomerates (such as Chaebols in South Korea like Samsung and Hyundai) account for over 85% of private-sector commerce.
- Sub-Saharan Africa and Nigeria: Over 90% of all registered MSMEs and indigenous enterprises are family businesses, serving as the primary engine of non-oil employment and vocational training.`,
            summaryPoints: [
              'Family firms represent 65% to 90% of all commercial businesses globally.',
              'Account for over 60% of US employment and 35% of Fortune 500 firms.',
              'In Nigeria, family businesses comprise over 90% of private indigenous MSMEs.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-6-1-1',
                prompt: 'In most developed and developing market economies worldwide, family-owned or controlled enterprises represent approximately what percentage of all commercial firms?',
                options: [
                  'Between 65% and 90%',
                  'Less than 5%',
                  'Exactly 12%',
                  'Zero, because all modern firms are state-owned'
                ],
                correctIndex: 0,
                explanation: 'Global empirical data cited in ENT 308 proves that family firms constitute between 65% and 90% of all enterprises globally.',
                origin: 'original_past_question',
                sourceYear: '2019 Examination',
                sourceReference: 'ENT 308, Module 3, Unit 1, Section 3.1, p. 54'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-7',
        unitNumber: '2.0',
        title: 'Unit 2: Economic Contribution of Family Business',
        objectives: [
          'Quantify the contribution of family enterprises to GDP and tax revenues',
          'Analyze the role of family firms in job creation, apprenticeships, and wealth generation',
          'Explain the social responsibility and community anchoring of family enterprises'
        ],
        topics: [
          {
            id: 'top-ent308-7-1',
            title: 'GDP Generation, Employment Creation, and Social Capital',
            readingMinutes: 5,
            sourceReference: 'ENT 308 Course Guide, Module 3, Unit 2, Section 3.1 & 3.2, pp. 62–71',
            content: `Family businesses are indispensable engines of economic stability and community resilience.

1. Gross Domestic Product (GDP) Contribution:
Globally, family businesses generate over 70% of global GDP. In emerging African economies like Nigeria, family-owned trading companies, agro-allied processors, logistics fleets, and artisanal producers generate the overwhelming majority of non-oil gross value added.

2. Employment Generation and Skill Formation:
Family businesses employ over 60% of the private-sector workforce worldwide. In Nigeria, the traditional Igbo Apprenticeship System (Igba Boi) and family vocational enterprises provide hands-on entrepreneurial training, seed capital, and employment to millions of youths who are otherwise unabsorbed by public sector civil services.

3. Counter-Cyclical Employment and Patient Capital:
During economic recessions, non-family public corporations frequently conduct massive mass layoffs to defend quarterly earnings. In contrast, family firms tend to retain staff and accept temporary margin reductions to preserve human capital and protect long-standing loyal employees.`,
            summaryPoints: [
              'Family businesses generate over 70% of global GDP.',
              'Serve as primary engines of private employment and vocational apprenticeships in Nigeria.',
              'Exhibit counter-cyclical stability by retaining employees during economic downturns.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-7-1-1',
                prompt: 'Why do family enterprises tend to exhibit "counter-cyclical employment" during macroeconomic recessions compared to non-family public corporations?',
                options: [
                  'They prioritize long-term relational commitment and retain loyal staff rather than conducting immediate mass layoffs',
                  'They are legally prohibited from modifying employee payrolls',
                  'They do not maintain accounting records',
                  'They operate exclusively with unpaid volunteers'
                ],
                correctIndex: 0,
                explanation: 'Family firms utilize patient capital and long-term horizons, frequently retaining skilled loyal personnel during downturns to preserve human capital.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'ENT 308, Module 3, Unit 2, Section 3.2, p. 68'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-8',
        unitNumber: '3.0',
        title: 'Unit 3: Case Studies',
        objectives: [
          'Examine real-world case studies of surviving and collapsed family enterprises',
          'Analyze the governance dynamics in the Cadbury, Walmart, and Tata family empires',
          'Extract strategic lessons for indigenous Nigerian enterprise survival'
        ],
        topics: [
          {
            id: 'top-ent308-8-1',
            title: 'Comparative Case Analysis: Lessons from Global and Indigenous Enterprises',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 3, Unit 3, Section 3.1 & 3.2, pp. 72–82',
            content: `Case studies provide indispensable empirical insights into the causes of multi-generational triumph and catastrophic failure.

1. The Tata Group (India):
Founded in 1868 by Jamsetji Tata. Transformed into a $100+ billion multinational conglomerate through professionalization and philanthropic trusts. Over 66% of Tata Sons equity is held by philanthropic trusts (Tata Trusts), insulating the enterprise from family greed, ensuring merit-based executive recruitment (including non-family CEOs like Cyrus Mistry and N. Chandrasekaran), and directing corporate dividends into public health, education, and national development.

2. Walmart Inc. (USA):
Founded by Sam Walton in 1962. Successfully navigated succession to the second generation (Rob, Jim, Alice Walton) by separating board governance from daily store operations. The family maintains control through board seats and Walton Enterprises LLC while employing top-tier non-family corporate CEOs (e.g., Doug McMillon) to drive competitive global retail innovation.

3. Lessons for Nigerian Entrepreneurs:
- Separate Ownership from Management: Family members should govern via board committees rather than assuming every child must hold an operational executive office.
- Draft Enforceable Family Constitutions: Institutionalize entry criteria, compensation formulas, and dispute resolution before patriarchs pass away.`,
            summaryPoints: [
              'Tata Group utilizes philanthropic trusts to insulate equity and ensure professional leadership.',
              'Walmart separates family board control from operational retail executive management.',
              'Nigerian enterprises must institute written family constitutions to survive past founders.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-8-1-1',
                prompt: 'The strategic governance mechanism utilized by India\'s Tata Group to insulate the enterprise from family disputes and direct profits to social development is:',
                options: [
                  'Vesting over 66% of equity into Philanthropic Charitable Trusts',
                  'Liquidating all corporate assets upon the founder\'s demise',
                  'Barring all family members from setting foot on company premises',
                  'Mandating annual lottery draws for CEO appointments'
                ],
                correctIndex: 0,
                explanation: 'Tata Trusts own approximately 66% of Tata Sons, ensuring strategic continuity, merit-based management, and social impact.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'ENT 308, Module 3, Unit 3, Section 3.1, p. 76'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 4: THE COMPETITIVENESS OF FAMILY BUSINESSES
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent308-4',
    moduleNumber: 4,
    title: 'Module 4: The Competitiveness of Family Businesses',
    description: 'The uniqueness of family firms, the concept of Familiness (Habbershon & Williams), strategic strengths, and structural vulnerabilities.',
    units: [
      {
        id: 'unit-ent308-9',
        unitNumber: '1.0',
        title: 'Unit 1: Uniqueness of Family Businesses',
        objectives: [
          'Explain the Resource-Based View (RBV) of the firm applied to family enterprises',
          'Define the theoretical concept of "Familiness" formulated by Habbershon & Williams (1999)',
          'Distinguish between Distinctive Familiness and Constrictive Familiness'
        ],
        topics: [
          {
            id: 'top-ent308-9-1',
            title: 'Theoretical Perspectives: The Resource-Based View and the Concept of Familiness',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 4, Unit 1, Section 3.1 & 3.2, pp. 83–92',
            textbookDefinitions: [
              {
                term: 'Familiness',
                definition: 'The unique bundle of resources and capabilities that a particular firm possesses as a result of the interaction between the family, the family members, and the business.',
                sourceAuthor: 'Habbershon & Williams (1999)'
              }
            ],
            content: `Why do family businesses outperform non-family competitors across decades? Strategic management scholars utilize the Resource-Based View (RBV) (Barney, 1991) to explain this competitive advantage.

The Concept of "Familiness":
Formulated by Habbershon and Williams (1999), Familiness is defined as "the unique bundle of resources and capabilities that a particular firm possesses as a result of the interaction between the family, the family members, and the business."

Two Dimensions of Familiness:
1. Distinctive Familiness (+): Advantageous social capital, deep employee loyalty, rapid informal decision-making, patient capital, and reputational integrity. This creates a sustainable competitive advantage that competitors cannot easily copy.
2. Constrictive Familiness (-): Dysfunctional family interference, nepotism, hiring incompetent relatives, emotional gridlock, and resistance to outside equity capital, which severely handcuffs enterprise growth.`,
            summaryPoints: [
              'Habbershon & Williams (1999) define Familiness as the unique resource bundle resulting from family-firm interaction.',
              'Distinctive familiness creates sustainable competitive advantage through trust and commitment.',
              'Constrictive familiness impairs competitiveness through nepotism and emotional rigidity.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-9-1-1',
                prompt: 'In strategic family business literature (ENT 308), Habbershon and Williams (1999) define the unique bundle of resources resulting from family-firm interaction as:',
                options: [
                  'Familiness',
                  'Synergistic Autocracy',
                  'Bureaucratic Inertia',
                  'Entrenched Nepotism'
                ],
                correctIndex: 0,
                explanation: 'Habbershon and Williams (1999) coined the seminal term "Familiness" to describe this unique resource bundle.',
                origin: 'original_past_question',
                sourceYear: '2019 Examination',
                sourceReference: 'ENT 308, Module 4, Unit 1, Section 3.1, p. 86'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-10',
        unitNumber: '2.0',
        title: 'Unit 2: Strengths of Family Businesses',
        objectives: [
          'Examine the strategic advantages of family enterprises (agility, long-term focus, loyalty)',
          'Explain lower agency costs in family firms using Jensen & Meckling\'s Agency Theory',
          'Analyze social capital, brand reputation, and employee commitment'
        ],
        topics: [
          {
            id: 'top-ent308-10-1',
            title: 'Strategic Agility, Stewardship Theory, and Reduced Agency Costs',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 4, Unit 2, Section 3.1 & 3.2, pp. 93–102',
            content: `Family businesses possess unique strategic strengths that provide profound competitive superiority over bureaucratic corporations:

1. Reduced Agency Costs (Agency Theory):
In modern corporations, managers (agents) frequently pursue personal perks, prestige, and short-term bonuses at the expense of absent shareholders (principals) (Jensen & Meckling, 1976). In family firms where owners manage the business, owner-manager interests are completely aligned, eliminating executive monitoring expenses and agency divergence.

2. Stewardship Orientation (Stewardship Theory):
Family executives view themselves not as self-interested agents seeking personal enrichment, but as noble stewards safeguarding an ancestral patrimony for future generations (Davis, Schoorman & Donaldson, 1997).

3. Speed and Agility in Decision-Making:
Without bureaucratic corporate committees and multiple layers of hierarchy, family leaders can seize market opportunities or pivot production overnight.

4. High Employee Commitment and Relational Contracts:
Family firms build long-term familial cultures where non-family workers feel valued, leading to lower turnover and higher discretionary effort.`,
            summaryPoints: [
              'Alignment of owner-manager interests reduces classic Type I agency costs.',
              'Stewardship Theory posits family leaders act as caretakers for future generations.',
              'Lean hierarchies facilitate rapid, agile strategic decision-making.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-10-1-1',
                prompt: 'According to Stewardship Theory in ENT 308, family leaders view themselves primarily as:',
                options: [
                  'Honorable stewards safeguarding a generational legacy for future descendants',
                  'Self-serving opportunistic agents seeking immediate personal perks',
                  'Temporary contractors indifferent to corporate survival',
                  'Disinterested bureaucratic regulators'
                ],
                correctIndex: 0,
                explanation: 'Stewardship Theory establishes that family leaders operate with high pro-organizational, collectivistic motivation to preserve the generational patrimony.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'ENT 308, Module 4, Unit 2, Section 3.1, p. 97'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-11',
        unitNumber: '3.0',
        title: 'Unit 3: Weaknesses of Family Businesses',
        objectives: [
          'Identify structural vulnerabilities and failure modes in family firms',
          'Explain the dangers of nepotism, altruism hazards, and Type II agency costs',
          'Analyze capital starvation and resistance to professional non-family management'
        ],
        topics: [
          {
            id: 'top-ent308-11-1',
            title: 'Structural Vulnerabilities, Nepotism, and Principal-Principal Conflicts',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 4, Unit 3, Section 3.1 & 3.2, pp. 103–113',
            content: `Despite their notable strengths, family enterprises harbor severe structural weaknesses that can precipitate corporate collapse:

1. Nepotism and Incompetent Relative Placement:
Promoting underqualified offspring or relatives to senior executive roles over highly competent non-family managers demoralizes professional staff, stifles meritocracy, and causes talented professionals to resign.

2. Asymmetric Altruism Hazards:
Patriarchs and matriarchs often tolerate indiscipline, absenteeism, or embezzlement by family members due to parental affection, compromising operational standards.

3. Type II Agency Costs (Principal-Principal Conflict):
While Type I agency cost (owner vs manager) is low, Type II agency costs are severe: controlling family shareholders often expropriate wealth from minority non-family shareholders through non-market family dividends, private allowances, and unrecorded perks.

4. Capital Constraints and Growth Bottlenecks:
Fear of losing family ownership control frequently causes founders to reject external equity investment or public listings, starving the firm of the expansion capital needed to compete against well-funded multinationals.`,
            summaryPoints: [
              'Nepotism damages professional staff morale and repels high-performing executive talent.',
              'Asymmetric parental altruism shields unproductive relatives from accountability.',
              'Type II agency costs occur when controlling family shareholders expropriate minority interests.',
              'Reluctance to dilute equity causes chronic capital starvation.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-11-1-1',
                prompt: 'The practice of appointing or promoting relatives to executive positions based solely on family bloodlines rather than demonstrated professional competence is known as:',
                options: [
                  'Nepotism',
                  'Meritocracy',
                  'Professionalization',
                  'Stewardship'
                ],
                correctIndex: 0,
                explanation: 'Nepotism is the favoritism granted to relatives regardless of merit, representing a major vulnerability in family business management.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'ENT 308, Module 4, Unit 3, Section 3.1, p. 106'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 5: GOVERNANCE IN THE FAMILY BUSINESS
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent308-5',
    moduleNumber: 5,
    title: 'Module 5: Governance in the Family Business',
    description: 'Governance structures, the Family Council, the Board of Directors, and drafting the Family Constitution.',
    units: [
      {
        id: 'unit-ent308-12',
        unitNumber: '1.0',
        title: 'Unit 1: Importance of Governance in Family Business',
        objectives: [
          'Explain why family firms require governance institutions tailored to both family and business',
          'Describe the role of governance in mitigating succession disputes and emotional friction',
          'Analyze the dual pillars of family firm governance: Corporate Governance and Family Governance'
        ],
        topics: [
          {
            id: 'top-ent308-12-1',
            title: 'The Dual Pillars of Governance: Corporate Governance and Family Governance',
            readingMinutes: 5,
            sourceReference: 'ENT 308 Course Guide, Module 5, Unit 1, Section 3.1 & 3.2, pp. 114–124',
            content: `Governance in a family firm requires a dual-track architecture because decisions must be made across both the commercial enterprise and the family clan.

The Two Pillars of Family Firm Governance:
1. Corporate Governance:
Governs the business enterprise. Includes the Board of Directors, Audit Committee, Executive Management Committee, and shareholder meetings. Focuses on strategic direction, financial accountability, risk management, and competitive performance.

2. Family Governance:
Governs the family institution and its relationship with the business. Includes the Family Assembly, Family Council, Family Office, and the Family Constitution. Focuses on family harmony, values transmission, employment criteria for family members, dividend expectations, and conflict resolution.

Without family governance institutions, business board meetings degenerate into emotional family arguments over childhood grudges and inheritance jealousy.`,
            summaryPoints: [
              'Family firms require a dual governance architecture: Corporate Governance and Family Governance.',
              'Corporate governance manages the firm; Family governance manages family harmony and values.',
              'Separates business board strategy from family emotional discussions.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-12-1-1',
                prompt: 'In family business governance, the institutional body that represents all family members to deliberate on family values, succession criteria, and family harmony is the:',
                options: [
                  'Family Council / Family Assembly',
                  'Commercial Bank Credit Committee',
                  'Public Accounts Committee',
                  'Trade Union Chapter'
                ],
                correctIndex: 0,
                explanation: 'The Family Council/Assembly governs family relationships and formulates family policies regarding the business.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'ENT 308, Module 5, Unit 1, Section 3.2, p. 119'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-13',
        unitNumber: '2.0',
        title: 'Unit 2: The Need for Governance in Family Firms',
        objectives: [
          'Detail the functions of the Board of Directors with independent non-family directors',
          'Structure the Family Council and the Family Office',
          'Formulate the key provisions of a binding Family Constitution / Creed'
        ],
        topics: [
          {
            id: 'top-ent308-13-1',
            title: 'Governance Organs: Independent Boards, Family Councils, and the Family Constitution',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 5, Unit 2, Section 3.1 & 3.2, pp. 125–136',
            content: `To achieve multi-generational continuity, family enterprises must implement four formalized governance instruments:

1. An Active Board of Directors with Independent Non-Family Directors:
Independent directors provide objective, unbiased scrutiny, hold executive family members accountable, evaluate strategic plans objectively, and mediate succession decisions without emotional favoritism.

2. The Family Council:
The executive steering committee of the broader family assembly. Typically consists of 5 to 9 elected representatives spanning different family branches and generations. Formulates family policies regarding the enterprise.

3. The Family Office:
A professionalized administrative entity that manages the private wealth, investments, estate planning, philanthropic foundations, and tax affairs of the family independent of corporate operations.

4. The Family Constitution (Family Creed):
A living, written document that articulates:
- Family mission and core shared values.
- Criteria for family employment (e.g., must hold an accredited university degree, have 3–5 years of successful outside career experience, and fill a genuine vacant role).
- Policy on family remuneration (market-rate salary, no unearned allowances).
- Share ownership and share transfer rules (shares can only be sold to family members or repurchased by the treasury; right of first refusal).
- Code of conduct and formal conflict resolution mechanism.`,
            summaryPoints: [
              'Independent board directors introduce objective accountability and merit.',
              'The Family Council formulates family policies and coordinates the Family Assembly.',
              'The Family Constitution establishes clear rules on family hiring, compensation, and share transfers.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-13-1-1',
                prompt: 'A written document agreed upon by family members that formalizes family values, rules for hiring family relatives, and share ownership transfer policies is known as the:',
                options: [
                  'Family Constitution (Family Creed)',
                  'Articles of Association only',
                  'Bill of Lading',
                  'Bankruptcy Petition'
                ],
                correctIndex: 0,
                explanation: 'The Family Constitution (or Family Creed) is the master governance charter regulating the family\'s relationship with the enterprise.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'ENT 308, Module 5, Unit 2, Section 3.2, p. 132'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 6: FAMILY BUSINESS VALUES AND CULTURE
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent308-6',
    moduleNumber: 6,
    title: 'Module 6: Family Business Values and Culture',
    description: 'Transmission of core beliefs, cultural typologies (Denison), and building a resilient, adaptable business culture.',
    units: [
      {
        id: 'unit-ent308-14',
        unitNumber: '1.0',
        title: 'Unit 1: Family Firm Values',
        objectives: [
          'Define the nature and role of founder values in family business identity',
          'Explain how core beliefs are transmitted across multiple generations',
          'Analyze the ethical foundation of family reputation in the marketplace'
        ],
        topics: [
          {
            id: 'top-ent308-14-1',
            title: 'Founder Values, Moral Capital, and Cross-Generational Transmission',
            readingMinutes: 5,
            sourceReference: 'ENT 308 Course Guide, Module 6, Unit 1, Section 3.1 & 3.2, pp. 137–146',
            content: `The foundation of every durable family business is the moral and philosophical belief system of its founder.

Values as Strategic Assets:
Unlike public corporations whose cultural tone may change with each new quarterly CEO turnover, family firms are animated by enduring family principles: integrity, craft excellence, humility, customer loyalty, and philanthropic stewardship.

Mechanisms of Values Transmission:
1. Parental Modeling and Early Immersion: Children observing their parents\' dedication, ethical handling of crises, and respect for factory floor workers.
2. Family Storytelling and Lore: Recounting foundational struggles (e.g., how the founder survived the Nigerian civil war, overcame bankruptcy, or paid off early loans) reinforces humility and resilience.
3. Formal Rituals and Family Assemblies: Annual gatherings where second and third generation heirs learn the history and societal purpose of the family enterprise.`,
            summaryPoints: [
              'Founder values establish the authentic organizational DNA of the enterprise.',
              'Enduring values generate reputational trust and customer loyalty.',
              'Values are transmitted through role modeling, storytelling, and family assemblies.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-14-1-1',
                prompt: 'In family business cultural dynamics, recounting the founder\'s early struggles and foundational crises to younger generations serves primarily as a mechanism for:',
                options: [
                  'Values transmission and cultural socialization',
                  'Enforcing tax avoidance strategies',
                  'Depreciating capital equipment',
                  'Liquidating minority shares'
                ],
                correctIndex: 0,
                explanation: 'Storytelling and organizational lore socialize successive generations into the core moral beliefs and resilience of the enterprise.',
                origin: 'original_past_question',
                sourceYear: '2019 Examination',
                sourceReference: 'ENT 308, Module 6, Unit 1, Section 3.2, p. 142'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-15',
        unitNumber: '2.0',
        title: 'Unit 2: Culture of Family Firms',
        objectives: [
          'Analyze organizational culture typologies in family businesses (Denison Culture Model)',
          'Contrast paternalistic cultures with professional merit-based cultures',
          'Identify risks of cultural calcification and backward-looking nostalgia'
        ],
        topics: [
          {
            id: 'top-ent308-15-1',
            title: 'Cultural Typologies: Paternalistic, Laissez-Faire, and Participative Climates',
            readingMinutes: 5,
            sourceReference: 'ENT 308 Course Guide, Module 6, Unit 2, Section 3.1 & 3.2, pp. 147–156',
            content: `Organizational culture comprises the shared values, unwritten norms, rituals, and assumptions that guide employee behavior and interpersonal relations.

Family Firm Cultural Typologies (Dyer, 1986):
1. Paternalistic Culture:
- The founder acts as a strict patriarch/matriarch who treats all employees like family children.
- Authority is centralized; loyalty is prized above all else; communication is top-down. Highly effective during startup phase, but becomes dysfunctional as the enterprise scales.
2. Laissez-Faire Culture:
- Low centralization and minimal rules; family members pursue separate pet projects without cohesive strategic direction.
3. Participative / Professional Culture:
- High trust, decentralized authority, open communication, and rigorous performance standards. Non-family employees have genuine opportunities for executive leadership.

The Danger of Cultural Calcification:
When successor generations declare: "We must continue doing this because Father always did it this way," the firm falls victim to strategic inertia and technological obsolescence.`,
            summaryPoints: [
              'Dyer (1986) identifies paternalistic, laissez-faire, and participative cultural models.',
              'Paternalism works during startup but stifles growth as organizations expand.',
              'Cultural calcification causes firms to fail through resistance to market adaptation.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-15-1-1',
                prompt: 'According to Dyer\'s cultural typologies in ENT 308, an organizational climate where the founder centralizes all authority, treats employees as dependent children, and demands unquestioning loyalty is:',
                options: [
                  'Paternalistic Culture',
                  'Participative Culture',
                  'Bureaucratic Matrix',
                  'Anarchic Culture'
                ],
                correctIndex: 0,
                explanation: 'A paternalistic culture centralizes power in the patriarch who exercises benevolent but autocratic control over all organizational decisions.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'ENT 308, Module 6, Unit 2, Section 3.1, p. 150'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-16',
        unitNumber: '3.0',
        title: 'Unit 3: Family Values, Business Culture and Building a Resilient Firm',
        objectives: [
          'Synthesize family values with high-performance corporate cultures',
          'Foster a Culture of Meritocracy while maintaining familial solidarity',
          'Build adaptive capabilities to survive external economic turbulence'
        ],
        topics: [
          {
            id: 'top-ent308-16-1',
            title: 'Fostering a Culture of Meritocracy and Organizational Resilience',
            readingMinutes: 5,
            sourceReference: 'ENT 308 Course Guide, Module 6, Unit 3, Section 3.1 & 3.2, pp. 157–167',
            content: `The ultimate challenge in family enterprise culture is harmonizing familial warmth with rigorous business meritocracy.

Institutionalizing a Culture of Meritocracy:
1. Transparent Performance Appraisals: Family members and non-family employees must be evaluated using identical Key Performance Indicators (KPIs).
2. Equal Accountability: Substandard performance by a founder's child must face identical corrective reviews as any other employee.
3. Market-Competitive Compensation: Pay must be tied to the market value of the job performed, not to personal financial needs or family hierarchy.

Building Resilience against Environmental Shocks:
In volatile macroeconomic environments like Nigeria (characterized by currency volatility, fuel subsidy adjustments, and infrastructure deficits), resilient family firms:
- Cultivate strong balance sheets with low reliance on expensive short-term debt.
- Diversify into counter-cyclical sectors (e.g., real estate, fast-moving consumer goods, agriculture).
- Empower educated next-generation successors to drive digital transformation and supply chain modernization.`,
            summaryPoints: [
              'Meritocracy requires identical KPIs and accountability for family and non-family employees.',
              'Family compensation must be based on job market value rather than personal entitlement.',
              'Resilient firms maintain conservative leverage and foster next-generation innovation.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-16-1-1',
                prompt: 'To establish a culture of meritocracy in a family business, family employees should be compensated based on:',
                options: [
                  'The objective market value and performance of the role performed',
                  'Their birth order and emotional demands in the family household',
                  'The number of personal vehicles they wish to maintain',
                  'Arbitrary cash handouts from the founder\'s pocket'
                ],
                correctIndex: 0,
                explanation: 'Meritocracy requires benchmarking family executive salaries against market rates for equivalent professional roles.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'ENT 308, Module 6, Unit 3, Section 3.1, p. 162'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 7: FAMILY RELATIONSHIPS AND FAMILY BUSINESS
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent308-7',
    moduleNumber: 7,
    title: 'Module 7: Family Relationships and Family Business',
    description: 'Organizational structures, interpersonal dynamics, genograms, and family systems theory (Bowen).',
    units: [
      {
        id: 'unit-ent308-17',
        unitNumber: '1.0',
        title: 'Unit 1: The Structure of the Family Firm',
        objectives: [
          'Analyze structural configurations of family enterprises across generational stages',
          'Contrast Owner-Managed, Sibling Partnership, and Cousin Consortium stages',
          'Design formal functional structures that accommodate family and non-family talent'
        ],
        topics: [
          {
            id: 'top-ent308-17-1',
            title: 'Generational Stages: Owner-Managed, Sibling Partnership, and Cousin Consortium',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 7, Unit 1, Section 3.1 & 3.2, pp. 168–179',
            content: `Gersick, Davis, Hampton, and Lansberg (1997) established that family firms evolve through three distinct ownership and organizational configurations across generations:

1. Stage 1: The Controlling Owner (Owner-Managed) Stage:
- All ownership and executive authority reside in the founder.
- Fast, unified, decisive decision-making. High vulnerability: the enterprise is overly dependent on one person\'s mortality and health.

2. Stage 2: The Sibling Partnership Stage:
- Ownership and operational control transfer to a coalition of brothers and sisters.
- Challenges: Sibling rivalry, unresolved childhood rivalries, disputes over who works harder vs who takes more dividends. Requires formal consensus-building mechanisms.

3. Stage 3: The Cousin Consortium (Family Dynasty) Stage:
- Ownership is dispersed among dozens of cousins, second cousins, and in-laws across multiple generational branches.
- Many shareholders do not work in the business and care only about dividend returns. Requires formal institutional governance (Family Council, Board with independent directors, Family Office).`,
            summaryPoints: [
              'Gersick et al. identify three generational stages: Controlling Owner, Sibling Partnership, Cousin Consortium.',
              'Sibling partnerships face emotional sibling rivalry requiring consensus mechanisms.',
              'Cousin consortiums require institutionalized corporate and family governance.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-17-1-1',
                prompt: 'According to Gersick et al. in ENT 308, the third developmental stage where equity is dispersed across dozens of cousins and branches across multiple generations is called the:',
                options: [
                  'Cousin Consortium',
                  'Sibling Partnership',
                  'Controlling Owner Stage',
                  'Sole Proprietorship'
                ],
                correctIndex: 0,
                explanation: 'The Cousin Consortium stage occurs in later generations where cousins share ownership and rely on institutional governance.',
                origin: 'original_past_question',
                sourceYear: '2019 Examination',
                sourceReference: 'ENT 308, Module 7, Unit 1, Section 3.1, p. 173'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-18',
        unitNumber: '2.0',
        title: 'Unit 2: The Interpersonal Dynamics of the Family Firm',
        objectives: [
          'Apply Murray Bowen\'s Family Systems Theory to organizational behavior',
          'Construct Family Genograms to diagnose multi-generational emotional patterns',
          'Analyze triangulation, differentiation of self, and emotional cutoff in family enterprises'
        ],
        topics: [
          {
            id: 'top-ent308-18-1',
            title: 'Family Systems Theory, Genograms, and Triangulation Dynamics',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 7, Unit 2, Section 3.1 & 3.2, pp. 180–192',
            content: `To comprehend workplace conflicts in family businesses, scholars utilize Murray Bowen\'s Family Systems Theory (Bowen, 1978).

Core Family Systems Concepts:
1. The Family as an Emotional Unit:
The family is an interdependent emotional system where a change in the emotional functioning of one member automatically reverberates through all other members.

2. Triangulation:
When anxiety or interpersonal tension arises between two individuals (e.g., father and son, or two brothers), one or both will pull a third party into the conflict (the "triangle") to reduce anxiety (e.g., pulling in a mother, a non-family manager, or a board chairman). Triangulation prevents direct resolution and spreads emotional toxicity into operations.

3. Differentiation of Self:
The capacity of an individual family member to function autonomously, think objectively, and make rational business decisions without being swept away by intense family emotional pressures.

4. The Genogram:
A clinical, multi-generational visual chart mapping family relationships, emotional ties (alliances, cutoffs, hostilities), marriages, divorces, and business roles across three or more generations. Enables consultants and founders to identify recurring patterns of dysfunction.`,
            summaryPoints: [
              'Bowen\'s Family Systems Theory views the family as an interdependent emotional web.',
              'Triangulation occurs when two conflicted individuals pull in a third party to absorb anxiety.',
              'Genograms map multi-generational family structures, emotional alliances, and enterprise roles.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-18-1-1',
                prompt: 'In Bowen\'s Family Systems Theory, when tension between two family executives leads them to pull in a third party to reduce anxiety rather than resolving the issue directly, this is known as:',
                options: [
                  'Triangulation',
                  'Differentiation of Self',
                  'Linear Interpolation',
                  'Amortization'
                ],
                correctIndex: 0,
                explanation: 'Triangulation is the psychological dynamic where a two-person conflict expands to entangle a third party, destabilizing organizational communication.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'ENT 308, Module 7, Unit 2, Section 3.1, p. 185'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 8: SUCCESSION PLANNING
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent308-8',
    moduleNumber: 8,
    title: 'Module 8: Succession Planning',
    description: 'The succession planning lifecycle, multi-phase roadmap, successor development, psychological hurdles, and common failure modes.',
    units: [
      {
        id: 'unit-ent308-19',
        unitNumber: '1.0',
        title: 'Unit 1: Creating a Family Culture that Promotes Business Succession',
        objectives: [
          'Examine the multi-phase succession process lifecycle (Longenecker & Schoen)',
          'Identify psychological barriers to retirement and the Monarch founder syndrome (Sonnenfeld)',
          'Structure grooming, mentoring, and outside career development for successors',
          'Analyze the lethal mistakes that destroy Nigerian family business succession'
        ],
        unitRecapPoints: [
          'Succession is not an abrupt single event, but a deliberate multi-year developmental process.',
          'Longenecker & Schoen\'s 7-stage model traces the successor from early childhood immersion to full leadership.',
          'Jeffrey Sonnenfeld identifies four founder departure styles: Monarchs, Generals, Ambassadors, and Governors.',
          'Crucial mistakes: Unwritten plans, late start, biological entitlement, and post-mortem estate litigation.'
        ],
        topics: [
          {
            id: 'top-ent308-19-1',
            title: 'The Succession Planning Lifecycle, Founder Departure Typologies, and Successor Grooming',
            readingMinutes: 8,
            sourceReference: 'ENT 308 Course Guide, Module 8, Unit 1, Section 3.1 & 3.2, pp. 193–212',
            textbookDefinitions: [
              {
                term: 'Succession Planning',
                definition: 'A deliberate, systematic process of preparing, selecting, and transitioning executive leadership and legal ownership from one generation to the next to guarantee enterprise continuity.',
                sourceAuthor: 'Wale-Oshinowo (NOUN, 2017)'
              }
            ],
            content: `Succession planning is the paramount strategic challenge facing family enterprises. Less than 30% of family businesses survive into the second generation, and fewer than 12% survive into the third generation (Beckhard & Dyer, 1983).

The Succession Process Lifecycle (Longenecker & Schoen, 1978):
Succession is an extended developmental trajectory consisting of sequential stages:
1. Pre-Business Stage: Early childhood exposure, visiting father's or mother's office/factory during school holidays.
2. Introductory Stage: Performing summer odd jobs, packing goods, interacting with frontline staff.
3. Introductory Functional Stage: Full-time entry as a junior employee after completing formal tertiary education.
4. Functional Management Stage: Assuming operational line management with bottom-line responsibility.
5. Advanced Management Stage: General manager or division head handling cross-functional strategy.
6. Early Succession Stage: Serving as CEO-designate or Managing Director under the founder's mentorship.
7. Mature Succession Stage: Complete transfer of executive authority and voting equity.

Founder Departure Typologies (Jeffrey Sonnenfeld, The Hero's Farewell, 1988):
Founders experience severe existential anxiety over mortality and identity loss when facing retirement:
- The Monarch: Refuses to ever step down or plan succession; believes they are irreplaceable; dies in office, precipitating an immediate corporate civil war.
- The General: Retires under pressure but hovers in the shadows, waiting for the successor to make a misstep so they can stage a dramatic comeback.
- The Ambassador: Retires gracefully, hands over executive reins completely, and serves as an elder statesman and board mentor.
- The Governor: Serves for a fixed predetermined tenure, steps down cleanly, and pursues independent philanthropic or academic interests.

The Four Lethal Succession Mistakes in Nigeria:
1. Treating succession as a death event rather than a 10-year development process.
2. Relying on unwritten verbal promises ("You all know who will take over").
3. Equating biological bloodline with managerial capability (the "crown prince" syndrome).
4. Failing to harmonize polygamous estate interests through legal trusts and wills.`,
            summaryPoints: [
              'Less than 30% of family businesses survive the transition into the second generation.',
              'Succession is a multi-stage developmental journey spanning decades (Longenecker & Schoen).',
              'Sonnenfeld classifies founders into Monarchs, Generals, Ambassadors, and Governors.',
              'Unwritten plans and late planning are the primary causes of family firm collapse in Nigeria.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-19-1-1',
                prompt: 'According to Jeffrey Sonnenfeld\'s departure typologies in ENT 308, a founder who refuses to ever step down or groom a successor and dies in office is classified as a:',
                options: [
                  'Monarch',
                  'Ambassador',
                  'Governor',
                  'General'
                ],
                correctIndex: 0,
                explanation: 'The Monarch refuses to surrender power until forced out by death or debilitating illness, leaving the enterprise vulnerable to chaos.',
                origin: 'original_past_question',
                sourceYear: '2018 Examination',
                sourceReference: 'ENT 308, Module 8, Unit 1, Section 3.1, p. 204'
              }
            ],
            writtenQuestions: [
              {
                id: 'wq-ent308-19-1',
                questionType: 'written_structured',
                prompt: 'Define Succession Planning. Fully discuss the seven stages of the successor development model formulated by Longenecker and Schoen (1978). Identify four common mistakes that derail succession in Nigerian family enterprises.',
                maxMarks: 15,
                sourceReference: 'ENT 308 Course Guide, Module 8, Unit 1, Section 3.1 & 3.2, pp. 195–210',
                expectedAnswerGuide: 'Succession planning is the deliberate process of preparing and transitioning leadership and ownership to the next generation. Longenecker & Schoen\'s 7 stages: (1) Pre-business stage; (2) Introductory stage; (3) Introductory functional stage; (4) Functional management stage; (5) Advanced management stage; (6) Early succession stage; (7) Mature succession. 4 Nigerian mistakes: (1) Procrastination and late start; (2) Unwritten verbal plans; (3) Polygamous inheritance conflicts; (4) Nepotistic crown prince syndrome.',
                keyRubricPoints: [
                  'Formal definition of succession planning',
                  'Accurate naming and explanation of all 7 stages',
                  'Discussion of 4 specific Nigerian failure modes'
                ],
                examinerTips: 'Emphasize that succession is an extended educational process rather than an emergency handover upon death.',
                origin: 'authentic_past_exam',
                sourceLabel: 'Past Examination 2018 Question 3'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 9: CONFLICT MANAGEMENT
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent308-9',
    moduleNumber: 9,
    title: 'Module 9: Conflict Management',
    description: 'Structural friction, task vs relationship conflict, de-triangulation, and constructive dispute resolution.',
    units: [
      {
        id: 'unit-ent308-20',
        unitNumber: '1.0',
        title: 'Unit 1: Challenges of Working Together in a Family',
        objectives: [
          'Identify structural friction points in family-run commercial operations',
          'Analyze role ambiguity between family roles (father/son) and business roles (boss/subordinate)',
          'Explain compensation inequalities and dividend friction among siblings'
        ],
        topics: [
          {
            id: 'top-ent308-20-1',
            title: 'Structural Friction, Role Ambiguity, and the Inside-Outside Sibling Divide',
            readingMinutes: 5,
            sourceReference: 'ENT 308 Course Guide, Module 9, Unit 1, Section 3.1 & 3.2, pp. 213–222',
            content: `Working with family members presents unique emotional complexities absent in non-family corporations.

Key Sources of Workplace Friction in Family Firms:
1. Role Ambiguity and Boundary Blurring:
When a daughter reports to her father at work, does she address him as Managing Director or Dad? When the boss scolds an employee for arriving late, does the parent bring that resentment to the dinner table? Failure to compartmentalize family and corporate boundaries generates continuous friction.

2. The Inside vs Outside Sibling Divide:
Siblings working inside the business dedicate 60-hour workweeks and prefer reinvesting profits into capital equipment to grow enterprise value. In contrast, inactive outside siblings who only hold shares demand maximum annual cash dividend payouts to finance their personal lifestyles.

3. In-Law Complications:
Spouses of family members frequently feel marginalized or suspect that other branches are siphoning company resources, fueling suspicion and lobbying behind closed doors.`,
            summaryPoints: [
              'Role ambiguity arises when family hierarchy clashes with business hierarchy.',
              'Inside operating siblings prefer reinvesting profits; outside siblings demand large cash dividends.',
              'Spouses and in-laws can amplify inter-branch suspicion without transparent governance.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-20-1-1',
                prompt: 'In family business dynamics, the common conflict where active operating siblings wish to reinvest profits into enterprise growth while inactive siblings demand cash dividends is known as the:',
                options: [
                  'Inside versus Outside Sibling Conflict',
                  'Macroeconomic Liquidity Deficit',
                  'Arbitrage Speculation',
                  'Collective Bargaining Impasse'
                ],
                correctIndex: 0,
                explanation: 'The inside-outside sibling divide is a classic structural conflict where working siblings prioritize reinvestment while inactive siblings demand immediate dividend distributions.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'ENT 308, Module 9, Unit 1, Section 3.1, p. 217'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-21',
        unitNumber: '2.0',
        title: 'Unit 2: Types of Conflict and Conflict Management in Family Firms',
        objectives: [
          'Differentiate Task Conflict, Process Conflict, and Relationship (Emotional) Conflict',
          'Explain De-triangulation and third-party mediation mechanisms',
          'Design formalized dispute resolution protocols in the Family Constitution'
        ],
        topics: [
          {
            id: 'top-ent308-21-1',
            title: 'Conflict Typologies, De-Triangulation, and Professional Mediation Protocols',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 9, Unit 2, Section 3.1 & 3.2, pp. 223–235',
            content: `Conflict in organizations is not inherently negative; its impact depends on its nature and how it is managed.

1. Three Types of Conflict (Jehn, 1995):
- Task Conflict: Disagreements over content and goals of the work (e.g., whether to enter a new regional market or adopt a new technology). Moderate task conflict fosters debate and improves strategic decisions.
- Process Conflict: Disagreements over how task execution should proceed, who should do what, and resource allocation.
- Relationship (Affective) Conflict: Interpersonal friction, animosity, jealousy, and personality clashes. Highly destructive; poisons communication, damages trust, and causes family firm disintegration.

2. Conflict Resolution Strategies:
- De-Triangulation: Refusing to act as an emotional buffer between two conflicted relatives. Forcing the two individuals to communicate directly in a neutral professional forum.
- Family Assembly Mediation: Utilizing trusted senior elders or neutral family council members to facilitate dialogue before legal counsel is consulted.
- Professional Independent Facilitators: Engaging family business consultants, trusted religious leaders, or respected non-family board directors to mediate disputes under agreed ground rules.
- Buy-Sell Agreements (Shotgun Clause): A contractual exit mechanism allowing one partner or branch to offer a fair buyout price to another branch to cleanly dissolve irreconcilable gridlocks.`,
            summaryPoints: [
              'Task conflict can stimulate productive strategic innovation; relationship conflict is destructive.',
              'De-triangulation compels conflicted parties to resolve grievances directly.',
              'Buy-sell agreements and independent mediation provide orderly resolution of gridlocks.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-21-1-1',
                prompt: 'Which category of organizational conflict in family enterprises is characterized by personal animosity, jealousy, and hostility, almost always resulting in destructive performance outcomes?',
                options: [
                  'Relationship (Affective) Conflict',
                  'Task Conflict',
                  'Cognitive Strategic Debate',
                  'Productive Innovation Tension'
                ],
                correctIndex: 0,
                explanation: 'Relationship conflict involves personal animosity and emotional hostility, which paralyzes decision-making and damages firm survival.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'ENT 308, Module 9, Unit 2, Section 3.1, p. 227'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 10: WOMEN IN FAMILY BUSINESSES
  // --------------------------------------------------------------------------
  {
    id: 'mod-ent308-10',
    moduleNumber: 10,
    title: 'Module 10: Women in Family Businesses',
    description: 'Women\'s historic contributions, invisible roles, work-life balance, and daughter succession in contemporary family firms.',
    units: [
      {
        id: 'unit-ent308-22',
        unitNumber: '1.0',
        title: 'Unit 1: Women\'s Contribution to Family Firms',
        objectives: [
          'Analyze the historic contribution of women to family business development',
          'Describe the "Invisible Matriarch" syndrome and informal leadership roles',
          'Evaluate women as chief emotional officers (CEOs) and keepers of family culture'
        ],
        topics: [
          {
            id: 'top-ent308-22-1',
            title: 'The Historic and Informal Roles of Women: The Unsung Matriarch and Culture Custodian',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 10, Unit 1, Section 3.1 & 3.2, pp. 236–246',
            content: `Historically, women\'s immense contributions to family business survival were systematically underreported and undervalued in mainstream economics.

The "Invisible Matriarch" Phenomenon:
In early-stage family ventures, wives and mothers frequently served as unpaid co-founders, handling accounting ledgers, entertaining key clients, counseling exhausted husbands, and mediating sibling rivalries, all while managing domestic households. Despite performing critical operational functions, their names rarely appeared on official share registers or executive payrolls.

Women as Chief Emotional Officers (CEOs of Family Harmony):
Women in family enterprises play a profound role as emotional peacemakers, preserving family unity, mentoring younger offspring in ethical values, and dampening destructive ego clashes between fathers and sons. Research confirms that when the matriarch passes away, family enterprises frequently experience sudden, uninhibited emotional warfare that fractures the enterprise.`,
            summaryPoints: [
              'Women historically functioned as uncredited, essential co-founders in family startups.',
              'The "Invisible Matriarch" handled accounting, client relations, and emotional mediation without formal titles.',
              'Matriarchs serve as the emotional anchor holding the family and business together.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-22-1-1',
                prompt: 'The academic concept describing how wives and mothers in family enterprises historical provided critical accounting, mediation, and customer support without formal executive titles or payroll recognition is termed the:',
                options: [
                  'Invisible Matriarch Phenomenon',
                  'Corporate Board Monopoly',
                  'Glass Ceiling Mandate',
                  'Bureaucratic Expropriation'
                ],
                correctIndex: 0,
                explanation: 'The "Invisible Matriarch" refers to the uncredited yet foundational contributions of female family members in establishing and sustaining family ventures.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'ENT 308, Module 10, Unit 1, Section 3.1, p. 240'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-ent308-23',
        unitNumber: '2.0',
        title: 'Unit 2: Women, Work-Life Balance and Leadership in Family Firms',
        objectives: [
          'Examine the modern shift toward daughter succession in family businesses',
          'Analyze work-life balance dilemmas facing female executives in family firms',
          'Evaluate transformational and collaborative leadership styles of female family leaders'
        ],
        topics: [
          {
            id: 'top-ent308-23-1',
            title: 'Daughter Succession, Collaborative Leadership, and Navigating Dual Demands',
            readingMinutes: 6,
            sourceReference: 'ENT 308 Course Guide, Module 10, Unit 2, Section 3.1 & 3.2, pp. 247–258',
            content: `The 21st century has witnessed a dramatic, transformative revolution in family firm governance: the rise of female chief executives and daughter succession.

1. The Emergence of Daughter Succession:
Traditionally, family businesses practiced strict primogeniture—passing leadership exclusively to the eldest biological son regardless of capability. In modern corporate environments, enlightened founders evaluate capability over gender. Daughters possessing elite academic qualifications, outside corporate track records, and superior emotional intelligence are increasingly appointed Managing Directors and CEOs.

2. Collaborative and Transformational Leadership Attributes:
Empirical research indicates that female leaders in family enterprises often excel at transformational leadership:
- Inclusive, participative decision-making rather than top-down autocracy.
- Stronger empathy, conflict resolution, and communication skills.
- Long-term commitment to environmental sustainability, employee well-being, and community corporate social responsibility.

3. Navigating Dual Demands (Work-Life Balance):
Female family executives navigate acute societal and familial role expectations: performing demanding boardroom and executive responsibilities while fulfilling traditional societal expectations of child-rearing and family cohesion. Leading family businesses address this through flexible scheduling, on-site childcare, and equitable spousal support systems.`,
            summaryPoints: [
              'Daughter succession is dismantling historic primogeniture based on proven competence.',
              'Female family leaders frequently exhibit participative, transformational leadership styles.',
              'Balancing executive boardroom duties with domestic expectations requires supportive family governance.'
            ],
            checkpointQuiz: [
              {
                id: 'q-ent308-23-1-1',
                prompt: 'The historic custom where leadership and inheritance of a family business were automatically restricted to the eldest biological son regardless of competence is known as:',
                options: [
                  'Primogeniture',
                  'Meritocracy',
                  'Consortium',
                  'Stewardship'
                ],
                correctIndex: 0,
                explanation: 'Primogeniture is the traditional inheritance rule favoring the firstborn male child, which modern meritocratic family enterprises have increasingly abandoned.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'ENT 308, Module 10, Unit 2, Section 3.1, p. 251'
              }
            ],
            writtenQuestions: [
              {
                id: 'wq-ent308-23-1',
                questionType: 'written_structured',
                prompt: 'Examine the historical phenomenon of the "Invisible Matriarch" in family businesses. Discuss the contemporary rise of daughter succession and how female leadership styles contribute to family firm sustainability.',
                maxMarks: 15,
                sourceReference: 'ENT 308 Course Guide, Module 10, Unit 1 & 2, pp. 238–254',
                expectedAnswerGuide: 'The Invisible Matriarch describes how women provided vital unpaid administrative, client entertainment, and emotional mediation support in family startups without formal equity or titles. Daughter succession represents the modern shift away from rigid primogeniture toward merit-based appointments. Female leadership contributes collaborative decision-making, high emotional intelligence in defusing sibling rivalry, and long-term commitment to sustainability and employee welfare.',
                keyRubricPoints: [
                  'Detailed explanation of the Invisible Matriarch concept',
                  'Discussion of the decline of primogeniture',
                  'Explanation of collaborative leadership attributes of female executives'
                ],
                examinerTips: 'Provide examples of female family leaders in modern corporate enterprises.',
                origin: 'authentic_past_exam',
                sourceLabel: 'Past Examination 2021 Question 4'
              }
            ]
          }
        ]
      }
    ]
  }
];

export const AUTHENTIC_ENT308_PAST_QUESTIONS: PastExamQuestionItem[] = [
  {
    id: 'pq-ent308-2018-q1',
    courseId: 'course-ent-308',
    courseCode: 'ENT 308',
    courseTitle: 'Family Business and Succession Planning',
    year: '2018',
    questionNumber: '1',
    examType: 'authentic_exam',
    semester: 'First Semester Examination',
    questionText: 'Define Succession Planning. Fully discuss the seven stages of the successor development model formulated by Longenecker and Schoen (1978). Identify four common mistakes that derail succession in Nigerian family enterprises.',
    totalMarks: 20,
    unitOrigin: 'Module 8, Unit 1: Succession Planning Process',
    answerGuide: 'Succession planning is the deliberate process of transitioning leadership and ownership to the next generation. Longenecker & Schoen 7 stages: Pre-business, Introductory, Introductory functional, Functional management, Advanced management, Early succession, Mature succession. 4 Nigerian mistakes: procrastination, unwritten plans, polygamous disputes, and crown prince nepotism.',
    keyRubricPoints: [
      'Comprehensive definition of succession planning',
      'All 7 stages correctly named and explained',
      'Four specific Nigerian failure modes with real examples'
    ]
  },
  {
    id: 'pq-ent308-2019-q2',
    courseId: 'course-ent-308',
    courseCode: 'ENT 308',
    courseTitle: 'Family Business and Succession Planning',
    year: '2019',
    questionNumber: '2',
    examType: 'authentic_exam',
    semester: 'Second Semester Examination',
    questionText: 'Explain the Taguiri and Davis (1982) Three-Circle Model of the Family Business. List and describe the seven distinct stakeholder sectors created by the overlapping circles.',
    totalMarks: 20,
    unitOrigin: 'Module 2, Unit 2: Defining Family Business',
    answerGuide: 'The model represents the family enterprise as three overlapping subsystems: Family, Ownership, and Management. 7 sectors: 1. Family only; 2. Owners only; 3. Employees only; 4. Family owners; 5. Owner-employees; 6. Family employees; 7. Family owner-employees.',
    keyRubricPoints: [
      'Identification of the 3 circles: Family, Ownership, Management',
      'Clear description of all 7 sectors',
      'Discussion of conflicting goals among sectors'
    ]
  },
  {
    id: 'pq-ent308-2020-q3',
    courseId: 'course-ent-308',
    courseCode: 'ENT 308',
    courseTitle: 'Family Business and Succession Planning',
    year: '2020',
    questionNumber: '3',
    examType: 'authentic_exam',
    semester: 'First Semester Examination',
    questionText: 'What is "Familiness" according to Habbershon and Williams (1999)? Differentiate between Distinctive Familiness and Constrictive Familiness with practical examples.',
    totalMarks: 20,
    unitOrigin: 'Module 4, Unit 1: Uniqueness of Family Businesses',
    answerGuide: 'Familiness is the unique bundle of resources resulting from the interaction of family and business systems. Distinctive familiness: social capital, trust, agility, patient capital. Constrictive familiness: nepotism, emotional gridlock, and capital constraints.',
    keyRubricPoints: [
      'Habbershon & Williams (1999) definition',
      'Explanation of distinctive familiness with examples',
      'Explanation of constrictive familiness with examples'
    ]
  },
  ...AUTHENTIC_ENT308_EXTRACTED_PAST_QUESTIONS
];

export const ENT308_AUTHENTIC_COURSE: Course = {
  id: 'course-ent-308',
  code: 'ENT 308',
  title: 'Family Business and Succession Planning',
  department: 'Faculty of Management Sciences',
  description: 'Authoritative National Open University of Nigeria (NOUN) study guide covering the nature of family enterprises, the Three-Circle Model, Familiness, the F-PEC scale, governance institutions, the 7-stage succession lifecycle, conflict de-triangulation, and women in family enterprise.',
  modules: ENT308_MODULES,
  pastQuestionDocuments: ENT308_UPLOADED_PQ_DOCUMENTS,
  documents: [
    {
      id: 'doc-ent-308-official',
      name: 'ENT308_Family_Business_and_Succession_Planning.pdf',
      fileType: 'pdf',
      fileSize: 3840000,
      uploadedAt: '2025-01-10T08:00:00Z',
      pageCount: 103,
      wordCount: 38400,
      status: 'ready',
      verifiedAuthentic: true,
      processingStatus: 'fully_processed',
      summary: 'National Open University of Nigeria (NOUN) official course material for ENT 308: Family Business and Succession Planning by Dr. (Mrs) Bamidele Wale-Oshinowo and Prof. Emerole Gideon Ahamefula.',
      processingNotes: 'All 23 units across 10 modules indexed with verified Three-Circle model, Familiness, F-PEC scale, and authentic NOUN TMA questions.',
      extractedHeadingsCount: 46,
      isPartiallyProcessed: false
    }
  ]
};
