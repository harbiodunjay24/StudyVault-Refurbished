import { Course, PastExamQuestionItem, PastQuestionDocument, StudyModule } from '../types';
import {
  ECO344_UPLOADED_PQ_DOCUMENTS as AUTHENTIC_ECO344_PQ_DOCS,
  AUTHENTIC_ECO344_EXTRACTED_PAST_QUESTIONS
} from './eco344PastQuestionsData';

export const ECO344_UPLOADED_PQ_DOCUMENTS: PastQuestionDocument[] = AUTHENTIC_ECO344_PQ_DOCS;

export const ECO344_COURSE: Course = {
  id: 'course-eco344',
  code: 'ECO 344',
  title: 'International Economics',
  department: 'Department of Economics (Faculty of Social Sciences)',
  description:
    'National Open University of Nigeria (NOUN) undergraduate curriculum in International Economics by Dr. Yinka Ogunneye and Prof. James H. Landi. Covers global trade patterns, production possibility frontiers (PPF), general equilibrium in closed and open economies, Ricardian comparative advantage, Heckscher-Ohlin factor endowment theory, Stolper-Samuelson & Rybczynski theorems, the specific-factors (Ricardo-Viner) model, and government trade distortions.',
  createdAt: '2026-10-23T08:10:00Z',
  documents: [
    {
      id: 'doc-eco344-textbook',
      name: 'ECO344_37bf8463.pdf',
      fileType: 'pdf',
      fileSize: 1890000,
      uploadedAt: '2026-10-23T08:10:00Z',
      extractedHeadingsCount: 15,
      pageCount: 155,
      status: 'ready',
      processingStatus: 'fully_processed',
      summary:
        'Official NOUN primary course textbook and study guide for ECO 344: International Economics by Dr. Yinka Ogunneye and Prof. James H. Landi.'
    },
    {
      id: 'doc-eco344-psalmdata-pop-summary',
      name: 'ECO344_INTERNATIONAL_ECONOMICS_COMPLETE_POP_SUMMARY_637cb592.pdf',
      fileType: 'pdf',
      fileSize: 173179,
      uploadedAt: '2026-10-23T09:45:00Z',
      extractedHeadingsCount: 15,
      pageCount: 38,
      status: 'ready',
      processingStatus: 'fully_processed',
      summary:
        'Authentic NOUN Pen-on-Paper (POP) examination summary and past questions with verified model solutions covering sessions 2021_2, 2022_1, 2022_2, 2023_2, 2024_1, 2024_2, 2025_1, and 2025_2 by Psalmdata.'
    },
    {
      id: 'doc-eco344-campusflava-summary',
      name: 'ECO344_INTERNATIONAL_ECONOMICS_SUMMARY_08039407882_30c491f6.pdf',
      fileType: 'pdf',
      fileSize: 1345620,
      uploadedAt: '2026-10-23T09:45:00Z',
      extractedHeadingsCount: 15,
      pageCount: 38,
      status: 'ready',
      processingStatus: 'fully_processed',
      summary:
        'Comprehensive examination study guide and structured Q&A series covering specific-factors, price wedges, Prebisch-Singer thesis, and international trade policy by Campusflava / L&A Goldmine Solutions.'
    }
  ],
  pastQuestionDocuments: AUTHENTIC_ECO344_PQ_DOCS,
  modules: [
    {
      id: 'mod-eco344-1',
      moduleNumber: 1,
      title: 'Module 1: Economy and Global Trade',
      description:
        'Global economic integration, merchandise vs. services trade, factor mobility, production possibility frontiers, factor intensity, and general equilibrium in autarky.',
      units: [
        {
          id: 'unit-eco344-1',
          unitNumber: '1.0',
          title: 'Unit 1: Global Economy and Sectoral Structure of Trade',
          objectives: [
            'Define international economics, trade theory, and international finance',
            'Explain the growth of global trade and transnational interdependence',
            'Distinguish interregional trade from international trade (factor mobility and regulations)',
            'Analyze the sectoral structure of merchandise trade, services, and foreign direct investment (FDI)'
          ],
          unitRecapPoints: [
            'International economics divides into real analysis (trade theory, microeconomic general equilibrium) and monetary analysis (international finance, exchange rates, macroeconomics).',
            'Labor and capital are largely mobile domestically but face severe international immobility due to political barriers, sovereign borders, and immigration controls.',
            'Attaining national self-sufficiency is neither feasible nor desirable; trade allows countries to consume beyond domestic production constraints.',
            'Between 1963 and 1979, world real merchandise exports expanded at an average of 11.8% per year, far outstripping global GDP growth (6.1%).',
            'Multinational Enterprises (MNEs) and FDI facilitate global capital allocation despite theoretical assumptions of factor immobility.'
          ],
          topics: [
            {
              id: 'top-eco344-1-1',
              title: 'Perspective on the Theory of International Trade',
              readingMinutes: 12,
              sourceReference: 'ECO 344 Course Guide, Module 1, Unit 1, Section 3.1, pp. 16–18',
              content:
                'International trade is the exchange across national borders of goods, services, and factors, and the impacts of this trade on domestic and global economies. International economics divides conveniently into two parts: real analysis (trade theory) and monetary analysis (international finance).\n\nReal analysis studies why trade occurs, the implications for commodity and factor prices, gains from trade, and the welfare consequences of tariffs and quotas. It assumes barter exchange with a numeraire good, full employment, and balanced trade. Monetary analysis investigates exchange rates, balance of payments disequilibria, and the transmission of inflation.\n\nTwo fundamental features separate international trade from domestic/interregional trade:\n1. Factor Immobility: While labor and capital move freely between regions of a single country, international migration of labor is strictly limited by immigration laws, language, and social customs.\n2. Sovereign Regulatory Powers: National governments impose tariffs, quotas, import bans, and exchange restrictions that are prohibited between domestic states under constitutions.',
              summaryPoints: [
                'International trade spans real trade theory and monetary international finance.',
                'Factor mobility is high domestically but restricted internationally.',
                'Sovereign regulatory instruments (tariffs, quotas) distinguish international commerce from interregional exchange.'
              ],
              textbookDefinitions: [
                {
                  term: 'International Trade',
                  definition:
                    'The exchange across national borders of goods, services, and factors of production, and the resulting economic impacts on domestic and world welfare.',
                  sourceAuthor: 'Dr. Yinka Ogunneye'
                },
                {
                  term: 'Real Analysis (Trade Theory)',
                  definition:
                    'The study of equilibrium real trade flows, barter terms of trade, resource allocation, and welfare under microeconomic market-clearing conditions.',
                  sourceAuthor: 'Prof. James H. Landi'
                }
              ]
            },
            {
              id: 'top-eco344-1-2',
              title: 'Trade, Growth, and the Sectoral Structure of Trade',
              readingMinutes: 14,
              sourceReference: 'ECO 344 Course Guide, Module 1, Unit 1, Sections 3.2–3.4, pp. 18–26',
              content:
                'Trade volume has expanded at historical rates over recent decades. Table 1.1 reveals significant cross-national variations in openness (Export/GDP ratios). Very open trading economies like Singapore (147% in 1991 due to entrepôt transshipment) and Canada (24.4%) compare with large domestic continental economies like the United States (7.1%), where a massive domestic market absorbs most output.\n\nSectoral trade analysis categorizes trade into six broad commodity sectors:\n1. Food and Live Animals (FOOD)\n2. Fuels and Petroleum Products (FUEL)\n3. Chemicals and Pharmaceuticals (CHEM)\n4. Office Machines and Telecommunications (OFFTEL)\n5. Motor Vehicles and Automotive Parts (AUTO)\n6. Clothing and Textiles (CLOTH)\n\nDeveloping nations with abundant low-skilled labor show strong net exports in CLOTH and agriculture, while developed nations with high capital and R&D exhibit comparative advantages in CHEM, AUTO, and OFFTEL. Furthermore, intra-industry trade (trading similar manufactures like cars or electronics between industrialized nations) constitutes a massive share of world commerce.',
              summaryPoints: [
                'Export-to-GDP ratios reflect economic openness and trade structure.',
                'Singapore exemplifies entrepôt trade with exports exceeding national GDP.',
                'Commodity trade reflects comparative advantage rooted in land, labor, and capital endowments.'
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-2',
          unitNumber: '2.0',
          title: 'Unit 2: Supply and Production Possibilities',
          objectives: [
            'Formulate the neoclassical production function X = F(K, L)',
            'Derive isoquants and the marginal rate of technical substitution (MRTS)',
            'Demonstrate the Law of Diminishing Returns and Returns to Scale',
            'Derive producer equilibrium: w/r = MPL / MPK'
          ],
          unitRecapPoints: [
            'The production function X = F(K, L) links capital (K) and labor (L) to output (X).',
            'An isoquant is a contour line showing all input combinations yielding a constant output level.',
            'Diminishing returns occur when holding all inputs constant except one yields diminishing additions to output.',
            'Constant returns to scale (homogeneity of degree 1) means doubling inputs exactly doubles output: F(λK, λL) = λF(K, L).',
            'Producer cost minimization occurs where the isocost line is tangent to the isoquant: w/r = MPL / MPK.'
          ],
          topics: [
            {
              id: 'top-eco344-2-1',
              title: 'Production Functions, Isoquants, and Diminishing Returns',
              readingMinutes: 14,
              sourceReference: 'ECO 344 Course Guide, Module 1, Unit 2, Section 3.1, pp. 28–32',
              content:
                'The building block of the supply side is the neoclassical production function:\n\nX = F(K, L)\n\nTaking a horizontal slice through the 3D production hill at output height X yields a 2D isoquant. Isoquants are smooth, downward sloping, and strictly convex to the origin.\n\nThe Law of Diminishing Returns states: When the inputs of all but one factor of production are fixed and the amount of that factor is increased in turn, output increases at a decreasing rate. Graphically, the total product curve F(K₀, L) curves toward the labor axis, causing the marginal product of labor (MPL = ΔX / ΔL) to slope downwards.',
              summaryPoints: [
                'Isoquants illustrate substitution possibilities between capital and labor.',
                'The slope of an isoquant equals the ratio of marginal products: ΔK/ΔL = MPL / MPK.',
                'Diminishing marginal productivity is central to neoclassical cost curves.'
              ],
              formulas: [
                {
                  id: 'form-eco-2-1',
                  name: 'Production Function',
                  formulaDisplay: 'X = F(K, L)',
                  contextAndPurpose: 'Specifies the maximum output producible from capital (K) and labor (L).',
                  variables: [
                    { symbol: 'X', name: 'Output', explanation: 'Physical quantity of commodity produced' },
                    { symbol: 'K', name: 'Capital', explanation: 'Capital services input' },
                    { symbol: 'L', name: 'Labor', explanation: 'Labor services input' }
                  ]
                }
              ]
            },
            {
              id: 'top-eco344-2-2',
              title: 'Returns to Scale and Producer Equilibrium',
              readingMinutes: 15,
              sourceReference: 'ECO 344 Course Guide, Module 1, Unit 2, Sections 3.2–3.3, pp. 32–36',
              content:
                'Returns to scale evaluate how output responds to equal-proportional increases in all inputs. A production function is homogeneous of degree k if:\n\nF(λK, λL) = λ^k F(K, L)\n\n- If k = 1: Constant Returns to Scale (CRS).\n- If k > 1: Increasing Returns to Scale (IRS / economies of scale).\n- If k < 1: Decreasing Returns to Scale (DRS).\n\nUnder competitive input markets, firms minimize cost subject to an isocost line:\nC₀ = wL + rK  ==>  K = (C₀/r) - (w/r)L\n\nOptimal producer equilibrium requires tangency between the isocost line and the highest attainable isoquant:\n\nw / r = MPL / MPK',
              summaryPoints: [
                'Under constant returns to scale (k = 1), doubling both inputs exactly doubles output.',
                'Producer efficiency requires equating factor price ratio w/r to the ratio of marginal products MPL/MPK.',
                'Along any ray from the origin, isoquant slopes are identical under CRS.'
              ],
              formulas: [
                {
                  id: 'form-eco-2-2',
                  name: 'Producer Efficiency Tangency Condition',
                  formulaDisplay: 'w / r = MPL / MPK',
                  contextAndPurpose: 'Condition for cost minimization and profit maximization in factor markets.',
                  variables: [
                    { symbol: 'w', name: 'Wage Rate', explanation: 'Cost of hiring one unit of labor' },
                    { symbol: 'r', name: 'Rental Rate', explanation: 'Cost of renting one unit of capital' },
                    { symbol: 'MPL', name: 'Marginal Product of Labor', explanation: 'ΔX / ΔL' },
                    { symbol: 'MPK', name: 'Marginal Product of Capital', explanation: 'ΔX / ΔK' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-3',
          unitNumber: '3.0',
          title: 'Unit 3: Goods and Factor Model',
          objectives: [
            'Formulate the 2-good, 2-factor general equilibrium model',
            'Define factor intensity and the Strong Factor Intensity Hypothesis',
            'Construct the Edgeworth-Bowley Box and derive the Efficiency Locus',
            'Derive the concave Production Possibility Frontier (PPF) and Marginal Rate of Transformation (MRT)'
          ],
          unitRecapPoints: [
            'Commodity Y is capital-intensive relative to X if Ky/Ly > Kx/Lx at all prevailing factor price ratios (Strong Factor Intensity Hypothesis).',
            'The Edgeworth-Bowley box bounds total capital (K) and labor (L); tangencies of isoquants define the efficiency locus.',
            'The efficiency locus maps directly into a concave Production Possibility Frontier (PPF / transformation curve).',
            'The slope of the PPF is the Marginal Rate of Transformation: MRT = -ΔY / ΔX = Px / Py.'
          ],
          topics: [
            {
              id: 'top-eco344-3-1',
              title: 'Factor Intensities and the Edgeworth-Bowley Box',
              readingMinutes: 15,
              sourceReference: 'ECO 344 Course Guide, Module 1, Unit 3, Sections 3.1–3.2, pp. 38–43',
              content:
                'In the two-good (X, Y), two-factor (K, L) model, factor intensity is defined by the capital-labor ratio:\nky = Ky / Ly  and  kx = Kx / Lx\n\nIf ky > kx at fixed factor prices, Y is capital-intensive and X is labor-intensive. The Strong Factor Intensity Hypothesis assumes that Y remains capital-intensive relative to X across all possible wage-rental ratios w/r, ruling out factor-intensity reversals.\n\nThe Edgeworth-Bowley box has dimensions L (width) and K (height). Plotting X isoquants from origin Ox and Y isoquants inverted from origin Oy, points where isoquants are mutually tangent satisfy:\n\nMPLx / MPKx = w/r = MPLy / MPKy\n\nThe locus connecting all tangencies is the contract curve or efficiency locus (OxBCOy). Any point off this curve is inefficient because output of one good could be increased without reducing the other.',
              summaryPoints: [
                'Factor intensity compares K/L across industries.',
                'The Edgeworth box contract curve represents Pareto efficiency in production.',
                'Every point on the efficiency locus satisfies equal marginal rates of technical substitution.'
              ]
            },
            {
              id: 'top-eco344-3-2',
              title: 'The Production Possibility Frontier and Competitive Equilibrium',
              readingMinutes: 16,
              sourceReference: 'ECO 344 Course Guide, Module 1, Unit 3, Sections 3.2–3.4, pp. 40–50',
              content:
                'Mapping the efficiency locus into output space yields the Production Possibility Frontier (PPF). The PPF is strictly concave to the origin (bowed outward) because factors are not equally suited to both sectors: shifting resources transfers "wrong" factor mixes, generating increasing opportunity costs.\n\nThe slope of the PPF is the Marginal Rate of Transformation (MRT):\nMRT = -ΔY / ΔX = Px / Py\n\nCompetitive profit-maximizing firms produce where the commodity price ratio line p = Px/Py is tangent to the PPF. At this point, the economy attains the highest national budget line and maximizes the value of national output at prevailing prices.',
              summaryPoints: [
                'The PPF is bowed outward (concave) due to differing factor intensities and diminishing returns.',
                'MRT = -ΔY / ΔX measures the opportunity cost of producing one more unit of X in terms of forgone Y.',
                'Competitive output equilibrium occurs at the tangency point MRT = Px / Py.'
              ],
              formulas: [
                {
                  id: 'form-eco-3-1',
                  name: 'Marginal Rate of Transformation (MRT)',
                  formulaDisplay: 'MRT = -ΔY / ΔX = Px / Py',
                  contextAndPurpose: 'Equates the marginal opportunity cost of production to the relative market price ratio.',
                  variables: [
                    { symbol: 'MRT', name: 'Marginal Rate of Transformation', explanation: 'Slope of the production frontier' },
                    { symbol: 'Px/Py', name: 'Relative Commodity Price Ratio', explanation: 'Price of X in terms of Y' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-4',
          unitNumber: '4.0',
          title: 'Unit 4: General Equilibrium in a Closed Economy (Autarky)',
          objectives: [
            'State the three general equilibrium conditions in a closed economy',
            'Analyze community indifference curves and the marginal rate of substitution (MRS)',
            'Demonstrate Walrasian equilibrium and the price mechanism',
            'Contrast closed economy market clearing with open economy trade balance'
          ],
          unitRecapPoints: [
            'Autarky general equilibrium requires (1) Producer optimization (MRT = Px/Py), (2) Consumer optimization (MRS = Px/Py), and (3) Market clearing (Xc = Xp, Yc = Yp).',
            'In autarky, production and consumption must coincide exactly at point A on the PPF.',
            'In an open economy, international trade breaks the production=consumption constraint: countries consume on a higher national budget line.',
            'Walras\' Law states that in an n-market economy, if n-1 markets clear, the nth market must also clear.'
          ],
          topics: [
            {
              id: 'top-eco344-4-1',
              title: 'Autarky Equilibrium and Community Welfare',
              readingMinutes: 14,
              sourceReference: 'ECO 344 Course Guide, Module 1, Unit 4, Section 3.1, pp. 51–53',
              content:
                'A closed economy without international trade is in autarky. General equilibrium requires the simultaneous satisfaction of three conditions:\n\n1. Producer Optimization: Px / Py = MRT (firms maximize output value).\n2. Consumer Optimization: Px / Py = MRS (consumers maximize utility where indifference curves are tangent to price line).\n3. Market Clearing: Xc = Xp and Yc = Yp (domestic consumption equals domestic production).\n\nAt autarky point A, the PPF and the highest attainable community indifference curve Ua share a common tangent at price ratio Pa. This satisfies Adam Smith\'s invisible hand theorem under perfect competition.',
              summaryPoints: [
                'In autarky, an economy cannot consume what it does not produce.',
                'Equilibrium price ratio Pa reflects domestic supply capabilities and consumer tastes.',
                'Point A is Pareto optimal given autarkic domestic constraints.'
              ]
            },
            {
              id: 'top-eco344-4-2',
              title: 'Excess Demand Functions and International General Equilibrium',
              readingMinutes: 15,
              sourceReference: 'ECO 344 Course Guide, Module 1, Unit 4, Sections 3.2–3.5, pp. 53–59',
              content:
                'When trade opens at world price ratio p* = P*x / P*y, the market clearing condition is replaced by the trade balance condition:\n\nP*x (Xc - Xp) + P*y (Yc - Yp) = 0\n==> P*x Xc + P*y Yc = P*x Xp + P*y Yp\n\nThe value of consumption equals the value of production. The excess demand for good X is defined as Ex = Xc - Xp. If Ex > 0, the country has an excess demand and imports X; if Ex < 0, it has an excess supply and exports X.\n\nWorld general equilibrium occurs where Home import demand equals Foreign export supply: Ex + E*x = 0. According to Walras\' Law, when the market for X clears, the market for Y clears automatically.',
              summaryPoints: [
                'Trade loosens the domestic production constraint.',
                'Excess demand function Ex = Xc - Xp slopes downwards.',
                'World equilibrium relative price p* settles between the two autarky price ratios: Pah < p* < Paf.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-eco344-2',
      moduleNumber: 2,
      title: 'Module 2: The Theory of Gains from Trade',
      description:
        'The Gains-from-Trade theorem, decomposition into exchange vs. specialization gains, income redistribution with heterogeneous tastes and endowments, and harmful trade effects.',
      units: [
        {
          id: 'unit-eco344-5',
          unitNumber: '1.0',
          title: 'Unit 1: The Gains from Trade and the Gains-from-Trade Theorem',
          objectives: [
            'Prove the Gains-from-Trade Theorem using revealed preference',
            'Examine the tangency and convexity conditions',
            'Identify circumstances where trade gains fail to materialize (market distortions)',
            'List factors affecting the magnitude of gains from trade'
          ],
          unitRecapPoints: [
            'The Gains-from-Trade Theorem proves that free trade consumption is preferred to autarky consumption because the autarky bundle is affordable at free trade prices but rejected.',
            'Gains require two technical conditions: Tangency condition (prices tangent to PPF) and Convexity condition (convex production set).',
            'When market distortions (taxes, monopoly) or extreme increasing returns exist, trade may fail to increase welfare.',
            'Factors affecting gains: cost ratio differences, demand/supply elasticity, factor endowments, country size, and terms of trade.'
          ],
          topics: [
            {
              id: 'top-eco344-5-1',
              title: 'Formal Proof of the Gains-from-Trade Theorem',
              readingMinutes: 14,
              sourceReference: 'ECO 344 Course Guide, Module 2, Unit 1, Sections 3.1–3.2, pp. 60–66',
              content:
                'The Gains-from-Trade Theorem provides a formal revealed-preference proof that free trade improves national welfare. At world prices p*, competitive producers maximize value at point Q (free trade production), so:\n\nP*x Xfp + P*y Yfp ≥ P*x Xap + P*y Yap  (Eq. 5.1)\n\nSubstituting autarky market clearing (Xap = Xac, Yap = Yac) and free trade trade balance (P*x Xfp + P*y Yfp = P*x Xfc + P*y Yfc) yields:\n\nP*x Xfc + P*y Yfc ≥ P*x Xac + P*y Yac  (Eq. 5.3)\n\nThis proves that the autarky consumption bundle costs less than the free trade consumption bundle at free trade prices. Because consumers could afford the autarky bundle but chose the free trade bundle, the free trade bundle is revealed preferred: Uf > Ua.',
              summaryPoints: [
                'Free trade allows consumers to reach higher community indifference curves.',
                'The autarky bundle is rejected in favor of the superior free trade bundle.',
                'Trade is a positive-sum game, not a mercantilist zero-sum game.'
              ]
            },
            {
              id: 'top-eco344-5-2',
              title: 'Factors Determining the Magnitude of Gains from Trade',
              readingMinutes: 12,
              sourceReference: 'ECO 344 Course Guide, Module 2, Unit 1, Section 3.3, pp. 66–68',
              content:
                'The size and distribution of gains from trade depend on six key economic variables:\n1. Differences in Comparative Cost Ratios: The wider the gap between domestic autarky cost ratios and international terms of trade, the greater the gains.\n2. Elasticity of Demand and Supply: Countries with elastic reciprocal demand capture higher welfare surpluses.\n3. Factor Availability: Specialization based on abundant factors minimizes production costs.\n4. Country Size: Small countries tend to gain proportionately more than large countries because world prices settle close to the large country\'s autarky ratio, allowing the small country to trade far from its autarky prices.\n5. Terms of Trade: Shifts in export prices relative to import prices directly expand real purchasing power.\n6. Productive Efficiency: Improvements in technical efficiency lower export costs and enhance trade competitiveness.',
              summaryPoints: [
                'Wider cost divergences expand the gains from trade.',
                'Small countries often gain more per capita by trading at large-country world prices.',
                'Favorable terms of trade enhance national purchasing power.'
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-6',
          unitNumber: '2.0',
          title: 'Unit 2: Gain from Exchange and Gain from Specialization',
          objectives: [
            'Decompose total trade gains into Gains from Exchange and Gains from Specialization',
            'Demonstrate the Edgeworth exchange box and Pareto optimal contract curve',
            'Analyze income distribution with heterogeneous tastes and endowments',
            'Explain how trade can create winners and losers within a society'
          ],
          unitRecapPoints: [
            'Total trade gains = Gain from Exchange (trading fixed autarky output at world prices) + Gain from Specialization (reallocating resources toward comparative advantage).',
            'Even when a nation gains in aggregate, individuals with heterogeneous tastes or specific endowments can become worse off.',
            'If trade raises the price of good X, consumers who intensely prefer X suffer a real welfare loss unless compensated.',
            'Stolper-Samuelson income redistribution: trade raises the return to the abundant factor and reduces the return to the scarce factor.'
          ],
          topics: [
            {
              id: 'top-eco344-6-1',
              title: 'Decomposition of Gains from Trade',
              readingMinutes: 15,
              sourceReference: 'ECO 344 Course Guide, Module 2, Unit 2, Sections 3.1–3.2, pp. 69–73',
              content:
                'Total gains from trade consist of two distinct steps (Figure 5.7):\n1. Gains from Exchange: Moving from autarky consumption point A to point E on the world price line p* with production frozen at A. Utility increases from Ua to Uc purely from trading endowments.\n2. Gains from Specialization: Reallocating production along the PPF from point A to point Q (expanding output of the comparative advantage good X). The budget line shifts outward, moving consumption from E to C and elevating utility from Uc to Uf.\n\nIn pure exchange (the Edgeworth box between Jim and Janet), voluntary barter moves the parties into the lens of mutual benefit, reaching the Pareto contract curve where their marginal rates of substitution are equal.',
              summaryPoints: [
                'Gains from exchange require no changes in production.',
                'Gains from specialization require moving resources to the comparative advantage sector.',
                'Both components contribute to total free trade welfare elevation.'
              ]
            },
            {
              id: 'top-eco344-6-2',
              title: 'Distribution of Gains with Heterogeneous Tastes and Endowments',
              readingMinutes: 14,
              sourceReference: 'ECO 344 Course Guide, Module 2, Unit 2, Sections 3.3–3.4, pp. 73–76',
              content:
                'Trade gains are not shared equally among citizens. Two causes of internal conflict arise:\n1. Heterogeneous Tastes: When trade raises the relative price of good X, consumers with a strong preference for X suffer a decline in utility (e.g., British accession to the EEC in 1973 raised meat prices, hurting low-income large families).\n2. Heterogeneous Endowments: In an economy of capitalists and laborers, trade in labor-intensive good X increases labor demand and real wages while reducing capital rentals. Capitalists experience an unambiguous loss in real income (Figure 5.9).\n\nThus, trade generates internal political conflicts between factor owners, providing the rationale for protectionist lobbying.',
              summaryPoints: [
                'Aggregate national gains can coexist with individual losses.',
                'Consumers whose favorite goods become expensive through export lose real purchasing power.',
                'Factor income redistribution creates domestic winners and losers.'
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-7',
          unitNumber: '3.0',
          title: 'Unit 3: Causes and Consequences of Trade',
          objectives: [
            'State the five conditions of the No-Trade Model',
            'Explain how relaxing each condition creates a basis for trade',
            'Examine the five harmful consequences of trade on developing economies (Singer-Prebisch thesis)'
          ],
          unitRecapPoints: [
            'The No-Trade Model specifies 5 conditions: (1) identical production functions, (2) identical relative endowments, (3) constant returns to scale, (4) identical/homogeneous tastes, (5) absence of distortions.',
            'Relaxing any one condition provides a distinct theoretical basis for international trade.',
            'Potential harmful consequences for developing countries: Dual economies, enclave development, limited gains from primary exports (Nurkse), negative demonstration effects, and secular terms-of-trade deterioration (Raul Prebisch).'
          ],
          topics: [
            {
              id: 'top-eco344-7-1',
              title: 'The Five Conditions of the No-Trade Model',
              readingMinutes: 14,
              sourceReference: 'ECO 344 Course Guide, Module 2, Unit 3, Sections 3.1–3.2, pp. 77–82',
              content:
                'To isolate the fundamental causes of trade, economists construct a No-Trade Model where autarky price ratios in all nations are identical. Five sufficient conditions guarantee zero trade:\n1. Identical production functions (technologies) across countries.\n2. Identical relative factor endowments (same K/L ratio).\n3. Constant returns to scale in all industries.\n4. Identical and homogeneous consumer preferences worldwide.\n5. Absence of distortions (no taxes, tariffs, subsidies, or monopoly power).\n\nIf any single condition is relaxed, autarky price ratios diverge, creating comparative advantage and inducing trade.',
              summaryPoints: [
                'The No-Trade Model neutralizes all trade determinants simultaneously.',
                'Relaxing technologies yields the Ricardian model.',
                'Relaxing factor endowments yields the Heckscher-Ohlin model.'
              ]
            },
            {
              id: 'top-eco344-7-2',
              title: 'Consequences and Criticisms of Trade for Developing Countries',
              readingMinutes: 15,
              sourceReference: 'ECO 344 Course Guide, Module 2, Unit 3, Section 3.3, pp. 82–85',
              content:
                'Economists like Raul Prebisch, Hans Singer, and Ragnar Nurkse argue that international trade can produce adverse structural effects in developing nations:\n1. Dual Economies: Enclave export sectors develop modern infrastructure while the vast agrarian hinterland remains neglected and backward.\n2. Economic Imperialism & Inflow of Capital: Foreign investment extracts natural resources for export without developing domestic manufacturing.\n3. Inelastic Primary Export Demand (Nurkse): Synthetics and agricultural protectionism in the West depress primary commodity export earnings.\n4. Negative Demonstration Effect: Luxury consumption patterns copied from wealthy nations reduce domestic savings and capital accumulation.\n5. Secular Deterioration in Terms of Trade (Prebisch-Singer Thesis): Primary commodity prices decline relative to manufactured imports over time.',
              summaryPoints: [
                'Primary-exporting developing nations face structural terms-of-trade deterioration.',
                'Enclave development creates dual economic structures.',
                'Demonstration effects suppress domestic capital formation.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-eco344-3',
      moduleNumber: 3,
      title: 'Module 3: Differences in Technology and the Heckscher-Ohlin Model',
      description:
        'Ricardian comparative advantage, role of wages, Heckscher-Ohlin factor proportions theory, Stolper-Samuelson magnification theorem, Rybczynski theorem, and factor content.',
      units: [
        {
          id: 'unit-eco344-8',
          unitNumber: '1.0',
          title: 'Unit 1: Model of Production Function Differences (Ricardian Model)',
          objectives: [
            'Formulate the Ricardian one-factor model with constant unit labor requirements',
            'Distinguish absolute advantage from comparative advantage',
            'Demonstrate mutual gains from trade under complete Ricardian specialization'
          ],
          unitRecapPoints: [
            'In the Ricardian model, labor is the only factor of production, and technology differences (α and β) determine comparative advantage.',
            'Absolute advantage (producing more output per labor unit) determines real wages, but comparative advantage (lower opportunity cost) determines trade direction.',
            'Even if Country F has an absolute advantage in both goods, Country H still has a comparative advantage in the good where its relative disadvantage is smallest.',
            'Production frontiers are linear, leading to complete specialization at world price ratios differing from autarky slopes.'
          ],
          topics: [
            {
              id: 'top-eco344-8-1',
              title: 'Ricardian Comparative Advantage and Production Frontiers',
              readingMinutes: 15,
              sourceReference: 'ECO 344 Course Guide, Module 3, Unit 1, Sections 3.1–3.4, pp. 86–93',
              content:
                'David Ricardo demonstrated that trade is driven by differences in technology. With labor as the sole factor, production functions are linear:\nX = α L_x  and  Y = β L_y\n\nThe slope of the linear production frontier is -ΔY/ΔX = β/α, which equals the domestic autarky price ratio. A country has an absolute advantage in X if αh > αf, but a comparative advantage if βh/αh < βf/αf.\n\nWhen trade opens at international price p*:\n- If p* > βh/αh, Country H completely specializes in X and produces zero Y.\n- If p* < βh/αh, Country H completely specializes in Y and produces zero X.\n\nWorld production of both goods expands when labor moves according to comparative advantage.',
              summaryPoints: [
                'Linear production frontiers generate constant opportunity costs.',
                'Comparative advantage is defined by relative marginal labor productivities.',
                'Complete specialization maximizes world output.'
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-9',
          unitNumber: '2.0',
          title: 'Unit 2: Role of Wages in the Ricardian Framework',
          objectives: [
            'Analyze wage theories: Subsistence, Wages-Fund, Marxian, and Bargaining theories',
            'Formulate Ricardian autarky and free trade wage equations',
            'Demonstrate that absolute advantage governs real wages while comparative advantage governs trade patterns'
          ],
          unitRecapPoints: [
            'Wage theories evolved from Adam Smith\'s market mechanism, Ricardo\'s "Iron Law" subsistence theory, the Wages-Fund theory, to collective bargaining.',
            'In the Ricardian model, competitive firms pay labor the value of marginal product: Px α = w and Py β = w.',
            'Free trade increases real wages in terms of imported goods for workers in both countries: wh/P*x = βh/p* > αh.',
            'Countries with superior absolute technology enjoy higher real wage levels in equilibrium.'
          ],
          topics: [
            {
              id: 'top-eco344-9-1',
              title: 'Theories of Wage Determination and Ricardian Real Wages',
              readingMinutes: 16,
              sourceReference: 'ECO 344 Course Guide, Module 3, Unit 2, Sections 3.1–3.3, pp. 94–102',
              content:
                'Historical wage theories laid the groundwork for modern labor economics:\n- Subsistence Theory (Iron Law of Wages): Population growth drives wages down to the bare biological minimum required for survival (Ricardo, Malthus).\n- Wages-Fund Theory: A predetermined stock of capital is divided by the working population to establish the average wage.\n- Marxian Surplus-Value: Capitalists expropriate surplus value generated by labor beyond subsistence.\n- Bargaining Theory: Wages are determined within a range by the relative bargaining leverage of unions and employers.\n\nIn the Ricardian trade framework, nominal wages adjust to reflect productivity differences:\nwh / P*x = βh / p* > αh\n\nTrade leaves the real wage constant in terms of the export good but raises it in terms of the imported good, raising worker welfare from Ua to Uf.',
              summaryPoints: [
                'Classical wage theories emphasized biological subsistence and capital funds.',
                'In Ricardian equilibrium, real wages equal marginal productivities of labor.',
                'Trade raises worker real purchasing power in terms of imported commodities.'
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-10',
          unitNumber: '3.0',
          title: 'Unit 3: The Heckscher-Ohlin Model',
          objectives: [
            'State the Heckscher-Ohlin Theorem',
            'Define factor abundance in physical terms: (K/L)h > (K/L)f',
            'Explain how trade in goods substitutes for international factor mobility',
            'Analyze the assumptions and potential fragility (factor intensity reversals)'
          ],
          unitRecapPoints: [
            'Heckscher-Ohlin Theorem: A country will export the commodity that uses its relatively abundant factor intensively, and import the commodity that uses its scarce factor intensively.',
            'Endowment definitions: Country H is capital-abundant if (K/L)h > (K/L)f.',
            'Commodity trade acts as an indirect export of abundant factor services.',
            'Assumptions include identical CRS technologies, identical preferences, perfect competition, factor mobility internally, and no factor-intensity reversals.'
          ],
          topics: [
            {
              id: 'top-eco344-10-1',
              title: 'Factor Endowments and the Heckscher-Ohlin Theorem',
              readingMinutes: 16,
              sourceReference: 'ECO 344 Course Guide, Module 3, Unit 3, Sections 3.1–3.4, pp. 103–111',
              content:
                'The Heckscher-Ohlin (H-O) model departs from Ricardo by assuming identical technologies across nations and explaining trade purely through national differences in factor endowments.\n\nCore Assumptions:\n1. 2 countries, 2 goods (X, Y), 2 factors (Capital K, Labor L).\n2. Identical constant-returns-to-scale technologies across countries.\n3. Good Y is capital-intensive: (K/L)y > (K/L)x at all factor prices.\n4. Country H is capital-abundant: (K/L)h > (K/L)f.\n5. Factors are perfectly mobile across domestic sectors but immobile across borders.\n6. Tastes are identical and homothetic.\n\nH-O Theorem: Capital-abundant Country H exports capital-intensive good Y and imports labor-intensive good X. In doing so, Country H implicitly exports the services of its abundant capital and imports the services of scarce labor.',
              summaryPoints: [
                'H-O theory explains inter-industry trade through factor proportions.',
                'Goods trade acts as a substitute for international factor migration.',
                'Factor intensity reversals would invalidate the theorem.'
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-11',
          unitNumber: '4.0',
          title: 'Unit 4: The Stolper-Samuelson and Rybczynski Theorems',
          objectives: [
            'State and prove the Stolper-Samuelson Theorem',
            'Explain the Magnification Effect for prices and outputs',
            'State and prove the Rybczynski Theorem using the Edgeworth box',
            'Explain the Factor-Price-Equalization and Heckscher-Ohlin-Vanek theorems'
          ],
          unitRecapPoints: [
            'Stolper-Samuelson Theorem (1941): An increase in the relative price of a good increases the real return to the factor used intensively in its production and reduces the real return to the other factor.',
            'Price Magnification Effect: %Δr < %ΔPy < %ΔPx < %Δw when Px rises.',
            'Rybczynski Theorem (1955): At constant commodity prices, an increase in a factor\'s endowment leads to a more than proportional expansion of the output of the good using that factor intensively and an absolute decline in the output of the other good.',
            'Factor-Price-Equalization Theorem (Samuelson): Free trade in goods equalizes the real and nominal prices of homogeneous factors across countries.',
            'Heckscher-Ohlin-Vanek Theorem: Generalizes H-O to many goods and factors in terms of factor content of trade.'
          ],
          topics: [
            {
              id: 'top-eco344-11-1',
              title: 'The Stolper-Samuelson Theorem and Magnification Effect',
              readingMinutes: 16,
              sourceReference: 'ECO 344 Course Guide, Module 3, Unit 4, Section 3.1, pp. 112–117',
              content:
                'Wolfgang Stolper and Paul Samuelson (1941) proved that movements in commodity prices have determinate effects on real factor incomes.\n\nWhen the relative price of labor-intensive good X rises (Px/Py increases):\n- The labor-intensive industry expands, raising the capital-labor ratio in both industries.\n- Higher K/L raises the marginal product of labor and reduces the marginal product of capital in both sectors.\n- Real wages (w/Px and w/Py) rise unambiguously, while real capital rentals (r/Px and r/Py) fall.\n\nJones Magnification Effect:\n%Δr < %ΔPy < %ΔPx < %Δw\n\nImplication: Free trade benefits a nation\'s abundant factor and hurts its scarce factor. Tariffs protect the scarce factor.',
              summaryPoints: [
                'Stolper-Samuelson links commodity prices to factor distribution.',
                'The abundant factor gains while the scarce factor suffers real income loss.',
                'Explains union protectionism in capital-abundant nations.'
              ],
              formulas: [
                {
                  id: 'form-eco-4-1',
                  name: 'Stolper-Samuelson Magnification Effect',
                  formulaDisplay: '%Δr < %ΔPy < %ΔPx < %Δw',
                  contextAndPurpose: 'Demonstrates that factor prices change by a greater percentage than commodity prices.',
                  variables: [
                    { symbol: '%Δw', name: 'Percentage Change in Wage', explanation: 'Percentage increase in nominal wage rate' },
                    { symbol: '%ΔPx', name: 'Percentage Change in Price of X', explanation: 'Commodity price increase' },
                    { symbol: '%Δr', name: 'Percentage Change in Rental Rate', explanation: 'Percentage change in capital return' }
                  ]
                }
              ]
            },
            {
              id: 'top-eco344-11-2',
              title: 'The Rybczynski Theorem and Factor-Price Equalization',
              readingMinutes: 16,
              sourceReference: 'ECO 344 Course Guide, Module 3, Unit 4, Sections 3.2–3.4, pp. 117–124',
              content:
                'Tadeusz Rybczynski (1955) demonstrated that at constant commodity prices (and thus constant factor prices and constant K/L ratios in both sectors), an increase in labor endowment (ΔL > 0):\n- Shifts the Edgeworth origin Oy outwards.\n- Labor-intensive industry X absorbs all new labor plus additional capital and labor released from Y.\n- Output of X expands more than proportionally, while output of capital-intensive good Y experiences an absolute decline.\n\nFactor-Price-Equalization Theorem: Under free trade, identical technologies, and incomplete specialization, commodity trade equalizes real wages and capital rental rates across countries without requiring labor migration.\n\nHeckscher-Ohlin-Vanek (Factor-Content) Theorem: For many goods and factors, net exports embody factor services proportional to relative national factor abundance.',
              summaryPoints: [
                'Rybczynski: Factor growth causes a biased expansion of the intensive sector and absolute contraction of the other.',
                'Factor-price equalization eliminates international wage disparities under free trade.',
                'Factor-content theorem generalizes H-O to higher dimensions.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'mod-eco344-4',
      moduleNumber: 4,
      title: 'Module 4: The Factors Model and Government Policies as Determinants of Trade',
      description:
        'The Specific-Factors (Ricardo-Viner) model, short-run factor price determination, neoclassical ambiguity, and domestic policy distortions (taxes and subsidies).',
      units: [
        {
          id: 'unit-eco344-12',
          unitNumber: '1.0',
          title: 'Unit 1: The Specific Factors Model',
          objectives: [
            'Formulate the 2-good, 3-factor Ricardo-Viner model',
            'Determine labor allocation using value of marginal product curves (VMPLX and VMPLY)',
            'Analyze short-run factor returns and the Neoclassical Ambiguity for mobile labor'
          ],
          unitRecapPoints: [
            'The Specific-Factors model assumes labor is mobile between sectors, but capital (R and S) is sector-specific in the short run.',
            'Labor allocates between sectors until VMPLX = VMPLY = w.',
            'A rise in the price of good X raises the real return to X-specific capital, lowers the real return to Y-specific capital, and creates neoclassical ambiguity for labor.',
            'Capital owners in expanding sectors lobby for free trade, while capital owners in import-competing sectors lobby for tariffs.'
          ],
          topics: [
            {
              id: 'top-eco344-12-1',
              title: 'Structure of the Specific-Factors Model and Factor Incomes',
              readingMinutes: 16,
              sourceReference: 'ECO 344 Course Guide, Module 4, Unit 1, Sections 3.1–3.3, pp. 125–132',
              content:
                'Developed by Jacob Viner, Ronald Jones (1971), and Michael Mussa (1974), the model examines short-run adjustments where capital cannot quickly migrate between sectors.\n\nStructure: 2 commodities (X, Y) and 3 factors:\n- Labor (L): Mobile between both sectors.\n- Sector-X Capital (Rx): Specific to industry X.\n- Sector-Y Capital (Sy): Specific to industry Y.\n\nLabor demand is given by VMPLx = Px MPLx and VMPLy = Py MPLy. When Px rises:\n1. VMPLx shifts upward, raising the nominal wage from w to w\'.\n2. Capital in sector X receives a magnified real return: %Δr_x > %ΔPx > %Δw.\n3. Capital in sector Y suffers an unambiguous real loss: rentals and purchasing power fall.\n4. Neoclassical Ambiguity: Real wage w/Py rises (can buy more Y) but w/Px falls (can buy less X). Whether labor gains depends on personal consumption baskets.',
              summaryPoints: [
                'Specific factors model captures short-run immobility.',
                'Specific factor in the expanding sector unambiguously gains.',
                'Specific factor in the contracting sector unambiguously loses.',
                'Labor welfare change is ambiguous (neoclassical ambiguity).'
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-13',
          unitNumber: '2.0',
          title: 'Unit 2: Endowment Changes and Factor Prices in the Specific-Factors Model',
          objectives: [
            'Analyze the effects of specific factor growth (ΔSy > 0) on wages and rentals',
            'Analyze the effects of labor immigration (ΔL > 0) on sector outputs and wages',
            'Explain why Factor Price Equalization fails in the specific-factors model'
          ],
          unitRecapPoints: [
            'An increase in a specific capital stock (Sy) raises labor\'s marginal product, increases the real wage, and lowers returns to both specific capital stocks.',
            'An increase in the mobile labor force lowers nominal and real wages, expanding output in both sectors and raising real returns to both specific capital stocks.',
            'Because there are 3 factors and only 2 goods, commodity price equalization does NOT equalize factor prices internationally in the short run.'
          ],
          topics: [
            {
              id: 'top-eco344-13-1',
              title: 'Factor Growth and Failure of Factor Price Equalization',
              readingMinutes: 14,
              sourceReference: 'ECO 344 Course Guide, Module 4, Unit 2, Sections 3.1–3.4, pp. 133–139',
              content:
                'Unlike the long-run Heckscher-Ohlin model where factor prices are insulated from endowment changes under CRS, endowment shifts in the specific-factors model sharply alter factor returns:\n- Specific Factor Growth: An increase in Sy shifts VMPLy rightward. Labor flows into Y, raising wages and reducing capital-labor ratios in both sectors.\n- Labor Growth: An increase in L shifts origin Oy rightward, reducing wages and raising returns to both capital owners.\n\nFactor Price Equalization Failure: Free trade equalizes commodity prices, but because there are more factors (3) than goods (2), trade in goods cannot equalize factor prices. International wage and rental disparities persist, creating strong incentives for international labor and capital migration.',
              summaryPoints: [
                'Endowment changes alter factor prices in the short run.',
                'Factor price equalization fails with 3 factors and 2 goods.',
                'Incentives for international migration persist under free trade.'
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-14',
          unitNumber: '3.0',
          title: 'Unit 3: Government Policies as Determinants of Trade',
          objectives: [
            'Distinguish consumer prices (q), producer prices (p), and world prices (p*)',
            'Demonstrate the distortionary wedge of commodity taxes and subsidies',
            'Explain how taxes and subsidies can generate welfare-reducing trade'
          ],
          unitRecapPoints: [
            'A consumption tax on Y raises consumer price (q = p(1+t) > p), discouraging consumption and generating exports of Y.',
            'A production tax on Y discourages domestic production, inducing imports of Y.',
            'Distortion-induced trade is welfare-reducing: exports generated through subsidies or taxes lower real national welfare below autarky.',
            'Exports must never be confused with national economic welfare.'
          ],
          topics: [
            {
              id: 'top-eco344-14-1',
              title: 'Consumer, Producer, and World Prices with Taxes and Subsidies',
              readingMinutes: 15,
              sourceReference: 'ECO 344 Course Guide, Module 4, Unit 3, Sections 3.1–3.3, pp. 140–147',
              content:
                'Government domestic policies alter international trade flows by creating price wedges:\n- Consumer price: q = p(1 + t)\n- Producer price: p\n- World price: p*\n\nA consumption tax drives a wedge between consumer and producer prices, shifting the consumption point away from tangency with the PPF. In an open economy:\n- A consumption tax on Y decreases domestic consumption, generating artificial exports of Y.\n- A production tax on Y decreases domestic production, generating artificial imports of Y.\n\nCrucial Conclusion: Trade generated by distortions is not beneficial trade. Subsidizing exports of a good results in national welfare lower than in autarky, proving that export volume is not a proxy for economic welfare.',
              summaryPoints: [
                'Taxes and subsidies create price wedges (q ≠ p).',
                'Consumption taxes induce exports; production taxes induce imports.',
                'Exports generated by distortionary policies reduce national welfare.'
              ]
            }
          ]
        },
        {
          id: 'unit-eco344-15',
          unitNumber: '4.0',
          title: 'Unit 4: Gains from Trade and Factor Market Distortions',
          objectives: [
            'Analyze the effects of corporate income tax on factor allocation in the Edgeworth box',
            'Explain why factor market distortions push production inside the PPF',
            'Discuss the Theory of the Second Best in international commercial policy'
          ],
          unitRecapPoints: [
            'A tax on capital in the corporate sector creates a divergence in factor-price ratios, shifting production to an inefficient point inside the PPF.',
            'The distorted production frontier (TBT\') is interior to the efficient frontier (TAT\').',
            'The Theory of the Second Best states that removing one trade distortion while domestic factor market distortions remain can reduce national welfare.'
          ],
          topics: [
            {
              id: 'top-eco344-15-1',
              title: 'Factor Market Distortions and the Theory of the Second Best',
              readingMinutes: 15,
              sourceReference: 'ECO 344 Course Guide, Module 4, Unit 4, Sections 3.1–3.3, pp. 148–155',
              content:
                'When taxes apply to factor markets (such as a corporate income tax on capital in sector Y), producers in Y pay r(1+t) while producers in X pay r. This distorts the contract curve in the Edgeworth box:\n- Isoquants are no longer tangent at equal factor ratios.\n- The economy produces at point B interior to the PPF, causing waste of resources.\n- At the distorted equilibrium, MRTd > p, meaning the price ratio cuts the distorted frontier rather than touching it tangentially.\n\nTheory of the Second Best: If domestic factor market distortions cannot be removed, opening up to free trade can exacerbate the distortion and lower welfare. Sound economic policy requires eliminating domestic distortions rather than relying on trade restrictions.',
              summaryPoints: [
                'Factor market distortions cause production inside the PPF.',
                'Corporate taxes cause capital misallocation between sectors.',
                'Second-best theory cautions against partial liberalization in heavily distorted domestic markets.'
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const ECO344_FOUNDATIONAL_QUESTIONS: PastExamQuestionItem[] = [
  {
    id: 'pq-eco344-tma-1',
    courseId: 'course-eco344',
    courseCode: 'ECO 344',
    courseTitle: 'International Economics',
    documentId: 'pq-doc-eco344-tma-archives',
    documentName: 'ECO344_INTERNATIONAL_ECONOMICS_TMA_AND_EXAM_ARCHIVES.pdf',
    sourceFileName: 'ECO344_37bf8463.pdf',
    linkedUnitId: 'unit-eco344-1',
    linkedUnitNumber: 1,
    linkedUnitTitle: 'Unit 1: Global Economy and Sectoral Structure of Trade',
    year: 'NOUN Official Examination',
    questionNumber: 'TMA 1 / Q1',
    questionType: 'written_structured',
    marks: 20,
    totalMarks: 20,
    questionText: 'Distinguish between international trade and interregional trade, and explain why countries cannot attain economic self-sufficiency.',
    suppliedAnswer: '1. Distinction between International and Interregional Trade:\n- Factor Mobility: In interregional trade within a country, labor and capital are mobile. In international trade, labor mobility is severely restricted by sovereign immigration laws, passports, language, and social customs, and capital mobility is subject to foreign exchange and investment regulations.\n- Sovereign Regulatory Powers: Independent nations impose tariffs, import quotas, non-tariff barriers, and exchange controls, which are prohibited between states/regions within a unified country under constitutional interstate commerce clauses.\n\n2. Impossibility of Economic Self-Sufficiency:\n- Natural resource and climatic disparities: No single nation possesses all mineral, agricultural, and energy resources (e.g., petroleum, cocoa, tin).\n- Scale and technological constraints: Producing all complex manufactured goods domestically would forfeit economies of scale and force the employment of inferior domestic technologies, drastically lowering living standards.',
    modelAnswer: 'International trade differs from domestic interregional trade due to international factor immobility (labor restrictions) and sovereign government regulations (tariffs, quotas). Self-sufficiency is unattainable due to natural resource distributions, technological disparities, and economies of scale.',
    keyRubricPoints: [
      'Factor mobility contrast (mobile domestically, immobile internationally)',
      'Government regulatory powers (tariffs, quotas, exchange controls)',
      'Reasons why autarkic self-sufficiency causes severe welfare losses'
    ],
    difficulty: 'Core',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  },
  {
    id: 'pq-eco344-tma-2',
    courseId: 'course-eco344',
    courseCode: 'ECO 344',
    courseTitle: 'International Economics',
    documentId: 'pq-doc-eco344-tma-archives',
    documentName: 'ECO344_INTERNATIONAL_ECONOMICS_TMA_AND_EXAM_ARCHIVES.pdf',
    sourceFileName: 'ECO344_37bf8463.pdf',
    linkedUnitId: 'unit-eco344-3',
    linkedUnitNumber: 3,
    linkedUnitTitle: 'Unit 3: Goods and Factor Model',
    year: 'NOUN Official Examination',
    questionNumber: 'TMA 1 / Q3',
    questionType: 'written_structured',
    marks: 20,
    totalMarks: 20,
    questionText: 'With the aid of an Edgeworth-Bowley box diagram, derive the production efficiency locus and explain why the production possibility frontier is concave to the origin.',
    suppliedAnswer: '1. Derivation of Efficiency Locus:\n- The Edgeworth-Bowley box has dimensions of total labor (L) and capital (K) endowments. Isoquants for good X are plotted from origin Ox, while isoquants for good Y are inverted and plotted from origin Oy.\n- At any point where isoquants intersect, production is inefficient because moving along an isoquant can increase the output of the other good without reducing the first.\n- Efficiency requires mutual tangency of isoquants: (MPLx / MPKx) = w/r = (MPLy / MPKy).\n- The locus connecting all mutual tangencies is the contract curve or efficiency locus OxBCOy.\n\n2. Concavity of the Production Possibility Frontier (PPF):\n- Mapping the contract curve into output space generates the PPF.\n- The PPF is concave to the origin (bowed outward) because goods X and Y have different factor intensities (Y is capital-intensive, X is labor-intensive). As resources shift from Y to X, the transferred factor mix does not match the optimal input proportions of the expanding sector, inducing diminishing returns and increasing opportunity costs (rising MRT).',
    modelAnswer: 'Mutual tangency of isoquants in the Edgeworth box establishes equal marginal rates of technical substitution. The PPF is concave due to differing factor intensities and the Law of Diminishing Returns.',
    keyRubricPoints: [
      'Edgeworth box construction with capital and labor dimensions',
      'Mutual tangency of isoquants along the contract curve',
      'Explanation of differing factor intensities causing increasing opportunity costs (concavity)'
    ],
    difficulty: 'Challenging',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  },
  {
    id: 'pq-eco344-tma-3',
    courseId: 'course-eco344',
    courseCode: 'ECO 344',
    courseTitle: 'International Economics',
    documentId: 'pq-doc-eco344-tma-archives',
    documentName: 'ECO344_INTERNATIONAL_ECONOMICS_TMA_AND_EXAM_ARCHIVES.pdf',
    sourceFileName: 'ECO344_37bf8463.pdf',
    linkedUnitId: 'unit-eco344-5',
    linkedUnitNumber: 5,
    linkedUnitTitle: 'Unit 1: The Gains from Trade and the Gains-from-Trade Theorem',
    year: 'NOUN Official Examination',
    questionNumber: 'TMA 2 / Q1',
    questionType: 'written_structured',
    marks: 20,
    totalMarks: 20,
    questionText: 'State and prove the Gains-from-Trade theorem using the revealed preference approach, and identify the two technical conditions required.',
    suppliedAnswer: '1. Theorem Statement:\nSuppose that the value of production is maximized at free trade prices. Then the value of free trade consumption at free trade prices exceeds the value of autarky consumption at free trade prices, revealing that the free trade consumption bundle is preferred to the autarky bundle.\n\n2. Mathematical Proof:\n- Let superscript f denote free trade and a denote autarky. Subscript p = production, c = consumption.\n- At free trade prices P*x and P*y, value of production is maximized at Qf compared to autarky point Qa:\nP*x Xfp + P*y Yfp ≥ P*x Xap + P*y Yap  (1)\n- In autarky, market clearing requires: Xap = Xac and Yap = Yac.\n- In free trade, trade balance requires: P*x Xfp + P*y Yfp = P*x Xfc + P*y Yfc.\n- Substituting yields:\nP*x Xfc + P*y Yfc ≥ P*x Xac + P*y Yac  (2)\n- Because the autarky consumption bundle costs less at free trade prices but consumers chose the free trade bundle, the free trade bundle is revealed preferred: Uf > Ua.\n\n3. Two Technical Conditions:\n(i) Tangency Condition: Free trade price line must be tangent to the PPF.\n(ii) Convexity Condition: The production set must be convex.',
    modelAnswer: 'Revealed preference proof: value of free trade production exceeds autarky production at world prices; substituting trade balance and autarky clearing proves that the autarky consumption bundle was affordable but rejected. Requires tangency and convexity.',
    keyRubricPoints: [
      'Accurate statement of the Gains-from-Trade Theorem',
      'Step-by-step mathematical substitution using trade balance and market clearing',
      'Identification of Tangency and Convexity conditions'
    ],
    difficulty: 'Core',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  },
  {
    id: 'pq-eco344-tma-4',
    courseId: 'course-eco344',
    courseCode: 'ECO 344',
    courseTitle: 'International Economics',
    documentId: 'pq-doc-eco344-tma-archives',
    documentName: 'ECO344_INTERNATIONAL_ECONOMICS_TMA_AND_EXAM_ARCHIVES.pdf',
    sourceFileName: 'ECO344_37bf8463.pdf',
    linkedUnitId: 'unit-eco344-10',
    linkedUnitNumber: 10,
    linkedUnitTitle: 'Unit 3: The Heckscher-Ohlin Model',
    year: 'NOUN Official Examination',
    questionNumber: 'TMA 3 / Q3',
    questionType: 'written_structured',
    marks: 20,
    totalMarks: 20,
    questionText: 'State the Heckscher-Ohlin Theorem. Explain how differences in physical factor endowments determine the pattern of international trade.',
    suppliedAnswer: '1. Statement of the Heckscher-Ohlin (H-O) Theorem:\nA country will export the commodity that uses its relatively abundant factor intensively, and import the commodity that uses its relatively scarce factor intensively.\n\n2. Physical Definition of Factor Abundance:\nCountry H is capital-abundant relative to Country F if:\n(K/L)h > (K/L)f\n\n3. Mechanism Determining Trade Pattern:\n- Under identical CRS technologies and identical homothetic consumer preferences, in autarky capital is relatively cheap in capital-abundant Country H (low r/w) and labor is relatively cheap in Country F (low w/r).\n- Consequently, the capital-intensive good Y is cheaper in Country H in autarky (Pah_y < Paf_y), and the labor-intensive good X is cheaper in Country F.\n- When trade opens, Country H exports good Y (implicitly exporting surplus capital services) and imports good X (implicitly importing scarce labor services). Trade in commodities thus substitutes for the international migration of factors of production.',
    modelAnswer: 'Heckscher-Ohlin Theorem states that nations export goods intensive in their abundant factors. Capital-abundant nations export capital-intensive goods; labor-abundant nations export labor-intensive goods, indirectly exporting surplus factor services.',
    keyRubricPoints: [
      'Formal statement of the H-O theorem',
      'Physical definition of factor abundance (K/L ratio)',
      'Commodity trade as a surrogate for factor movements'
    ],
    difficulty: 'Core',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  },
  {
    id: 'pq-eco344-tma-5',
    courseId: 'course-eco344',
    courseCode: 'ECO 344',
    courseTitle: 'International Economics',
    documentId: 'pq-doc-eco344-tma-archives',
    documentName: 'ECO344_INTERNATIONAL_ECONOMICS_TMA_AND_EXAM_ARCHIVES.pdf',
    sourceFileName: 'ECO344_37bf8463.pdf',
    linkedUnitId: 'unit-eco344-11',
    linkedUnitNumber: 11,
    linkedUnitTitle: 'Unit 4: The Stolper-Samuelson and Rybczynski Theorems',
    year: 'NOUN Official Examination',
    questionNumber: 'TMA 3 / Q4',
    questionType: 'written_structured',
    marks: 20,
    totalMarks: 20,
    questionText: 'Critically analyze the Stolper-Samuelson Theorem and the Magnification Effect, explaining their implications for trade politics and tariff lobbying.',
    suppliedAnswer: '1. The Stolper-Samuelson Theorem (1941):\nIn a 2x2 competitive economy with constant returns to scale and incomplete specialization, an increase in the relative price of a good increases the real return to the factor used intensively in that good, and decreases the real return to the other factor.\n\n2. The Magnification Effect (Ronald Jones):\nWhen the price of labor-intensive good X increases:\n%Δr < %ΔPy < %ΔPx < %Δw\nThe nominal wage rises by a higher percentage than the price of either good, ensuring real wages rise in terms of both X and Y. Capital rentals fall in nominal and real terms.\n\n3. Implications for Trade Politics:\n- Free trade raises the price of the abundant factor\'s intensive export good and lowers the price of the import-competing good. Thus, the abundant factor gains and the scarce factor loses in real terms.\n- This explains why labor unions in capital-abundant nations (e.g., USA) lobby for import tariffs: tariffs raise domestic import prices and protect scarce factor real wages.',
    modelAnswer: 'Stolper-Samuelson proves that commodity price shifts magnify factor price changes. Trade benefits the abundant factor and hurts the scarce factor, explaining why scarce factors lobby for protective tariffs.',
    keyRubricPoints: [
      'Stolper-Samuelson statement and real income effects',
      'Jones magnification inequality formula',
      'Political economy of protectionism and factor lobbying'
    ],
    difficulty: 'Challenging',
    isPastQuestion: true,
    verifiedAuthentic: true,
    answerStatus: 'answer_supplied',
    unitMappingStatus: 'mapped'
  }
];

export const ECO344_QUESTIONS: PastExamQuestionItem[] = [
  ...ECO344_FOUNDATIONAL_QUESTIONS,
  ...AUTHENTIC_ECO344_EXTRACTED_PAST_QUESTIONS
];
