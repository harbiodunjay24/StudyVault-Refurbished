import { Course, PastExamQuestionItem, PastQuestionDocument, StudyModule } from '../types';
import newGst302Questions from './gst302NewQuestions.json';

export const GST302_UPLOADED_PQ_DOCUMENTS: PastQuestionDocument[] = [
  {
    id: 'pq-doc-gst302-exam-archives',
    courseId: 'course-gst302',
    courseCode: 'GST 302',
    name: 'GST302_BUSINESS_CREATION_AND_GROWTH_EXAM_ARCHIVES.pdf',
    fileType: 'pdf',
    fileSize: 1750000,
    uploadedAt: '2026-10-23T08:15:00Z',
    pageCount: 132,
    processedPagesCount: 132,
    reviewRequiredPagesCount: 0,
    totalMainQuestions: 25,
    totalSubQuestions: 15,
    extractedQuestionsCount: 25,
    questionsWithSuppliedAnswersCount: 25,
    questionsWithoutSuppliedAnswersCount: 0,
    questionsRequiringReviewCount: 0,
    questionsSavedCount: 25,
    status: 'ready',
    extractionCompletenessStatus: 'verified_complete',
    summary:
      'Official NOUN e-Exam and Tutor-Marked Assignment archive for GST 302: Business Creation and Growth with verified multiple-choice and structured solutions.',
    examSession: 'Official University E-Examination & Assessment Archives'
  },
  {
    id: 'pq-doc-gst302-winsmart-summary',
    courseId: 'course-gst302',
    courseCode: 'GST 302',
    name: 'GST302_BUSINESS_CREATION_AND_GROWTH_SUMMARY_WINSMART_ACADEMY.pdf',
    fileType: 'pdf',
    fileSize: 980000,
    uploadedAt: '2026-10-24T09:15:00Z',
    pageCount: 50,
    processedPagesCount: 50,
    reviewRequiredPagesCount: 0,
    totalMainQuestions: 231,
    totalSubQuestions: 0,
    extractedQuestionsCount: 231,
    questionsWithSuppliedAnswersCount: 231,
    questionsWithoutSuppliedAnswersCount: 0,
    questionsRequiringReviewCount: 0,
    questionsSavedCount: 231,
    status: 'ready',
    extractionCompletenessStatus: 'verified_complete',
    summary:
      'Winsmart Academy comprehensive GST 302 exam summary and authentic question bank with 231 verified model answers and rubrics across all 7 modules.',
    examSession: 'Official University E-Examination & POP Exam Revision Bank'
  },
  {
    id: 'pq-doc-gst302-eexam-paper',
    courseId: 'course-gst302',
    courseCode: 'GST 302',
    name: 'GST302_E-EXAM_PAST_QUESTIONS_PAPER.pdf',
    fileType: 'pdf',
    fileSize: 180000,
    uploadedAt: '2026-10-24T09:15:00Z',
    pageCount: 5,
    processedPagesCount: 5,
    reviewRequiredPagesCount: 0,
    totalMainQuestions: 50,
    totalSubQuestions: 0,
    extractedQuestionsCount: 50,
    questionsWithSuppliedAnswersCount: 50,
    questionsWithoutSuppliedAnswersCount: 0,
    questionsRequiringReviewCount: 0,
    questionsSavedCount: 50,
    status: 'ready',
    extractionCompletenessStatus: 'verified_complete',
    summary:
      'Authentic NOUN GST 302 e-Exam paper questions covering ILO, policy decisions, e-commerce, and business lifecycle.',
    examSession: 'NOUN Semester E-Examination Session'
  }
];

export const GST302_COURSE: Course = {
  id: 'course-gst302',
  code: 'GST 302',
  title: 'Business Creation and Growth',
  department: 'General Studies Unit / Directorate of Entrepreneurship',
  description:
    'National Open University of Nigeria (NOUN) compulsory undergraduate course by Prof. May Ifeoma Nwoye Ph.D. Covers business planning blueprints, start-up motivation, opportunity search, legal formalities, feasibility analysis, theories of growth, financing sources, 4Ps/7Ps marketing mix, corporate ethics in Nigeria, e-commerce models (B2B, B2C, C2C), and managing transition from start-up to maturity.',
  createdAt: '2026-10-23T08:15:00Z',
  documents: [
    {
      id: 'doc-gst302-textbook',
      name: 'GST302_BUSINESS_CREATION_AND_GROWTH_99335b4e.pdf',
      fileType: 'pdf',
      fileSize: 1750000,
      uploadedAt: '2026-10-23T08:15:00Z',
      extractedHeadingsCount: 25,
      pageCount: 132,
      status: 'ready',
      processingStatus: 'fully_processed',
      summary:
        'Official NOUN primary course textbook for GST 302: Business Creation and Growth by Prof. May Ifeoma Nwoye Ph.D.'
    },
    {
      id: 'doc-gst302-winsmart-summary',
      name: 'GST302_BUSINESS_CREATION_AND_GROWTH_SUMMARY_WINSMART_ACADEMY.pdf',
      fileType: 'pdf',
      fileSize: 980000,
      uploadedAt: '2026-10-24T09:15:00Z',
      extractedHeadingsCount: 25,
      pageCount: 50,
      status: 'ready',
      processingStatus: 'fully_processed',
      summary:
        'Winsmart Academy comprehensive GST 302 summary and exam review series across all 7 modules and 25 units.'
    },
    {
      id: 'doc-gst302-eexam-paper',
      name: 'GST302_E-EXAM_PAST_QUESTIONS_PAPER.pdf',
      fileType: 'pdf',
      fileSize: 180000,
      uploadedAt: '2026-10-24T09:15:00Z',
      extractedHeadingsCount: 7,
      pageCount: 5,
      status: 'ready',
      processingStatus: 'fully_processed',
      summary:
        'Authentic NOUN GST 302 e-Exam paper questions with answer keys.'
    }
  ],
  pastQuestionDocuments: GST302_UPLOADED_PQ_DOCUMENTS,
  modules: [
    {
      id: 'mod-gst302-1',
      moduleNumber: 1,
      title: 'Module 1: Concept of Business and New Value Creation',
      description:
        'Business planning blueprints, start-up motivation, opportunity identification, legal formalities, and venture feasibility studies.',
      units: [
        {
          id: 'unit-gst302-1',
          unitNumber: '1.0',
          title: 'Unit 1: Business Planning Process',
          objectives: [
            'Define a business plan and its essential roles for entrepreneurs and investors',
            'Explain the four principles of planning: Explicit, Intelligible, Flexible, Written',
            'Outline the key components of a formal written business plan',
            'Analyze the operational benefits of planning and reducing firefighting'
          ],
          unitRecapPoints: [
            'A business plan is an operational roadmap describing the business opportunity, resource requirements, projected revenues, and costs.',
            'A plan must be Explicit (spelled out), Intelligible (understood by executors), Flexible (adaptable), and Written.',
            'Planning reduces firefighting, tests ideas on paper before financial commitment, and demonstrates credibility to lenders.',
            'Components include Executive Summary, Business Description, Market Analysis, Competitive Analysis, Management Structure, and Financial Projections.'
          ],
          topics: [
            {
              id: 'top-gst302-1-1',
              title: 'The Business Planning Blueprint and Principles of Planning',
              readingMinutes: 12,
              sourceReference: 'GST 302 Course Guide, Module 1, Unit 1, pp. 9–14',
              content:
                'A business plan is a comprehensive document that describes to investors, financiers, and managers all of the events likely to affect the proposed venture (Kuratko & Hodgetts, 1998). It defines the blueprint, strategy, resource requirements, and operational steps for new value creation.\n\nPrinciples of Planning:\n1. Explicit: Every step must be completely and unambiguously spelled out.\n2. Intelligible: Must be easily understood by the teams responsible for implementation.\n3. Flexible: Capable of accepting adjustments as market conditions evolve.\n4. Written: Formally committed to writing in a clear and concise manner.\n\nBenefits:\n- Reduces Firefighting: Prevents small business owners from being trapped in reactive crisis mode.\n- Justifies Plans and Actions: Compels the entrepreneur to test underlying assumptions.\n- Tests Ideas on Paper: Identifies unprofitable concepts before capital is spent.\n- Lenders Confidence: Demonstrates competence and commitment to banks and investors.',
              summaryPoints: [
                'Business plans are essential roadmaps for value creation.',
                'The 4 planning principles ensure clarity and adaptability.',
                'Paper testing prevents costly startup failures.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-2',
          unitNumber: '2.0',
          title: 'Unit 2: Start-up Decision – What Motivates People to Begin New Businesses',
          objectives: [
            'Explain intrinsic motivation and the "entrepreneurial obsession"',
            'Discuss the push and pull factors for business start-up',
            'Analyze why people choose business ownership despite high failure rates'
          ],
          unitRecapPoints: [
            'Intrinsic motivation ("entrepreneurial obsession") drives individuals to pursue business for passion, autonomy, and challenge.',
            'Motivators include escaping corporate constraints, being in charge, financial need, self-fulfillment, and creating community value.',
            'Although approximately 30% of small businesses fail in the first two years (SBA), entrepreneurship offers unlimited upside and personal independence.'
          ],
          topics: [
            {
              id: 'top-gst302-2-1',
              title: 'Motivational Factors and Entrepreneurial Drivers',
              readingMinutes: 12,
              sourceReference: 'GST 302 Course Guide, Module 1, Unit 2, pp. 18–22',
              content:
                'Motivations for starting a business vary widely across individuals:\n1. Passion and Self-Fulfillment: The desire to build and create value on one\'s own terms.\n2. Being in Control: Wanting to be one\'s own boss and determine strategic direction.\n3. Making it Personal: Bringing human relationships and personal touch back into commerce.\n4. Financial Need & Wealth Creation: Generating supplementary income or aiming for substantial long-term wealth.\n5. Changing the World & Creating Jobs: Fostering economic advancement and social impact.',
              summaryPoints: [
                'Entrepreneurship is fueled by both intrinsic passion and financial independence.',
                'Control and self-fulfillment often outweigh immediate salary trade-offs.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-3',
          unitNumber: '3.0',
          title: 'Unit 3: Opportunity Search and Identification',
          objectives: [
            'Define business opportunity and opportunity recognition',
            'Explain the five stages of the opportunity identification process',
            'Apply SWOT analysis to entrepreneurial venture selection'
          ],
          unitRecapPoints: [
            'An opportunity is a perceived means of generating incomes that previously have not been exploited.',
            'The 5 stages of opportunity identification are Preparation, Incubation, Insight, Evaluation, and Elaboration.',
            'SWOT analysis evaluates personal strengths/weaknesses and environmental opportunities/threats.'
          ],
          topics: [
            {
              id: 'top-gst302-3-1',
              title: 'The Five Stages of the Opportunity Identification Process',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 1, Unit 3, pp. 23–27',
              content:
                'Opportunity identification is the cognitive process through which individuals recognize commercial potential. It comprises five stages:\n1. Preparation: Pre-existing knowledge, background experience, and deliberate skill development.\n2. Incubation: Subconscious reflection on unresolved market problems or concepts without formal analysis.\n3. Insight: The "eureka" moment when a solution or business idea abruptly becomes recognized.\n4. Evaluation: Investigating feasibility, profitability, and personal capabilities through market research.\n5. Elaboration: Exposing the idea to external analysis, resource planning, and detailed operational design.',
              summaryPoints: [
                'Preparation and incubation precede commercial insight.',
                'Evaluation and elaboration test viability and reduce venture risk.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-4',
          unitNumber: '4.0',
          title: 'Unit 4: Legal Issues at Start-up',
          objectives: [
            'Identify the legal structures: Sole Proprietorship, Partnership, LLC, and Corporation',
            'Explain business name registration, tax compliance, and licenses in Nigeria',
            'Examine essential corporate legal documents (Bylaws, Operating Agreements, NDAs)'
          ],
          unitRecapPoints: [
            'Legal formalities protect personal assets from business liabilities and establish formal legitimacy.',
            'In Nigeria, enterprises and companies must register with the Corporate Affairs Commission (CAC) and comply with Federal and State tax laws.',
            'Essential legal documents include Company Bylaws, Meeting Minutes, LLC Operating Agreements, Non-Disclosure Agreements (NDAs), and Employment Contracts.'
          ],
          topics: [
            {
              id: 'top-gst302-4-1',
              title: 'Legal Forms of Organization and Key Corporate Documents',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 1, Unit 4, pp. 29–34',
              content:
                'Entrepreneurs must choose an appropriate legal structure:\n- Sole Proprietorship: Simplest form with unlimited personal liability.\n- Partnership: Shared capital and skills, but joint liability.\n- Limited Liability Company (LLC): Separates company obligations from personal assets, offering tax efficiency and minimal formality.\n- Corporation (C-Corp / PLC): Independent legal entity issuing shares, suited for large capital raising.\n\nKey documents include Bylaws (internal corporate rules), Minutes (official meeting memory), Operating Agreements (member rights in LLCs), and NDAs (intellectual property protection).',
              summaryPoints: [
                'LLCs and corporations shield personal assets from business liabilities.',
                'CAC registration is mandatory for lawful commercial operations in Nigeria.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-5',
          unitNumber: '5.0',
          title: 'Unit 5: Feasibility Analysis of New Ventures and Financing',
          objectives: [
            'Define feasibility analysis and its core components',
            'Distinguish feasibility studies from business plans',
            'Analyze financing categories: Owner savings, Angels, and Venture Capital'
          ],
          unitRecapPoints: [
            'Feasibility analysis is a comprehensive research study to determine the practicability, profitability, and financial viability of an idea before major investments.',
            'A feasibility study tests if an idea works; a business plan describes how to execute a confirmed viable business.',
            'Financing stages progress from personal savings/family loans, to angel investors, to institutional venture capitalists.'
          ],
          topics: [
            {
              id: 'top-gst302-5-1',
              title: 'Feasibility Analysis Framework and Financing Options',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 1, Unit 5, pp. 36–39',
              content:
                'Feasibility analysis assesses marketability, technical capability, financial viability, and management readiness before launching a venture.\n\nFinancing Stages:\n1. Seed / Bootstrap: Owner personal savings, soft loans from friends and relatives.\n2. Angel Investors: Affluent private investors investing personal capital for equity or debt.\n3. Venture Capital (VC): Professional funds investing institutional money in dynamic high-growth companies in exchange for substantial equity and board seats.',
              summaryPoints: [
                'Feasibility studies evaluate financial, market, technical, and organizational viability.',
                'Venture capitalists invest in scalable businesses with high growth potential.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-gst302-2',
      moduleNumber: 2,
      title: 'Module 2: Theories of Growth: An Overview',
      description:
        'Business growth concepts, life-cycle models, internal vs external expansion, franchising systems, and mergers and acquisitions.',
      units: [
        {
          id: 'unit-gst302-6',
          unitNumber: '1.0',
          title: 'Unit 1: Concepts and Reasons of Growth',
          objectives: [
            'Define business growth and the organizational life-cycle approach',
            'Distinguish Internal (Organic) Growth from External Growth',
            'Examine motives for growth: Profit, Cost (Economies of Scale), Market Power, and Risk Diversification'
          ],
          unitRecapPoints: [
            'Business growth involves expanding products, services, target markets, and sales volume.',
            'Internal growth relies on ploughed-back profits, new assets, and steady internal capacity expansion (e.g., NASCO Nigeria).',
            'External growth utilizes mergers, acquisitions, and outside financing for rapid expansion.',
            'Growth motives include profit maximization, economies of scale, market dominance, and risk spreading through diversification.'
          ],
          topics: [
            {
              id: 'top-gst302-6-1',
              title: 'Internal vs. External Growth and Motivations to Grow',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 2, Unit 1, pp. 40–44',
              content:
                'Growth is essential for enterprise longevity. Internal growth is steady expansion from within using retained earnings to deploy new capacity. It leverages internal experience but takes time. External growth uses mergers, takeovers, or external capital for immediate scale.\n\nKey Motives:\n1. Profit Motive: Satisfying shareholder expectations and boosting valuation.\n2. Cost Motive: Achieving economies of scale to lower long-run average costs.\n3. Market Power: Increasing pricing influence and building barriers to entry.\n4. Risk Motive: Diversifying into multiple product lines (economies of scope).',
              summaryPoints: [
                'Internal growth is organic and steady; external growth is rapid and structural.',
                'Economies of scale lower average production costs.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-7',
          unitNumber: '2.0',
          title: 'Unit 2: Challenges of Growth',
          objectives: [
            'Identify the common pitfalls in rapidly expanding businesses',
            'Analyze cash flow management and the danger of overtrading',
            'Discuss delegation, management information systems, and professionalization'
          ],
          unitRecapPoints: [
            'Rapid expansion without proper systems causes operational failure and overtrading.',
            'Cash constraints are the single greatest limitation to small business expansion.',
            'Founders must evolve from doing everything personally to delegating responsibilities and building robust management information systems.'
          ],
          topics: [
            {
              id: 'top-gst302-7-1',
              title: 'Overtrading, Cash Constraints, and System Infrastructure',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 2, Unit 2, pp. 46–51',
              content:
                'Growth strains resources. Overtrading occurs when a business expands sales rapidly without adequate working capital, leading to sudden insolvency despite paper profits.\n\nKey Growth Challenges:\n1. Cash Flow Control: Managing credit terms and preventing cash starvation.\n2. System Upgrades: Replacing informal practices with formal contracts, ERP/accounting software, and standard operating procedures.\n3. Delegation & Mindset: Entrepreneurs must transition from micromanaging tasks to leading teams and listening to expert advisors.',
              summaryPoints: [
                'Overtrading can bankrupt profitable growing businesses.',
                'Formal systems must replace early-stage informality.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-8',
          unitNumber: '3.0',
          title: 'Unit 3: Strategies for Growth (Franchising, Buy-In and Buy-Out)',
          objectives: [
            'Define franchising and analyze its role in business expansion',
            'Compare classic startup franchising with buying an existing franchise',
            'Explain Master Franchising, Conversion Franchises, and Management Buy-Outs (MBO)'
          ],
          unitRecapPoints: [
            'Franchising allows a franchisor to expand rapidly using franchisee capital while maintaining brand standards.',
            'Buying an existing franchise reduces market uncertainty because trading history and cash flows are established.',
            'A conversion franchise enables independent operators to affiliate with a national brand (e.g., Century 21).'
          ],
          topics: [
            {
              id: 'top-gst302-8-1',
              title: 'Franchising Systems and External Growth Models',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 2, Unit 3, pp. 52–56',
              content:
                'Franchising addresses the two greatest hurdles to expansion: raising capital and finding committed managers.\n\nFranchise Variations:\n- Classic Path: Purchasing rights to set up a brand-new franchise location.\n- Existing Franchise Acquisition: Taking over an established unit with proven historical sales.\n- Master Franchise: Granting regional development and recruitment rights to a master franchisee.\n- Conversion Franchise: Independent local firms joining a national network for reservations and brand recognition.',
              summaryPoints: [
                'Franchising leverages outside capital and motivated owner-operators.',
                'Conversion franchising strengthens independent businesses through national branding.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-9',
          unitNumber: '4.0',
          title: 'Unit 4: Mergers and Acquisitions (M&A)',
          objectives: [
            'Differentiate between mergers and acquisitions',
            'Examine Horizontal, Vertical, and Conglomerate mergers',
            'Discuss corporate motives: Financial synergy, risk diversification, and market power'
          ],
          unitRecapPoints: [
            'A merger is a legal consolidation of two or more entities into a combined firm; an acquisition occurs when one entity purchases the stock or assets of another.',
            'Horizontal mergers combine competitors in the same market; Vertical mergers combine firms in the same supply chain; Conglomerate mergers unite firms in unrelated markets.',
            'Motives include growth, cost economies, financial synergy, and empire building.'
          ],
          topics: [
            {
              id: 'top-gst302-9-1',
              title: 'Forms and Competitive Implications of M&A',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 2, Unit 4, pp. 58–62',
              content:
                'M&A is a major instrument of strategic corporate restructuring:\n1. Horizontal Merger: Two companies selling similar products in the same market merge to increase market share and reduce duplicate manufacturing costs.\n2. Vertical Merger: Combines supplier and buyer (forward or backward integration) to internalize transactions and ensure supply security.\n3. Conglomerate Merger: Merges firms operating in completely different industries to achieve portfolio diversification and capital efficiencies.',
              summaryPoints: [
                'Horizontal mergers increase market concentration.',
                'Vertical integration secures supply chains and lowers transaction costs.',
                'Conglomerate deals achieve portfolio risk spreading.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-gst302-3',
      moduleNumber: 3,
      title: 'Module 3: Sources of Funds and Resource Efficiency',
      description:
        'Internal vs external funding, formal vs informal credit markets in Nigeria, working capital management, and resource optimization.',
      units: [
        {
          id: 'unit-gst302-10',
          unitNumber: '1.0',
          title: 'Unit 1: Internal and External Sources of Funds',
          objectives: [
            'Classify internal funding: Retained profits, asset sales, and working capital tightening',
            'Classify external funding: Bank loans, overdrafts, share capital, and venture funding',
            'Evaluate the advantages and limitations of debt versus equity financing'
          ],
          unitRecapPoints: [
            'Internal financing carries no interest or debt service burden and avoids equity dilution.',
            'Over 60% of business investments historically originate from reinvested retained profits.',
            'External debt requires collateral and regular interest payments; equity dilutes voting control.'
          ],
          topics: [
            {
              id: 'top-gst302-10-1',
              title: 'Financial Structure: Debt, Equity, and Retained Earnings',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 3, Unit 1, pp. 63–67',
              content:
                'Entrepreneurs require funds for long-term capital assets and short-term working capital.\n\n- Internal Sources: Reinvested profits, sale of surplus assets, and accelerating accounts receivable collection (reducing debtor days from 75 to 35 days).\n- External Sources: Bank term loans, overdrafts, trade credit, venture capital, and public share floatations.\n- Balancing: Debt introduces interest risk and repayment defaults; equity avoids debt service but dilutes ownership control.',
              summaryPoints: [
                'Retained earnings provide the primary foundation for sustainable growth.',
                'Bank overdrafts provide flexible but costly short-term liquidity.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-11',
          unitNumber: '2.0',
          title: 'Unit 2: Formal and Informal Sources of Funds',
          objectives: [
            'Distinguish formal credit institutions from informal financing in Nigeria',
            'Analyze informal sources: Moneylenders, trade credit, and rotating savings (Esusu/Ajo)',
            'Evaluate the regulatory role of the Central Bank in formal credit markets'
          ],
          unitRecapPoints: [
            'Formal credit sources (commercial banks, microfinance banks, cooperatives) are regulated by the Central Bank with documented contracts and fixed terms.',
            'Informal credit sources (family, moneylenders, ROSCAs/Esusu) rely on personal relationships without formal contracts but often charge exorbitant interest rates.',
            'Startups often rely initially on informal personal networks before qualifying for formal bank credit.'
          ],
          topics: [
            {
              id: 'top-gst302-11-1',
              title: 'Credit Markets in Nigeria: Formal vs. Informal Systems',
              readingMinutes: 12,
              sourceReference: 'GST 302 Course Guide, Module 3, Unit 2, pp. 69–72',
              content:
                'Access to finance in Nigeria spans two distinct sectors:\n1. Formal Sector: Commercial banks, development finance institutions (BOI, BOA), and licensed microfinance banks supervised by the Central Bank of Nigeria (CBN). They require formal collateral, business plans, and audited accounts.\n2. Informal Sector: Unregulated lending including moneylenders, rotating savings and credit associations (Esusu/Ajo), and trade credit from suppliers. While flexible and collateral-free, informal moneylenders charge high interest rates.',
              summaryPoints: [
                'Formal sources offer lower regulated interest rates but require collateral.',
                'Informal networks provide immediate access but pose higher default risks.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-12',
          unitNumber: '3.0',
          title: 'Unit 3: Efficiency in the Use of Resources',
          objectives: [
            'Define resource efficiency in operations and project planning',
            'Explain the four tips for resource optimization: Plan to plan, Systematic benchmarking, Automation, and Resource software',
            'Apply working capital and inventory control techniques'
          ],
          unitRecapPoints: [
            'Resource efficiency maximizes output from available funds, staff, materials, and time while eliminating waste.',
            'A systematic approach requires establishing baselines, benchmarking against competitors, setting achievable milestones, and reviewing performance.',
            'Automating repetitive tasks frees up skilled labor for high-value strategic growth.'
          ],
          topics: [
            {
              id: 'top-gst302-12-1',
              title: 'Resource Planning, Benchmarking, and Financial Controls',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 3, Unit 3, pp. 73–78',
              content:
                'Resource management ensures smooth coordination across interdependent departments:\n1. Plan to Plan: Scope required resources before project commencement.\n2. Systematic Approach: Measure baseline performance, benchmark against industry leaders, and enforce accountability.\n3. Automation: Utilize software to eliminate manual errors and streamline workflows.\n4. Financial Discipline: Monitor daily cash balances, enforce prompt debtor payments, and optimize inventory to avoid tying up capital in dead stock.',
              summaryPoints: [
                'Efficient resource management prevents organizational bottlenecks.',
                'Benchmarking identifies productivity gaps against market rivals.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-gst302-4',
      moduleNumber: 4,
      title: 'Module 4: Marketing Strategies and Modern Marketing Tools',
      description:
        'Marketing philosophy, the 4Ps and extended 7Ps marketing mix, digital body language, and automated CRM technologies.',
      units: [
        {
          id: 'unit-gst302-13',
          unitNumber: '1.0',
          title: 'Unit 1: Concept of Marketing: Small and Big Business Marketing',
          objectives: [
            'Define the marketing concept and customer-oriented philosophy',
            'Contrast marketing strategies for small startups versus multinational corporations',
            'Formulate customer retention and brand loyalty tactics'
          ],
          unitRecapPoints: [
            'The marketing concept asserts that enterprises must determine customer needs and deliver superior satisfaction compared to competitors.',
            'While large corporations deploy multi-million dollar media campaigns, small businesses must leverage agility, local customer relationships, and focused niche marketing.',
            'Retaining existing customers is far more cost-effective than constantly acquiring new ones.'
          ],
          topics: [
            {
              id: 'top-gst302-13-1',
              title: 'The Marketing Concept and Small Business Realities',
              readingMinutes: 12,
              sourceReference: 'GST 302 Course Guide, Module 4, Unit 1, pp. 80–82',
              content:
                'The marketing concept aligns production with verified consumer demand. Small businesses cannot compete with multinational conglomerates on advertising budgets; they must excel in personal service, niche specialization, rapid response, and deep customer understanding to establish brand loyalty.',
              summaryPoints: [
                'Marketing centers on fulfilling consumer needs profitably.',
                'Niche focus allows small enterprises to outperform generic giants.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-14',
          unitNumber: '2.0',
          title: 'Unit 2: The Marketing Mix (4Ps to 7Ps)',
          objectives: [
            'Analyze the classic 4Ps: Product, Price, Promotion, Place',
            'Explain the extended Ps: People, Packaging, Positioning, Politics',
            'Formulate cohesive pricing and distribution strategies'
          ],
          unitRecapPoints: [
            'The classic marketing mix consists of 4Ps: Product, Price, Place, Promotion.',
            'In service and modern competitive markets, the mix expands to include People, Processes, Physical Evidence, Packaging, and Positioning.',
            'All marketing mix elements must reinforce one another to create a compelling customer value proposition.'
          ],
          topics: [
            {
              id: 'top-gst302-14-1',
              title: 'Structure of the 4Ps and Modern Marketing Mix Extensions',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 4, Unit 2, pp. 83–85',
              content:
                'The marketing mix comprises the tactical tools an enterprise combines to elicit desired market responses:\n- Product: Features, quality, branding, and performance.\n- Price: Pricing strategies based on cost, demand elasticity, and competitor positioning.\n- Place: Channels of distribution, retail outlets, and logistics.\n- Promotion: Integrated marketing communications (advertising, PR, personal selling, digital).\n- Extended Ps: People (service delivery staff), Packaging, Positioning, and Politics (regulatory diplomacy).',
              summaryPoints: [
                'The 4Ps form the foundation of tactical marketing.',
                'Extended Ps address service delivery and brand positioning.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-15',
          unitNumber: '3.0',
          title: 'Unit 3: Modern Marketing Tools and Marketing Automation',
          objectives: [
            'Identify the five essential modern marketing technologies',
            'Explain Sales Force Automation (CRM) and digital body language tracking',
            'Evaluate content marketing and social marketing platforms'
          ],
          unitRecapPoints: [
            'Five essential marketing technologies: CRM / Sales Force Automation, Social Marketing Platforms, Marketing Automation Software, Web Platforms, and Content Marketing Software.',
            'Marketing automation tracks digital body language to score buyer intent across the sales funnel.',
            'High-quality content marketing establishes thought leadership and attracts inbound leads.'
          ],
          topics: [
            {
              id: 'top-gst302-15-1',
              title: 'CRM, Digital Marketing Automation, and Content Strategy',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 4, Unit 3, pp. 86–89',
              content:
                'Modern marketing integrates software to track, nurture, and convert prospects:\n1. CRM Software: Manages customer interactions and predicts purchasing behavior.\n2. Marketing Automation: Scores online user activity and triggers targeted nurture campaigns.\n3. Content Marketing Platforms: Produces and distributes digital assets that address customer pain points and drive inbound conversion.',
              summaryPoints: [
                'CRMs link marketing activities directly to revenue generation.',
                'Marketing automation nurtures prospects through personalized digital funnels.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-gst302-5',
      moduleNumber: 5,
      title: 'Module 5: Ethics and Social Responsibility',
      description:
        'Business ethics, corporate governance, ethical challenges in Nigeria, and community development projects.',
      units: [
        {
          id: 'unit-gst302-16',
          unitNumber: '1.0',
          title: 'Unit 1: The Importance of Ethics in Business',
          objectives: [
            'Define business ethics and corporate social responsibility (CSR)',
            'Analyze why ethical conduct enhances long-term profitability and reputation',
            'Discuss employee retention and customer trust benefits of ethics'
          ],
          unitRecapPoints: [
            'Business ethics governs moral judgment and fair conduct in commercial decisions.',
            'Ethical behavior reduces regulatory fines, minimizes recruitment costs, builds customer brand equity, and protects against hostile takeovers.',
            'Ethics is an end in itself that fulfills basic human needs for fairness and integrity.'
          ],
          topics: [
            {
              id: 'top-gst302-16-1',
              title: 'Business Ethics, Corporate Reputation, and Profitability',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 5, Unit 1, pp. 90–96',
              content:
                'Ethics is the foundation of long-term corporate survival. Unethical shortcuts may yield short-term windfalls but invariably destroy customer loyalty and investor confidence. Companies like Cadbury Schweppes and Infosys demonstrate that corporate social responsibility enhances stakeholder trust, attracts top talent, and ensures sustained profitability.',
              summaryPoints: [
                'Ethical conduct and business profitability go hand in hand.',
                'Reputation is the shadow cast by genuine moral character (Abraham Lincoln).'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-17',
          unitNumber: '2.0',
          title: 'Unit 2: Ethical Behaviour and Practices in Nigeria',
          objectives: [
            'Examine ethical dilemmas in Nigerian commercial operations',
            'Analyze "right versus right" moral conflicts (e.g. bribery vs. employee layoffs)',
            'Discuss corporate governance codes and legal enforcement in Nigeria'
          ],
          unitRecapPoints: [
            'Nigerian business operations confront acute ethical challenges due to historical political/economic instability and governance deficits.',
            'Business ethics addresses complex "right versus right" dilemmas where competing moral duties collide.',
            'Organizations must institute internal codes of conduct, transparent reporting, and zero tolerance for corrupt practices.'
          ],
          topics: [
            {
              id: 'top-gst302-17-1',
              title: 'Ethical Dilemmas and Corporate Governance in Nigeria',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 5, Unit 2, pp. 92–99',
              content:
                'In Nigeria, business operators face pressure from regulatory red tape, contract kickbacks, and extortion. True business ethics is not abstract theory but applied decision-making in high-stakes environments. Institutionalizing ethical culture protects organizations from sudden collapses and builds institutional resilience.',
              summaryPoints: [
                'Bribery and lack of corporate governance have collapsed major public and private enterprises.',
                'Corporate ethical codes provide clear behavioral guidelines for employees.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-18',
          unitNumber: '3.0',
          title: 'Unit 3: Community Development Projects and Social Capital',
          objectives: [
            'Compare the Social Services Model with the Community Development Model',
            'Define social capital, mutual aid, and the "bank of favors"',
            'Align community economic development with sustainable enterprise growth'
          ],
          unitRecapPoints: [
            'The Social Services model delivers top-down services treating symptoms, while the Community Development model empowers local populations as owners of the development process.',
            'Social capital encompasses civic organization, trust networks, mutual aid, and community goodwill.',
            'Community Economic Development builds partnerships among private enterprises, public authorities, and voluntary sectors.'
          ],
          topics: [
            {
              id: 'top-gst302-18-1',
              title: 'Community Development Models and Social Capital Formation',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 5, Unit 3, pp. 100–103',
              content:
                'Community development aims to improve the living conditions of poor and vulnerable groups through economic empowerment. Comparing models:\n- Social Services Model: Focuses on delivering services to passive recipients; rigid and bureaucratically predetermined.\n- Community Development Model: Engages constituents as owners of the process; flexible, dynamic, and focused on root causes.\n- Social Capital: The invisible web of mutual aid, trust, and shared norms that facilitates community commerce.',
              summaryPoints: [
                'Community ownership produces sustainable socioeconomic transformation.',
                'Social capital creates trust networks that lower transaction costs.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-gst302-6',
      moduleNumber: 6,
      title: 'Module 6: New Opportunities for Expansion: Digital Commerce',
      description:
        'Electronic commerce (B2B, B2C, C2C), digital business processes, and electronic securities trading.',
      units: [
        {
          id: 'unit-gst302-19',
          unitNumber: '1.0',
          title: 'Unit 1: E-Commerce Models and Online Retail',
          objectives: [
            'Define electronic commerce and its major operational formats',
            'Classify e-commerce: B2B, B2C, C2C, P2P, and M-Commerce',
            'Outline steps for launching a compliant e-commerce enterprise'
          ],
          unitRecapPoints: [
            'E-commerce encompasses marketing, buying, selling, and digital payments over the internet.',
            'B2B involves supply-chain data interchange; B2C involves retail web stores (e.g. Amazon, Jumia); C2C provides peer platforms (e.g. eBay).',
            'Launching e-commerce requires domain security, secure payment gateways, inventory tracking, and consumer protection compliance.'
          ],
          topics: [
            {
              id: 'top-gst302-19-1',
              title: 'E-Commerce Architecture and Transaction Classifications',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 6, Unit 1, pp. 104–107',
              content:
                'E-commerce enables enterprises to transcend geographical boundaries:\n- B2C (Business-to-Consumer): Retailing products directly to consumers (Amazon, Jumia).\n- B2B (Business-to-Business): Inter-company procurement and EDI transactions.\n- C2C (Consumer-to-Consumer): Peer trading facilitated by an intermediary platform (eBay).\n- M-Commerce: Mobile commerce executed via smartphones and wireless digital wallets.',
              summaryPoints: [
                'E-commerce eliminates physical retail geographical constraints.',
                'Secure payment infrastructure is vital for consumer confidence.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-20',
          unitNumber: '2.0',
          title: 'Unit 2: E-Business Processes, Security, and Systemic Risks',
          objectives: [
            'Distinguish e-commerce (buying/selling) from e-business (comprehensive processes)',
            'Analyze data security protocols, SSL encryption, and cyber risks',
            'Examine dot-com bubble lessons on cash flow vs. ungrounded valuation'
          ],
          unitRecapPoints: [
            'E-business is the broader integration of supply chain management (SCM), enterprise resource planning (ERP), and CRM across digital networks.',
            'Data encryption, digital certificates, and server redundancy protect against breaches and costly downtime.',
            'Sustainable digital ventures require solid cash flows rather than speculative growth alone.'
          ],
          topics: [
            {
              id: 'top-gst302-20-1',
              title: 'E-Business Integration, Cybersecurity, and Financial Prudence',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 6, Unit 2, pp. 108–111',
              content:
                'E-business encompasses all digitalized back-office and front-office operations. E-commerce is the transactional buying and selling subset. Operating an e-business introduces critical vulnerabilities: server downtime, data breaches, and payment fraud. Proper encryption and trusted hosting are mandatory operational investments.',
              summaryPoints: [
                'E-business spans internal ERP, SCM, and CRM workflows.',
                'Cybersecurity and financial cash flow sustainability are paramount.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-21',
          unitNumber: '3.0',
          title: 'Unit 3: E-Trade and Digital Financial Markets',
          objectives: [
            'Define electronic (scripless) trading in securities and derivatives',
            'Contrast institutional inter-dealer trading with retail online discount brokers',
            'Analyze the rise of automated trading networks (ECNs) and dark pools'
          ],
          unitRecapPoints: [
            'E-trade refers to the electronic buying and selling of financial securities (stocks, bonds, currencies, derivatives) over digital networks without paper certificates.',
            'Electronic Communication Networks (ECNs) and discount online brokerages replaced manual trading floors with real-time matching engines.',
            'Retail investors now execute trades instantly with low commissions.'
          ],
          topics: [
            {
              id: 'top-gst302-21-1',
              title: 'Electronic Securities Trading and Digital Market Platforms',
              readingMinutes: 12,
              sourceReference: 'GST 302 Course Guide, Module 6, Unit 3, pp. 112–113',
              content:
                'E-trade replaced physical stock exchange floors with automated matching platforms (NASDAQ, NYSE Arca). Financial transactions divide into B2B institutional inter-dealer trading and B2C retail trading through online discount brokers (Charles Schwab, E-Trade). In emerging markets, retail e-trade enables massive democratization of capital investments.',
              summaryPoints: [
                'Scripless paperless trading enhances market liquidity and execution speed.',
                'Online retail brokerage democratizes financial asset ownership.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-gst302-7',
      moduleNumber: 7,
      title: 'Module 7: Managing Transition: From Start-up to Growth',
      description:
        'Personal disciplines, organizational learning, structured decision-making models, and the five stages of the business life cycle.',
      units: [
        {
          id: 'unit-gst302-22',
          unitNumber: '1.0',
          title: 'Unit 1: Personal Disciplines in Business Transition',
          objectives: [
            'Explain the role of personal discipline in entrepreneurial transition',
            'Analyze motivation, teamwork, holistic bookkeeping, and strategic vision',
            'Evaluate marketing and customer retention in maturing ventures'
          ],
          unitRecapPoints: [
            'Personal discipline is the single common denominator among successful long-term business leaders.',
            'Discipline requires holistic bookkeeping, continuous skills training, team alignment, and clear customer retention strategies.',
            'Transitioning from startup to growth requires sacrificing casual habits for structured systems.'
          ],
          topics: [
            {
              id: 'top-gst302-22-1',
              title: 'Leadership Disciplines and Holistic Bookkeeping',
              readingMinutes: 12,
              sourceReference: 'GST 302 Course Guide, Module 7, Unit 1, pp. 114–116',
              content:
                'Discipline keeps businesses solvent during downturns. Entrepreneurs must master four core practices: 1. Motivation & Personal Development; 2. Teamwork & Cohesion; 3. Holistic Bookkeeping (tracking real cash flows, not symptoms); 4. Vision & Long-term Planning.',
              summaryPoints: [
                'Discipline replaces reliance on luck or chance.',
                'Financial transparency at the source prevents insolvency.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-23',
          unitNumber: '2.0',
          title: 'Unit 2: Organizational Learning and Growth Strategies',
          objectives: [
            'Explain the 7 steps for expanding a growing business',
            'Formulate value propositions and target customer personas',
            'Analyze Ansoff\'s four growth strategies: Diversification, Product/Market Development, Market Penetration'
          ],
          unitRecapPoints: [
            'Deliberate growth requires identifying the rate-limiting step and pouring resources into core competencies.',
            'The four broad growth strategies are Market Penetration, Market Development, Product Development, and Diversification.',
            'Hiring and investing in exceptional talent is the highest-leverage decision for growing businesses.'
          ],
          topics: [
            {
              id: 'top-gst302-23-1',
              title: 'Value Proposition, Key Growth Indicators, and Ansoff Strategies',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 7, Unit 2, pp. 117–120',
              content:
                'Businesses must avoid cookie-cutter plans and tailor growth strategies to measured customer data:\n1. Establish a Unique Value Proposition (competing on authority or price).\n2. Define Key Indicators and A/B test changes.\n3. Verify sustainable revenue streams.\n4. Apply Ansoff Growth Matrix: Market Penetration (existing goods/markets), Product Development (new goods/existing markets), Market Development (existing goods/new regions), Diversification (new goods/new markets).',
              summaryPoints: [
                'Clear value propositions differentiate companies from rivals.',
                'The Ansoff matrix maps strategic expansion pathways.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-24',
          unitNumber: '3.0',
          title: 'Unit 3: Decision-Making Classifications in Business',
          objectives: [
            'Classify decisions: Tactical vs Strategic; Basic vs Routine (Katona)',
            'Explain Herbert Simon\'s Programmed vs Non-Programmed decisions',
            'Explain Ernest Dale\'s Policy, Administrative, and Executive decisions'
          ],
          unitRecapPoints: [
            'Tactical decisions are routine and delegated; Strategic decisions determine long-term enterprise survival.',
            'Herbert Simon: Programmed decisions follow established algorithmic rules; Non-programmed decisions handle novel, complex crises.',
            'Ernest Dale: Policy decisions set goals (top management); Administrative decisions determine means (middle management); Executive decisions handle day-to-day operations (operative supervisory level).'
          ],
          topics: [
            {
              id: 'top-gst302-24-1',
              title: 'Decision Typologies: Simon, Katona, and Ernest Dale',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 7, Unit 3, pp. 121–124',
              content:
                'Decision making is the core executive act:\n- Tactical vs. Strategic: Tactical is repetitive and operational; Strategic involves capital allocation, plant layout, and competitive strategy.\n- Programmed vs. Non-Programmed (Herbert Simon): Programmed decisions rely on set computational rules; Non-Programmed decisions require non-routine problem solving.\n- Policy, Administrative, and Executive (Ernest Dale): Policy defines ends (board/CEO); Administrative defines resource means (middle managers); Executive executes daily work.',
              summaryPoints: [
                'Strategic decisions shape long-term corporate destiny.',
                'Herbert Simon\'s programmed/non-programmed framework distinguishes routine from crisis management.'
              ]
            }
          ]
        },
        {
          id: 'unit-gst302-25',
          unitNumber: '4.0',
          title: 'Unit 4: The Five Stages of the Business Life Cycle',
          objectives: [
            'Analyze the five stages: Development/Seed, Startup, Growth/Survival, Expansion, Maturity',
            'Identify unique financial challenges and risks at each life-cycle stage',
            'Formulate exit strategies and corporate renewal mechanisms'
          ],
          unitRecapPoints: [
            'The 5 stages of the business life cycle are (1) Development/Seed, (2) Startup, (3) Growth/Survival, (4) Expansion/Rapid Growth, and (5) Maturity.',
            'At the Seed/Startup stage, the challenge is market acceptance and cash reserve management.',
            'At the Expansion/Maturity stage, the challenge is market competition, accounting software scalability, and executing renewal or exit strategies.'
          ],
          topics: [
            {
              id: 'top-gst302-25-1',
              title: 'Business Life Cycle Stages and Strategic Transitions',
              readingMinutes: 14,
              sourceReference: 'GST 302 Course Guide, Module 7, Unit 4, pp. 125–131',
              content:
                'Every enterprise evolves through predictable life-cycle stages:\n1. Development/Seed: Idea testing, feasibility research, and founding team assembly.\n2. Startup Stage: Launching legal operations, early customer feedback, and managing burn rate.\n3. Growth/Survival: Recurring revenues, operational fine-tuning, and reaching breakeven.\n4. Expansion / Rapid Growth: Entering new markets, scaling distribution channels, and managing increased competition.\n5. Maturity Stage: Dominating market presence, slowing revenue growth, and planning strategic renewal or exit strategies.',
              summaryPoints: [
                'Each life cycle stage demands different financing and operational structures.',
                'Maturity requires corporate revitalization to prevent stagnation and decline.'
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const AUTHENTIC_GST302_BASE_QUESTIONS: PastExamQuestionItem[] = [
  {
    id: 'pq-gst302-sae-1',
    courseId: 'course-gst302',
    courseCode: 'GST 302',
    courseTitle: 'Business Creation and Growth',
    documentId: 'pq-doc-gst302-exam-archives',
    documentName: 'GST302_BUSINESS_CREATION_AND_GROWTH_EXAM_ARCHIVES.pdf',
    sourceFileName: 'GST302_BUSINESS_CREATION_AND_GROWTH_99335b4e.pdf',
    linkedUnitId: 'unit-gst302-1',
    linkedUnitNumber: 1,
    linkedUnitTitle: 'Unit 1: Business Planning Process',
    year: 'Official NOUN Assessment',
    questionNumber: 'Unit 1 / SAE Q1',
    originalQuestionNumber: 1,
    pageNumber: 15,
    questionType: 'multiple_choice',
    marks: 2,
    totalMarks: 2,
    questionText: 'The need for a business plan includes all except:',
    options: [
      'Planning to launch a new business',
      'Expanding your existing business',
      'Adding a new product or product line',
      'Increasing your labour force'
    ],
    correctAnswer: 'Increasing your labour force',
    suppliedAnswer: 'd. Increasing your labour force (Feedback on page 16 confirms 1. D)',
    modelAnswer: 'According to Cagan (2006), full-scale business plans are spurred by launching a new business, expanding into new markets, adding product lines, or acquiring a company, but not routine hiring of labor.',
    keyRubricPoints: ['Selection of option D: Increasing your labour force'],
    difficulty: 'Standard',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  },
  {
    id: 'pq-gst302-sae-2',
    courseId: 'course-gst302',
    courseCode: 'GST 302',
    courseTitle: 'Business Creation and Growth',
    documentId: 'pq-doc-gst302-exam-archives',
    documentName: 'GST302_BUSINESS_CREATION_AND_GROWTH_EXAM_ARCHIVES.pdf',
    sourceFileName: 'GST302_BUSINESS_CREATION_AND_GROWTH_99335b4e.pdf',
    linkedUnitId: 'unit-gst302-1',
    linkedUnitNumber: 1,
    linkedUnitTitle: 'Unit 1: Business Planning Process',
    year: 'Official NOUN Assessment',
    questionNumber: 'Unit 1 / SAE Q2',
    originalQuestionNumber: 2,
    pageNumber: 15,
    questionType: 'multiple_choice',
    marks: 2,
    totalMarks: 2,
    questionText: 'A plan must be …………',
    options: [
      'Readable',
      'Accommodating',
      'Explicit',
      'Durable'
    ],
    correctAnswer: 'Explicit',
    suppliedAnswer: 'c. Explicit (Feedback on page 16 confirms 2. C)',
    modelAnswer: 'The principles of planning state that a plan must be Explicit (all steps completely spelled out), Intelligible, Flexible, and Written.',
    keyRubricPoints: ['Selection of option C: Explicit'],
    difficulty: 'Core',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  },
  {
    id: 'pq-gst302-sae-3',
    courseId: 'course-gst302',
    courseCode: 'GST 302',
    courseTitle: 'Business Creation and Growth',
    documentId: 'pq-doc-gst302-exam-archives',
    documentName: 'GST302_BUSINESS_CREATION_AND_GROWTH_EXAM_ARCHIVES.pdf',
    sourceFileName: 'GST302_BUSINESS_CREATION_AND_GROWTH_99335b4e.pdf',
    linkedUnitId: 'unit-gst302-1',
    linkedUnitNumber: 1,
    linkedUnitTitle: 'Unit 1: Business Planning Process',
    year: 'Official NOUN Assessment',
    questionNumber: 'Unit 1 / SAE Q3',
    originalQuestionNumber: 3,
    pageNumber: 15,
    questionType: 'multiple_choice',
    marks: 2,
    totalMarks: 2,
    questionText: 'One of the benefits of planning is …..',
    options: [
      'It justifies your plans and actions',
      'It increases "firefight"',
      'It keeps ideas in your memory',
      'It indicates your inability'
    ],
    correctAnswer: 'It justifies your plans and actions',
    suppliedAnswer: 'a. It justifies your plans and actions (Feedback on page 16 confirms 3. A)',
    modelAnswer: 'Preparing a business plan forces the entrepreneur to consider the reasoning behind plans and prove their validity, while reducing firefighting.',
    keyRubricPoints: ['Selection of option A: It justifies your plans and actions'],
    difficulty: 'Standard',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  },
  {
    id: 'pq-gst302-sae-4',
    courseId: 'course-gst302',
    courseCode: 'GST 302',
    courseTitle: 'Business Creation and Growth',
    documentId: 'pq-doc-gst302-exam-archives',
    documentName: 'GST302_BUSINESS_CREATION_AND_GROWTH_EXAM_ARCHIVES.pdf',
    sourceFileName: 'GST302_BUSINESS_CREATION_AND_GROWTH_99335b4e.pdf',
    linkedUnitId: 'unit-gst302-1',
    linkedUnitNumber: 1,
    linkedUnitTitle: 'Unit 1: Business Planning Process',
    year: 'Official NOUN Assessment',
    questionNumber: 'Unit 1 / SAE Q4',
    originalQuestionNumber: 4,
    pageNumber: 15,
    questionType: 'multiple_choice',
    marks: 2,
    totalMarks: 2,
    questionText: 'A written business plan should have all the following except __',
    options: [
      'Financial information',
      'Product or service',
      'Business objective',
      'Liquidation plan'
    ],
    correctAnswer: 'Liquidation plan',
    suppliedAnswer: 'd. Liquidation plan (Feedback on page 16 confirms 4. D)',
    modelAnswer: 'A written business plan outlines the business idea, entrepreneurs, objectives, products/services, marketing, management, and financial feasibility, not a liquidation plan.',
    keyRubricPoints: ['Selection of option D: Liquidation plan'],
    difficulty: 'Standard',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  },
  {
    id: 'pq-gst302-sae-5',
    courseId: 'course-gst302',
    courseCode: 'GST 302',
    courseTitle: 'Business Creation and Growth',
    documentId: 'pq-doc-gst302-exam-archives',
    documentName: 'GST302_BUSINESS_CREATION_AND_GROWTH_EXAM_ARCHIVES.pdf',
    sourceFileName: 'GST302_BUSINESS_CREATION_AND_GROWTH_99335b4e.pdf',
    linkedUnitId: 'unit-gst302-5',
    linkedUnitNumber: 5,
    linkedUnitTitle: 'Unit 5: Feasibility Analysis of New Ventures and Financing',
    year: 'Official NOUN Assessment',
    questionNumber: 'Unit 1 / SAE Q5',
    originalQuestionNumber: 5,
    pageNumber: 15,
    questionType: 'multiple_choice',
    marks: 2,
    totalMarks: 2,
    questionText: 'The importance of feasibility study cannot be overemphasized as it ___',
    options: [
      'provides comprehensive details about the business to determine if, and how it can succeed, and serve as a valuable tool for developing a good business plan',
      'does not list in details all the things you need to make the business works',
      'does not identify logistical and other business related problems and solutions',
      'does not serve as a solid foundation for developing your business plan'
    ],
    correctAnswer:
      'provides comprehensive details about the business to determine if, and how it can succeed, and serve as a valuable tool for developing a good business plan',
    suppliedAnswer: 'a. provides comprehensive details about the business... (Feedback confirms 5. A)',
    modelAnswer: 'Feasibility analysis evaluates the practicability, profitability, and operational viability of a business concept prior to committing financial capital.',
    keyRubricPoints: ['Selection of option A'],
    difficulty: 'Core',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  },
  {
    id: 'pq-gst302-tma-1',
    courseId: 'course-gst302',
    courseCode: 'GST 302',
    courseTitle: 'Business Creation and Growth',
    documentId: 'pq-doc-gst302-exam-archives',
    documentName: 'GST302_BUSINESS_CREATION_AND_GROWTH_EXAM_ARCHIVES.pdf',
    sourceFileName: 'GST302_BUSINESS_CREATION_AND_GROWTH_99335b4e.pdf',
    linkedUnitId: 'unit-gst302-3',
    linkedUnitNumber: 3,
    linkedUnitTitle: 'Unit 3: Opportunity Search and Identification',
    year: 'Official NOUN Assessment',
    questionNumber: 'TMA 1 / Q3',
    questionType: 'written_structured',
    marks: 20,
    totalMarks: 20,
    questionText: 'Identify and explain the five stages that lead to opportunity recognition in entrepreneurship.',
    suppliedAnswer: 'The five stages of opportunity identification are:\n1. Preparation: Pre-existing knowledge, background experience, and deliberate skill development.\n2. Incubation: Subconscious pondering of an unexploited market problem without formal analysis.\n3. Insight: The abrupt discovery of a workable solution or commercial concept ("eureka" moment).\n4. Evaluation: Investigating feasibility, profitability, and personal capabilities through market research.\n5. Elaboration: Exposing the idea to external analysis, resource planning, and detailed operational design.',
    modelAnswer: 'Preparation (prior experience), Incubation (subconscious gestation), Insight (sudden recognition), Evaluation (feasibility testing), and Elaboration (detailed business planning).',
    keyRubricPoints: [
      'Accurate identification of all 5 stages in order',
      'Detailed explanation of Preparation, Incubation, Insight, Evaluation, and Elaboration'
    ],
    difficulty: 'Core',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  },
  {
    id: 'pq-gst302-tma-2',
    courseId: 'course-gst302',
    courseCode: 'GST 302',
    courseTitle: 'Business Creation and Growth',
    documentId: 'pq-doc-gst302-exam-archives',
    documentName: 'GST302_BUSINESS_CREATION_AND_GROWTH_EXAM_ARCHIVES.pdf',
    sourceFileName: 'GST302_BUSINESS_CREATION_AND_GROWTH_99335b4e.pdf',
    linkedUnitId: 'unit-gst302-24',
    linkedUnitNumber: 24,
    linkedUnitTitle: 'Unit 3: Decision-Making Classifications in Business',
    year: 'Official NOUN Assessment',
    questionNumber: 'TMA 4 / Q2',
    questionType: 'written_structured',
    marks: 20,
    totalMarks: 20,
    questionText: 'Explain the classifications of business decisions according to Herbert Simon, Prof. Katona, and Ernest Dale.',
    suppliedAnswer: '1. Herbert Simon:\n- Programmed Decisions: Routine and repetitive, governed by established procedural algorithms and standard operating procedures.\n- Non-Programmed Decisions: Novel, unstructured, and complex problems requiring unique analysis and creative problem-solving.\n\n2. Prof. Katona:\n- Basic Decisions: High-level decisions of crucial long-term importance requiring deliberation (plant location, product diversification).\n- Routine Decisions: Repetitive tactical decisions requiring minimal deliberation.\n\n3. Ernest Dale:\n- Policy Decisions: High-level goals set by top management (capital structure, corporate vision).\n- Administrative Decisions: Determining the tactical means and resource allocations (middle management).\n- Executive Decisions: Daily operational executions carried out where the work is done.',
    modelAnswer: 'Herbert Simon distinguishes Programmed from Non-Programmed decisions. Katona classifies Basic and Routine decisions. Ernest Dale categorizes Policy (top), Administrative (middle), and Executive (operating) decisions.',
    keyRubricPoints: [
      'Herbert Simon programmed vs non-programmed distinction',
      'Katona basic vs routine distinction',
      'Ernest Dale policy, administrative, and executive hierarchy'
    ],
    difficulty: 'Core',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  }
];

export const AUTHENTIC_GST302_WINSMART_QUESTIONS: PastExamQuestionItem[] = newGst302Questions as any[];

export const GST302_QUESTIONS: PastExamQuestionItem[] = [
  ...AUTHENTIC_GST302_BASE_QUESTIONS,
  ...AUTHENTIC_GST302_WINSMART_QUESTIONS
];
