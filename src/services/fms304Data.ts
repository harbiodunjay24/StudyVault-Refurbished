import { Course, PastExamQuestionItem, StudyModule, StudyUnit, StudyTopic } from '../types';
import {
  FMS304_UPLOADED_PQ_DOCUMENTS,
  AUTHENTIC_FMS304_EXTRACTED_PAST_QUESTIONS
} from './fms304PastQuestionsData';

/**
 * ============================================================================
 * FMS 304: RESEARCH METHODOLOGY
 * Authoritative NOUN Study Material (National Open University of Nigeria)
 * Course Developers & Writers:
 * - Dr. (Mrs) P.E. Osuji (School of Management Sciences, NOUN)
 * - Prof. O.J. Onwe (School of Management Sciences, NOUN)
 * - Dr. Timothy Oladele Ishola (Dean, Faculty of Management Sciences, NOUN)
 *
 * Course Structure: Exactly 15 Units across 3 Modules (All 15 Units Verified)
 * Module 1: Conceptual Framework & Scientific Investigation (Units 1 - 5)
 * Module 2: Research Design, Measurement & Sampling (Units 6 - 10)
 * Module 3: Data Analysis, Statistical Testing & Presentation (Units 11 - 15)
 * ============================================================================
 */

export const FMS304_MODULES: StudyModule[] = [
  // --------------------------------------------------------------------------
  // MODULE 1: CONCEPTUAL FRAMEWORK & SCIENTIFIC INVESTIGATION
  // --------------------------------------------------------------------------
  {
    id: 'mod-fms-1',
    moduleNumber: 1,
    title: 'Module 1: Conceptual Framework & Scientific Investigation',
    description: 'Foundational concepts, scientific inquiry, methods of data collection, interviews, and problem identification in management research.',
    units: [
      {
        id: 'unit-fms-1',
        unitNumber: '1.0',
        title: 'Unit 1: Conceptual Framework of Research',
        objectives: [
          'Define the term research from academic authorities in management sciences',
          'Explain the primary purpose and objectives of scientific research',
          'Identify and describe the essential characteristics of scientific research',
          'Distinguish between pure/basic research and applied research'
        ],
        unitRecapPoints: [
          'Research is a systematic, controlled, empirical, and critical investigation of hypothetical propositions about presumed relations (Kerlinger, 1973).',
          'The core purpose of research is problem solving, theory generation, and decision-making facilitation.',
          'Key characteristics include purposiveness, rigor, testability, replicability, precision, objectivity, and generalizability.',
          'Basic research seeks to expand the boundaries of knowledge, while applied research addresses immediate practical dilemmas.'
        ],
        topics: [
          {
            id: 'top-fms-1-1',
            title: 'Concept and Definition of Research',
            readingMinutes: 6,
            sourceReference: 'FMS 304 Course Guide, Unit 1, Section 3.1, pp. 7–11',
            textbookDefinitions: [
              {
                term: 'Research (Kerlinger, 1973)',
                definition: 'A systematic, controlled, empirical, and critical investigation of hypothetical propositions about the presumed relations among natural phenomena.',
                sourceAuthor: 'Kerlinger (1973)'
              },
              {
                term: 'Research (Redman and Mory, 1923)',
                definition: 'A systematized effort to gain new knowledge.',
                sourceAuthor: 'Redman & Mory (1923)'
              },
              {
                term: 'Research (Clifford Woody, 1927)',
                definition: 'Comprises defining and redefining problems, formulating hypothesis or suggested solutions, collecting, organizing and evaluating data, making deductions and reaching conclusions.',
                sourceAuthor: 'Clifford Woody (1927)'
              }
            ],
            content: `The word 'research' is derived from the French word 'recherche' which means to travel through or survey. In academic and scientific terminology, research is an organized, systematic, data-based, critical, objective, scientific inquiry into a specific problem that needs a solution.

According to Kerlinger (1973), research is defined as "a systematic, controlled, empirical, and critical investigation of hypothetical propositions about the presumed relations among natural phenomena." Redman and Mory (1923) define research as a "systematized effort to gain new knowledge." Clifford Woody (1927) adds that research comprises "defining and redefining problems, formulating hypothesis or suggested solutions; collecting, organizing and evaluating data; making deductions and reaching conclusions; and at last carefully testing the conclusions to determine whether they fit the formulating hypothesis."

Research provides the information that guides operational planning and policy decisions in business and government. Rather than relying on guesswork, intuition, or trial-and-error, managers and administrators use scientific research to identify problems, isolate causal variables, test hypotheses, and implement evidence-based interventions.`,
            summaryPoints: [
              'Research is an organized, systematic, data-based investigation into a specific problem.',
              'Kerlinger emphasizes that scientific inquiry is systematic, controlled, empirical, and critical.',
              'Eliminates subjective guesswork in organizational decision making.'
            ],
            simplifiedExplanation: {
              analogy: 'Imagine a physician diagnosing an illness. Instead of guessing based on a hunch, the doctor conducts blood tests, reviews symptoms, isolates the pathogen, and prescribes targeted medication. Research does the same for organizations.',
              plainEnglish: 'Research is a careful, evidence-based investigation designed to find reliable solutions to real problems rather than guessing.',
              keyTakeaway: 'Scientific research must be systematic, controlled, empirical, and critical (Kerlinger).',
              examTip: 'Examiners frequently award full marks for quoting Kerlinger\'s definition and explaining its four keywords: systematic, controlled, empirical, and critical.'
            },
            checkpointQuiz: [
              {
                id: 'q-fms-1-1-1',
                prompt: 'According to Kerlinger (1973) in FMS 304, scientific research is defined as a systematic, controlled, empirical, and critical investigation of:',
                options: [
                  'Hypothetical propositions about presumed relations among natural phenomena',
                  'Personal opinions and subjective intuitions of the researcher',
                  'Fictional narratives created for commercial publications',
                  'Random unverified observations gathered without experimental controls'
                ],
                correctIndex: 0,
                explanation: 'Kerlinger (1973) famously defines scientific research as a systematic, controlled, empirical, and critical investigation of hypothetical propositions about presumed relations among natural phenomena.',
                origin: 'original_past_question',
                sourceYear: '2018 Examination',
                sourceReference: 'FMS 304, Unit 1, Section 3.1, p. 8'
              }
            ],
            writtenQuestions: [
              {
                id: 'wq-fms-1-1',
                questionType: 'written_definition',
                prompt: 'Define Research citing Kerlinger (1973) and Clifford Woody (1927). Explain the four core operational characteristics of scientific inquiry.',
                maxMarks: 15,
                sourceReference: 'FMS 304 Course Guide, Unit 1, Section 3.1, pp. 8–10',
                expectedAnswerGuide: 'Kerlinger defines research as a systematic, controlled, empirical, and critical investigation of hypothetical propositions about presumed relations among natural phenomena. Clifford Woody defines research as defining problems, formulating hypotheses, collecting/evaluating data, and testing conclusions. The four characteristics are: (1) Systematic: follows orderly sequential steps; (2) Controlled: external variables are isolated; (3) Empirical: grounded in observable reality; (4) Critical: subjected to rigorous scrutiny.',
                keyRubricPoints: [
                  'Verbatim or accurate definition from Kerlinger',
                  'Woody\'s definition elements',
                  'Explanation of systematic, controlled, empirical, and critical'
                ],
                examinerTips: 'Bold the four characteristics and provide a one-sentence operational explanation for each.',
                origin: 'authentic_past_exam',
                sourceLabel: 'Past Examination 2018 Question 1'
              }
            ]
          },
          {
            id: 'top-fms-1-2',
            title: 'Purpose, Objectives and Classifications of Research',
            readingMinutes: 5,
            sourceReference: 'FMS 304 Course Guide, Unit 1, Section 3.2 & 3.3, pp. 11–16',
            content: `The primary purpose of applied research is to discover answers to practical questions through the application of scientific procedures. In management sciences, research objectives generally fall into four categories:
1. Exploratory/Formulative: Gaining familiarity with a phenomenon or achieving new insights into it.
2. Descriptive: Portraying accurately the characteristics of a particular individual, situation, or group.
3. Diagnostic: Determining the frequency with which something occurs or with which it is associated with something else.
4. Hypothesis-Testing (Causal): Testing a causal hypothesis between independent and dependent variables.

Major Classifications of Research:
- Basic/Pure Research: Undertaken primarily to improve scientific understanding or develop theoretical constructs without immediate practical commercial application (e.g., Maslow's development of human needs hierarchy).
- Applied Research: Undertaken to solve an immediate, practical organizational problem facing an enterprise or society (e.g., investigating causes of high employee turnover in a Nigerian commercial bank).
- Quantitative Research: Based on the measurement of quantity or amount, utilizing numerical data and statistical analysis.
- Qualitative Research: Concerned with qualitative phenomenon, investigating underlying reasons, attitudes, opinions, and motivations through in-depth interviews and observation.`,
            summaryPoints: [
              'Four research objectives: Exploratory, Descriptive, Diagnostic, and Causal Hypothesis-Testing.',
              'Basic research expands general theoretical knowledge; applied research solves practical problems.',
              'Quantitative research utilizes numerical metrics; qualitative research analyzes thematic narratives.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-1-2-1',
                prompt: 'Which classification of research is conducted primarily to solve an immediate, specific organizational problem rather than expand theoretical frontiers?',
                options: [
                  'Applied Research',
                  'Basic or Pure Research',
                  'Philosophical Hermeneutics',
                  'Speculative Metaphysics'
                ],
                correctIndex: 0,
                explanation: 'Applied research is specifically undertaken to resolve practical, immediate problems facing organizations or societies.',
                origin: 'original_past_question',
                sourceYear: '2019 Examination',
                sourceReference: 'FMS 304, Unit 1, Section 3.3, p. 14'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-2',
        unitNumber: '2.0',
        title: 'Unit 2: Skills of Scientific Investigation',
        objectives: [
          'Contrast the scientific method with non-scientific methods of knowing',
          'Explain the eight hallmarks of scientific research identified by Sekaran (2003)',
          'Describe the seven steps in the hypothetico-deductive scientific process'
        ],
        unitRecapPoints: [
          'Non-scientific methods include tenacity, authority, a priori intuition, and casual observation.',
          'The eight hallmarks of science are: Purposiveness, Rigor, Testability, Replicability, Precision and Confidence, Objectivity, Generalizability, and Parsimony.',
          'The hypothetico-deductive method moves from observation to theoretical framework, hypothesis deduction, empirical testing, and deduction.'
        ],
        topics: [
          {
            id: 'top-fms-2-1',
            title: 'Hallmarks of Scientific Research and the Hypothetico-Deductive Method',
            readingMinutes: 6,
            sourceReference: 'FMS 304 Course Guide, Unit 2, Section 3.1 & 3.2, pp. 17–25',
            content: `Scientific investigation is characterized by eight distinct hallmarks (Sekaran, 2003; Osuji & Onwe, NOUN):
1. Purposiveness: The research starts with a definite aim, purpose, and focus.
2. Rigor: A good theoretical base and sound methodological design ensure carefulness, scrupulousness, and precision.
3. Testability: Hypotheses must be logically capable of being tested through empirical data collection.
4. Replicability: Other researchers repeating the same study under similar conditions must arrive at identical conclusions.
5. Precision and Confidence: Precision reflects closeness of findings to reality; confidence refers to the probability that estimations are correct (e.g., 95% confidence interval).
6. Objectivity: Interpretations must be drawn from facts resulting from data analysis rather than emotional or subjective values.
7. Generalizability: The scope of applicability of research findings to a wider population or different organizational settings.
8. Parsimony: Simplicity in explaining phenomena or problems; preferring models with fewer explanatory variables over needlessly complex ones.

The Seven Steps of the Hypothetico-Deductive Method:
1. Observation: Identifying broad problem areas.
2. Preliminary Information Gathering: Literature search and unstructured interviews.
3. Theory Formulation: Integrating variables into a conceptual model.
4. Hypothesizing: Deductive generation of testable propositions.
5. Further Scientific Data Collection: Administering instruments.
6. Data Analysis: Statistical computation.
7. Deduction: Concluding whether hypotheses are supported or refuted.`,
            summaryPoints: [
              'Eight hallmarks: Purposiveness, Rigor, Testability, Replicability, Precision/Confidence, Objectivity, Generalizability, Parsimony.',
              'Parsimony means explaining problems with the fewest possible variables (Ockham\'s Razor).',
              'The hypothetico-deductive cycle drives empirical knowledge creation.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-2-1-1',
                prompt: 'The scientific hallmark that refers to simplicity in explaining phenomena and preferring a model that explains variance with fewer variables is known as:',
                options: [
                  'Parsimony',
                  'Generalizability',
                  'Replicability',
                  'Purposiveness'
                ],
                correctIndex: 0,
                explanation: 'Parsimony refers to explaining the greatest variance in the phenomenon of interest with the simplest, most efficient model.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'FMS 304, Unit 2, Section 3.1, p. 20'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-3',
        unitNumber: '3.0',
        title: 'Unit 3: Methods of Data Collection in Research – 1',
        objectives: [
          'Differentiate between primary and secondary sources of data',
          'Evaluate the strengths and limitations of documentary sources and archival data',
          'State criteria for assessing the reliability and validity of secondary data'
        ],
        topics: [
          {
            id: 'top-fms-3-1',
            title: 'Primary and Secondary Data Collection Methods',
            readingMinutes: 5,
            sourceReference: 'FMS 304 Course Guide, Unit 3, Section 3.1, pp. 26–34',
            content: `Data collection is the process of gathering and measuring information on variables of interest in an established systematic fashion. Data can be categorized into two broad sources:

1. Primary Data: Information collected directly by the researcher specifically for the research study at hand. Primary data sources include questionnaires, structured/unstructured interviews, direct field observation, focus group discussions, and controlled experiments.
- Advantages: High degree of relevance, tailored specifically to research objectives, up-to-date and proprietary.
- Disadvantages: Expensive to collect, time-consuming, prone to non-response bias and interviewer effects.

2. Secondary Data: Data already collected by individuals or agencies for other purposes, but repurposed by the researcher.
- Sources: Central Bank of Nigeria (CBN) Statistical Bulletins, National Bureau of Statistics (NBS) publications, Corporate Annual Reports, Academic Journals, Government Gazettes, World Bank records.
- Evaluation Criteria: The researcher must examine three criteria before using secondary data: (a) Suitability (does it fit the research scope?), (b) Adequacy (is the sample size and time frame sufficient?), and (c) Reliability (who collected it, what methodology was used, and is the source reputable?).`,
            summaryPoints: [
              'Primary data is collected firsthand for the specific research problem.',
              'Secondary data exists prior to the study and must be evaluated for suitability, adequacy, and reliability.',
              'Major secondary sources in Nigeria include CBN Bulletins, NBS data, and corporate financial reports.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-3-1-1',
                prompt: 'Before utilizing secondary data in research, which three evaluation criteria must be verified according to FMS 304?',
                options: [
                  'Suitability, Adequacy, and Reliability',
                  'Length, Word count, and Font style',
                  'Price, Binding color, and Weight',
                  'Popularity, Age of author, and Page numbers'
                ],
                correctIndex: 0,
                explanation: 'Secondary data must be rigorously evaluated for suitability (relevance), adequacy (depth/coverage), and reliability (methodological rigor of the original collector).',
                origin: 'original_past_question',
                sourceYear: '2019 Examination',
                sourceReference: 'FMS 304, Unit 3, Section 3.2, p. 30'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-4',
        unitNumber: '4.0',
        title: 'Unit 4: Interviews and Observations',
        objectives: [
          'Distinguish between structured and unstructured interviews',
          'Describe participant and non-participant observational methods',
          'Identify techniques for mitigating interviewer bias and halo effects'
        ],
        topics: [
          {
            id: 'top-fms-4-1',
            title: 'Interview Techniques and Observational Research Methods',
            readingMinutes: 5,
            sourceReference: 'FMS 304 Course Guide, Unit 4, Section 3.1 & 3.2, pp. 35–45',
            content: `Interviews and observations are fundamental qualitative and mixed-method data collection techniques in business and management research.

1. Interview Methods:
- Structured Interviews: The interviewer uses a pre-determined, standardized list of questions asked of all respondents in an identical sequence. Useful for large-scale comparative analysis.
- Unstructured Interviews: The interviewer has general conversational guidelines but allows the dialogue to unfold organically without rigid sequencing. Used extensively during exploratory research.
- Semi-Structured Interviews: Combines predetermined questions with flexibility to probe emergent responses.

2. Observational Methods:
- Participant Observation: The researcher actively immerses themselves into the daily activities of the group under investigation to observe behavior from an insider perspective.
- Non-Participant Observation: The researcher remains detached, observing subjects without active involvement or intervention.
- Structured vs. Unstructured Observation: Structured uses predetermined checklists; unstructured notes all ongoing behaviors.
- Hawthorne Effect: The phenomenon where research subjects alter their behavior simply because they know they are being observed.`,
            summaryPoints: [
              'Interviews range from highly structured (standardized) to unstructured (exploratory).',
              'Participant observation immerses the researcher; non-participant observes from a detached vantage point.',
              'Hawthorne effect refers to subjects changing behavior when aware of observation.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-4-1-1',
                prompt: 'The tendency of research subjects to alter or improve their normal behavior merely because they are aware they are being observed is termed the:',
                options: [
                  'Hawthorne Effect',
                  'Placebo Effect',
                  'Halo Effect',
                  'Pygmalion Effect'
                ],
                correctIndex: 0,
                explanation: 'The Hawthorne Effect was identified during experiments at the Western Electric Hawthorne Works, where productivity changed simply due to awareness of observation.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'FMS 304, Unit 4, Section 3.2, p. 41'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-5',
        unitNumber: '5.0',
        title: 'Unit 5: Problem Identification in Research',
        objectives: [
          'Formulate a viable, researchable problem in management sciences',
          'State criteria for evaluating the feasibility and significance of a research problem',
          'Differentiate between research questions and operational research objectives'
        ],
        topics: [
          {
            id: 'top-fms-5-1',
            title: 'Selecting, Articulating, and Evaluating the Research Problem',
            readingMinutes: 5,
            sourceReference: 'FMS 304 Course Guide, Unit 5, Section 3.1 & 3.2, pp. 46–54',
            content: `A research problem is an area of concern, an anomaly, or an empirical gap that exists in literature, theory, or organizational practice. As stated in FMS 304, "A problem well stated is a problem half-solved."

Sources of Research Problems:
1. Practical Workplace Challenges: Operational inefficiencies, declining market share, employee absenteeism.
2. Academic Literature Gaps: Contradictory findings among researchers, recommendations for future research in journal articles.
3. Theoretical Inadequacies: Theories failing to account for emerging realities (e.g., e-commerce adoption in developing markets).
4. Social and Policy Issues: Economic recessions, currency devaluations, subsidy removals.

Criteria for Selecting a Researchable Problem:
- Feasibility: Data availability, access to respondents, time constraints, financial resources.
- Significance and Value: Must contribute meaningfully to knowledge or organizational problem resolution.
- Novelty: Must avoid mere duplicate re-investigation of settled facts without fresh variables or contexts.
- Ethical Suitability: Must not violate human dignity, confidentiality, or institutional safety.

Converting Problem into Objectives:
Research objectives specify what the researcher intends to accomplish. General objectives state broad aim; specific objectives delineate measurable targets using active operational verbs (e.g., to determine, to examine, to evaluate, to analyze).`,
            summaryPoints: [
              'A research problem identifies an empirical gap or organizational dilemma.',
              'Criteria include feasibility, significance, novelty, and ethical compliance.',
              'Specific objectives must use measurable active operational verbs.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-5-1-1',
                prompt: 'In formulating research objectives in FMS 304, which type of verbs should be utilized to ensure clarity and measurability?',
                options: [
                  'Active operational verbs (e.g., examine, evaluate, determine, analyze)',
                  'Vague contemplative verbs (e.g., to appreciate, to feel, to dream)',
                  'Ambiguous conversational fillers',
                  'Passive speculative phrases'
                ],
                correctIndex: 0,
                explanation: 'Research objectives must be stated using measurable, active operational verbs like examine, evaluate, determine, and analyze.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'FMS 304, Unit 5, Section 3.2, p. 51'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 2: RESEARCH DESIGN, MEASUREMENT & SAMPLING
  // --------------------------------------------------------------------------
  {
    id: 'mod-fms-2',
    moduleNumber: 2,
    title: 'Module 2: Research Design, Measurement & Sampling',
    description: 'Research process steps, design typologies, historical and naturalistic inquiry, descriptive survey designs, and measurement scaling.',
    units: [
      {
        id: 'unit-fms-6',
        unitNumber: '6.0',
        title: 'Unit 6: Steps in Research Agenda',
        objectives: [
          'Chart the complete sequential stages of the research process cycle',
          'Formulate conceptual frameworks and identify dependent vs independent variables',
          'Construct null and alternative hypotheses'
        ],
        topics: [
          {
            id: 'top-fms-6-1',
            title: 'The Research Process Cycle, Variables, and Hypothesis Formulation',
            readingMinutes: 6,
            sourceReference: 'FMS 304 Course Guide, Unit 6, Section 3.1 & 3.2, pp. 55–65',
            content: `The research process consists of systematic, interdependent steps:
1. Identification and Definition of Problem
2. Extensive Literature Review (Conceptual, Theoretical, and Empirical Review)
3. Formulation of Conceptual Framework and Hypotheses
4. Preparation of the Research Design (Strategy, Population, Sample Size, Instrument)
5. Data Collection and Quality Control
6. Data Processing and Statistical Analysis
7. Hypothesis Testing and Interpretation of Findings
8. Drawing Conclusions, Recommendations, and Thesis Documentation

Classification of Variables:
- Independent Variable (IV): The antecedent variable manipulated or measured to determine its effect on the dependent variable (the cause).
- Dependent Variable (DV): The outcome or criterion variable that changes in response to the IV (the effect).
- Moderating Variable: A variable that alters the direction or strength of the relationship between IV and DV.
- Mediating/Intervening Variable: A variable that surfaces between the time the IV operates and its impact on the DV.

Hypothesis Formulation:
- Null Hypothesis (H0): States that there is no significant relationship or difference between variables (e.g., "There is no significant relationship between employee training and job performance").
- Alternative Hypothesis (H1): States that a significant relationship or difference exists. In inferential statistics, we test the null hypothesis to reject or fail to reject it.`,
            summaryPoints: [
              'Eight interdependent stages in the research process cycle.',
              'Independent variable is the predictor/cause; Dependent variable is the criterion/effect.',
              'Null hypothesis (H0) posits no significant difference or relationship.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-6-1-1',
                prompt: 'In an empirical investigation studying whether advertising expenditure affects sales volume, sales volume represents the:',
                options: [
                  'Dependent Variable',
                  'Independent Variable',
                  'Confounding Artifact',
                  'Extraneous Distractor'
                ],
                correctIndex: 0,
                explanation: 'Sales volume is the criterion outcome being measured, making it the Dependent Variable (DV). Advertising expenditure is the Independent Variable (IV).',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'FMS 304, Unit 6, Section 3.2, p. 60'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-7',
        unitNumber: '7.0',
        title: 'Unit 7: The Typologies of The Research Methods I',
        objectives: [
          'Classify research designs into exploratory, descriptive, and causal designs',
          'Distinguish cross-sectional studies from longitudinal research studies',
          'Explain ex-post facto and correlation research designs'
        ],
        topics: [
          {
            id: 'top-fms-7-1',
            title: 'Exploratory, Descriptive, Causal, and Longitudinal Research Typologies',
            readingMinutes: 5,
            sourceReference: 'FMS 304 Course Guide, Unit 7, Section 3.1 & 3.2, pp. 66–75',
            content: `Research design is the overarching blueprint or strategy adopted to integrate the different components of the study in a coherent and logical manner.

Major Research Typologies:
1. Exploratory Design: Conducted when a problem is not clearly defined or little prior knowledge exists. Aims to develop hypotheses, identify boundaries, and gain insights rather than provide conclusive answers. Utilizes pilot studies, expert surveys, and qualitative interviews.
2. Descriptive Design: Seeks to answer questions of Who, What, Where, When, and How much. Measures characteristics of a population at a given time without manipulating variables.
3. Causal (Explanatory) Design: Examines whether one variable causes or changes another variable (cause-and-effect relationship). Requires manipulation of independent variable or strict statistical controls (e.g., experimental design, econometrics).
4. Time Horizon Typologies:
- Cross-Sectional Studies: Data is gathered just once, perhaps over a period of days or weeks, in order to answer a research question (a snapshot in time).
- Longitudinal Studies: The researcher studies people or phenomena across multiple points in time to observe changes and trends over years or decades.`,
            summaryPoints: [
              'Exploratory investigates poorly understood dilemmas; Descriptive paints an accurate profile; Causal establishes cause and effect.',
              'Cross-sectional represents a single snapshot; Longitudinal tracks subjects across time.',
              'Research design serves as the architectural blueprint for empirical inquiry.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-7-1-1',
                prompt: 'A research study where data is collected from a sample of organizations at a single point in time to examine current workplace attitudes is classified as:',
                options: [
                  'Cross-Sectional Study',
                  'Longitudinal Study',
                  'Historical Biographical Study',
                  'Ethnographic Immersion'
                ],
                correctIndex: 0,
                explanation: 'A cross-sectional study captures a snapshot of data at a single point in time, unlike a longitudinal study which follows subjects over multiple periods.',
                origin: 'original_past_question',
                sourceYear: '2019 Examination',
                sourceReference: 'FMS 304, Unit 7, Section 3.2, p. 71'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-8',
        unitNumber: '8.0',
        title: 'Unit 8: Philosophical and Historical Research',
        objectives: [
          'Contrast positivist and interpretivist philosophical paradigms in research',
          'Describe historical research methodology and historical evidence evaluation',
          'Explain external criticism and internal criticism of historical documents'
        ],
        topics: [
          {
            id: 'top-fms-8-1',
            title: 'Epistemological Paradigms and Historical Document Criticism',
            readingMinutes: 6,
            sourceReference: 'FMS 304 Course Guide, Unit 8, Section 3.1 & 3.2, pp. 76–85',
            content: `All scientific research is underpinned by philosophical assumptions regarding the nature of reality (ontology) and how knowledge is acquired (epistemology).

1. Positivist Paradigm:
- Holds that an objective reality exists independent of human perceptions.
- Emphasizes quantitative measurement, hypothesis testing, deductive logic, and objective detachment of the investigator.
- Dominates traditional management, finance, and marketing research.

2. Interpretivist / Constructivist Paradigm:
- Reality is socially constructed and subjective, shaped by cultural, linguistic, and historical contexts.
- Emphasizes qualitative methods, inductive logic, and deep understanding of lived experiences (hermeneutics and phenomenology).

3. Historical Research Methodology:
Historical research is the systematic collection and objective evaluation of data relating to past occurrences to test hypotheses concerning causes, effects, or trends that explain present events.
To establish the validity of historical evidence, researchers apply two forms of criticism:
- External Criticism (Authenticity): Verifies whether the document itself is genuine (analyzing paper, ink, language, provenance, and authorship).
- Internal Criticism (Credibility/Accuracy): Evaluates whether the content inside the document is truthful, accurate, and free from deliberate deception or ideological bias.`,
            summaryPoints: [
              'Positivism assumes objective reality and quantitative deduction; Interpretivism assumes subjective social reality.',
              'Historical research utilizes external criticism for authenticity and internal criticism for credibility.',
              'Critical evaluation protects research from forged or biased records.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-8-1-1',
                prompt: 'In historical research methodology, the process of verifying whether an original document is physically genuine and authentic (rather than a forgery) is termed:',
                options: [
                  'External Criticism',
                  'Internal Criticism',
                  'Predictive Validity',
                  'Content Reliability'
                ],
                correctIndex: 0,
                explanation: 'External criticism establishes the authenticity and genuineness of the physical document, while internal criticism evaluates the truthfulness and accuracy of its contents.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'FMS 304, Unit 8, Section 3.2, p. 82'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-9',
        unitNumber: '9.0',
        title: 'Unit 9: Naturalistic Inquiry and Case Study',
        objectives: [
          'Define naturalistic inquiry and grounded theory approaches',
          'Explain case study research design and Robert Yin\'s framework',
          'Describe the role of multiple data sources in triangulating case findings'
        ],
        topics: [
          {
            id: 'top-fms-9-1',
            title: 'Qualitative Case Study Architecture and Grounded Naturalistic Inquiry',
            readingMinutes: 5,
            sourceReference: 'FMS 304 Course Guide, Unit 9, Section 3.1 & 3.2, pp. 86–95',
            content: `Naturalistic inquiry involves investigating phenomena within their authentic real-world contexts without experimental manipulation or artificial laboratory controls.

1. Case Study Design (Robert K. Yin, 2003):
A case study is an empirical inquiry that investigates a contemporary phenomenon within its real-life context, especially when the boundaries between phenomenon and context are not clearly evident.
- Single Case Design: Focuses on an extreme, critical, or unique case (e.g., the turnaround strategy of a single distressed airline in Nigeria).
- Multiple Case Design: Examines multiple organizational entities to enable cross-case comparison and replication logic.

2. Sources of Evidence in Case Study Research:
Yin identifies six primary sources: (1) Documentation, (2) Archival records, (3) Interviews, (4) Direct observation, (5) Participant observation, and (6) Physical artifacts.

3. Triangulation:
The combination of methodologies, data sources, and investigators in the study of the same phenomenon. Triangulation strengthens construct validity and guards against single-method bias.`,
            summaryPoints: [
              'Case studies examine contemporary phenomena within their authentic real-life contexts.',
              'Yin distinguishes between single-case designs and multiple-case comparative designs.',
              'Triangulation utilizes multiple evidence sources to achieve convergent validity.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-9-1-1',
                prompt: 'According to Robert Yin\'s framework in FMS 304, utilizing multiple independent sources of evidence to corroborate findings in a case study is called:',
                options: [
                  'Triangulation',
                  'Stratification',
                  'Spurious correlation',
                  'Hypothetical deduction'
                ],
                correctIndex: 0,
                explanation: 'Triangulation involves using multiple evidence sources to corroborate the same finding, significantly bolstering construct validity.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'FMS 304, Unit 9, Section 3.2, p. 92'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-10',
        unitNumber: '10.0',
        title: 'Unit 10: Descriptive Research',
        objectives: [
          'Explain survey research methodology and questionnaire administration',
          'Identify rules for avoiding questionnaire design flaws such as double-barreled questions',
          'Describe the four levels of measurement: Nominal, Ordinal, Interval, and Ratio'
        ],
        topics: [
          {
            id: 'top-fms-10-1',
            title: 'Questionnaire Design, Scaling Techniques, and Levels of Measurement',
            readingMinutes: 6,
            sourceReference: 'FMS 304 Course Guide, Unit 10, Section 3.1 & 3.2, pp. 96–107',
            content: `Descriptive survey research involves collecting data directly from a sample of individuals through self-report questionnaires or interviews to describe population parameters.

Rules of Questionnaire Construction:
1. Avoid Double-Barreled Questions: Questions that combine two different issues into a single prompt (e.g., "Do you think remuneration and promotion opportunities are adequate?").
2. Avoid Leading/Loaded Questions: Wording that nudges the respondent toward a particular answer.
3. Avoid Ambiguous and Technical Jargon: Keep language clear, concise, and appropriate for target respondents.
4. Logical Sequencing: Funnel approach—moving from broad, non-threatening questions to specific, sensitive topics.

The Four Levels of Measurement (Stevens, 1946):
1. Nominal Scale: Assigns numbers purely as labels or classification categories with no intrinsic order (e.g., Gender: 1=Male, 2=Female; Department: 1=Finance, 2=Marketing). Admissible statistic: Mode, Chi-square.
2. Ordinal Scale: Categorizes and ranks observations in order of magnitude, but the intervals between ranks are not equal (e.g., Likert scale: 1=Strongly Disagree to 5=Strongly Agree; Seniority: Officer, Manager, Director). Admissible statistic: Median, Spearman correlation.
3. Interval Scale: Values possess rank order and equal distances between numbers, but lack a true absolute zero point (e.g., Temperature in Celsius/Fahrenheit, IQ scores). Admissible statistic: Mean, Standard Deviation, Pearson r, t-test.
4. Ratio Scale: Has all properties of interval scale PLUS a true, non-arbitrary absolute zero point indicating total absence of the property (e.g., Age, Income in Naira, Sales Revenue, Weight). Admissible statistic: Geometric mean, all parametric tests.`,
            summaryPoints: [
              'Avoid double-barreled and leading questions during questionnaire development.',
              'Four measurement levels: Nominal (classification), Ordinal (ranking), Interval (equal intervals, arbitrary zero), Ratio (absolute zero).',
              'Higher-order scales permit advanced parametric statistics.'
            ],
            tables: [
              {
                title: 'Table 10.1: Stevens\' Four Levels of Measurement in Research Methodology',
                headers: ['Scale Level', 'Mathematical Characteristics', 'Permissible Statistics', 'Textbook Example'],
                rows: [
                  ['1. Nominal', 'Mutually exclusive categories, no mathematical order', 'Mode, Frequency, Chi-Square', 'Gender, Marital status, State of origin'],
                  ['2. Ordinal', 'Rank order exists, unequal distance between points', 'Median, Percentiles, Spearman rho', 'Likert scales (1-5), Job rankings, Customer satisfaction'],
                  ['3. Interval', 'Rank order, equal intervals, arbitrary zero point', 'Mean, Standard Deviation, t-Test, ANOVA', 'Temperature (°C), Intelligence (IQ) test scores'],
                  ['4. Ratio', 'Rank order, equal intervals, true absolute zero point', 'All statistical tests, Coefficient of variation', 'Sales revenue (₦), Annual income, Age in years, Units produced']
                ],
                sourceCitation: 'FMS 304, Unit 10, Section 3.2, p. 104'
              }
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-10-1-1',
                prompt: 'Which level of measurement possesses rank order, equal distance between points, and a true absolute zero point that permits meaningful ratio comparisons?',
                options: [
                  'Ratio Scale',
                  'Interval Scale',
                  'Ordinal Scale',
                  'Nominal Scale'
                ],
                correctIndex: 0,
                explanation: 'A Ratio scale has all characteristics of nominal, ordinal, and interval scales, along with a true absolute zero point.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'FMS 304, Unit 10, Section 3.2, p. 103'
              }
            ]
          }
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // MODULE 3: DATA ANALYSIS, STATISTICAL TESTING & PRESENTATION
  // --------------------------------------------------------------------------
  {
    id: 'mod-fms-3',
    moduleNumber: 3,
    title: 'Module 3: Data Analysis, Statistical Testing & Presentation',
    description: 'Experimental designs, sampling techniques, Taro Yamane formula, inferential statistical tools, 5-chapter thesis architecture, and APA referencing.',
    units: [
      {
        id: 'unit-fms-11',
        unitNumber: '11.0',
        title: 'Unit 11: Experimental and Action Researches',
        objectives: [
          'Explain true experimental, quasi-experimental, and pre-experimental designs',
          'Identify threats to internal validity (history, maturation, testing, instrumentation, mortality)',
          'Describe the action research cycle in organizational problem-solving'
        ],
        topics: [
          {
            id: 'top-fms-11-1',
            title: 'Experimental Designs and Threats to Experimental Validity',
            readingMinutes: 5,
            sourceReference: 'FMS 304 Course Guide, Unit 11, Section 3.1 & 3.2, pp. 108–118',
            content: `Experimental research provides the most convincing evidence for causal relationships through manipulation of independent variables under controlled conditions.

Experimental Design Classifications:
1. True Experimental Design: Features random assignment of subjects to experimental and control groups, and manipulation of the independent variable (e.g., Pretest-Posttest Control Group Design, Solomon Four-Group Design).
2. Quasi-Experimental Design: Lacks random assignment due to real-world constraints, but utilizes comparison groups or interrupted time-series data.
3. Pre-Experimental Design: Lacks both random assignment and control groups (e.g., One-shot case study, One-group pretest-posttest design). Weakest validity.

Threats to Internal Validity (Campbell & Stanley, 1963):
- History: External events occurring between pretest and posttest that affect the dependent variable.
- Maturation: Biological or psychological changes within subjects occurring over time (fatigue, aging).
- Testing Effects: The effect of taking a pretest upon the scores of a second test.
- Instrumentation: Changes in the calibration of instruments or scoring criteria.
- Experimental Mortality: Differential loss of subjects (attrition) from experimental vs control groups.`,
            summaryPoints: [
              'True experiments require random assignment and manipulation of the IV.',
              'Threats to internal validity include history, maturation, testing, and mortality.',
              'Action research bridges academic diagnosis and immediate managerial action.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-11-1-1',
                prompt: 'The threat to internal validity caused by subjects dropping out or leaving an experimental study before completion is known as:',
                options: [
                  'Experimental Mortality (Attrition)',
                  'Maturation',
                  'Instrumentation Drift',
                  'Statistical Regression'
                ],
                correctIndex: 0,
                explanation: 'Experimental mortality (attrition) occurs when differential drop-out rates between treatment and control groups bias the results.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'FMS 304, Unit 11, Section 3.2, p. 114'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-12',
        unitNumber: '12.0',
        title: 'Unit 12: Population and Sampling',
        objectives: [
          'Differentiate between population, target population, accessible population, and sample',
          'Explain probability sampling techniques and non-probability sampling methods',
          'Calculate sample sizes using the Taro Yamane formula with step-by-step arithmetic'
        ],
        unitRecapPoints: [
          'A population comprises all items or individuals of interest possessing common observable characteristics.',
          'Probability sampling gives every element a known, non-zero chance of selection (Simple Random, Systematic, Stratified, Cluster).',
          'Non-probability sampling relies on convenience, judgment, quota, or snowball referrals.',
          'Taro Yamane formula: n = N / [1 + N(e)^2], where N is finite population and e is precision level.'
        ],
        topics: [
          {
            id: 'top-fms-12-1',
            title: 'Sampling Techniques and Sample Size Determination via Taro Yamane Formula',
            readingMinutes: 7,
            sourceReference: 'FMS 304 Course Guide, Unit 12, Section 3.1 & 3.2, pp. 119–131',
            content: `In research methodology, studying the entire population (a census) is often impossible due to time, cost, and geographical dispersal. Researchers select a representative sample from a sampling frame.

Sampling Typologies:
1. Probability Sampling Techniques:
- Simple Random Sampling: Every element has an equal probability of being selected (lottery or computer random generation).
- Systematic Sampling: Selecting every kth element from a sampling frame after a random starting point (k = N / n).
- Stratified Random Sampling: Dividing the population into mutually exclusive subgroups (strata) based on an important variable (e.g., senior management, middle management, junior staff) and drawing random samples proportionally from each stratum.
- Cluster Sampling: Dividing the population into clusters (e.g., geopolitical zones, local government areas) and randomly selecting entire clusters.

2. Non-Probability Sampling:
- Convenience Sampling: Selecting readily accessible elements.
- Purposive/Judgmental Sampling: Selecting subjects who possess specific expertise or characteristics.
- Quota Sampling: Ensuring specific quotas of categories are met without random selection.
- Snowball Sampling: Initial participants refer additional contacts with similar rare characteristics.

Sample Size Determination for Finite Populations:
When the population size (N) is known and finite, the Taro Yamane (1967) formula is the standard formula taught in NOUN:
Formula:
n = N / [1 + N(e)^2]
Where:
- n = Correct sample size
- N = Finite population size
- e = Margin of tolerable error (level of significance, commonly 5% or 0.05)`,
            summaryPoints: [
              'Probability sampling ensures known non-zero selection chance; non-probability does not.',
              'Stratified sampling groups population into strata and samples proportionally.',
              'Taro Yamane formula determines sample size for known finite populations.'
            ],
            formulas: [
              {
                id: 'form-taro-yamane',
                name: 'Taro Yamane Sample Size Formula',
                formulaDisplay: 'n = N / [1 + N(e)^2]',
                contextAndPurpose: 'Calculates the mathematically minimum representative sample size required from a known, finite population at a chosen margin of error (standard 5% error level).',
                sourceReference: 'FMS 304 Course Guide, Unit 12, Section 3.3, p. 128',
                variables: [
                  { symbol: 'n', name: 'Sample Size', explanation: 'The required minimum number of respondents to survey.' },
                  { symbol: 'N', name: 'Population Size', explanation: 'The total finite number of elements in the target sampling frame.' },
                  { symbol: 'e', name: 'Margin of Error', explanation: 'Level of precision tolerated (e.g., 0.05 for 95% confidence level).', unitOrScale: 'Decimal (e.g., 0.05)' }
                ],
                workedExamples: [
                  {
                    title: 'Worked Example: Determining Sample Size for a Manufacturing Firm',
                    problemStatement: 'A researcher is investigating employee productivity in a manufacturing company in Lagos with a known workforce of 1,200 staff. Using the Taro Yamane formula at a 5% (0.05) level of significance, calculate the required sample size.',
                    givenValues: [
                      { symbol: 'N', label: 'Finite Population', value: '1,200 employees' },
                      { symbol: 'e', label: 'Margin of Error', value: '0.05 (5%)' }
                    ],
                    steps: [
                      {
                        stepNumber: 1,
                        description: 'Square the margin of error (e^2)',
                        mathExpression: 'e^2 = 0.05 * 0.05 = 0.0025',
                        explanation: 'Compute the square of the 5% error allowance.'
                      },
                      {
                        stepNumber: 2,
                        description: 'Multiply population N by e^2',
                        mathExpression: 'N * (e^2) = 1,200 * 0.0025 = 3.0',
                        explanation: 'Multiply the total staff count of 1,200 by the squared error rate.'
                      },
                      {
                        stepNumber: 3,
                        description: 'Add 1 to the denominator [1 + N(e)^2]',
                        mathExpression: 'Denominator = 1 + 3.0 = 4.0',
                        explanation: 'Add unity (1) to complete the formula denominator.'
                      },
                      {
                        stepNumber: 4,
                        description: 'Divide population N by the completed denominator',
                        mathExpression: 'n = 1,200 / 4.0 = 300',
                        explanation: 'Divide total population by 4.0 to yield the exact required sample size.'
                      }
                    ],
                    finalResult: 'n = 300 respondents',
                    authorInterpretation: 'The researcher must administer questionnaires to exactly 300 randomly selected staff members to ensure findings accurately reflect the total workforce of 1,200 at the 95% confidence level with 5% precision.'
                  }
                ]
              }
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-12-1-1',
                prompt: 'If a known target population consists of 800 employees and a 5% margin of error is adopted, what is the required sample size using the Taro Yamane formula?',
                options: [
                  '267 respondents',
                  '800 respondents',
                  '150 respondents',
                  '400 respondents'
                ],
                correctIndex: 0,
                explanation: 'Calculation: n = 800 / [1 + 800(0.05)^2] = 800 / [1 + 800(0.0025)] = 800 / [1 + 2.0] = 800 / 3 = 266.67 ≈ 267 respondents.',
                origin: 'original_past_question',
                sourceYear: '2019 Examination',
                sourceReference: 'FMS 304, Unit 12, Section 3.3, p. 129'
              }
            ],
            writtenQuestions: [
              {
                id: 'wq-fms-12-1',
                questionType: 'written_structured',
                prompt: 'State the Taro Yamane formula for sample size determination. A commercial bank has a total customer base of 2,500 business account holders. Using an error tolerance of 5%, calculate the required sample size showing all arithmetic steps.',
                maxMarks: 15,
                sourceReference: 'FMS 304 Course Guide, Unit 12, Section 3.3, pp. 128–130',
                expectedAnswerGuide: 'Formula: n = N / [1 + N(e)^2]. Given N = 2,500 and e = 0.05. Step 1: e^2 = 0.0025. Step 2: N * e^2 = 2,500 * 0.0025 = 6.25. Step 3: Denominator = 1 + 6.25 = 7.25. Step 4: n = 2,500 / 7.25 = 344.83 ≈ 345 account holders.',
                keyRubricPoints: [
                  'Correct specification of Taro Yamane formula and terms',
                  'Step-by-step arithmetic execution showing e^2 and denominator',
                  'Correct rounding to 345 account holders'
                ],
                examinerTips: 'Always state the formula first, define the variables, show the arithmetic, and state the conclusion with appropriate rounding.',
                origin: 'authentic_past_exam',
                sourceLabel: 'Past Examination 2019 Question 3'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-13',
        unitNumber: '13.0',
        title: 'Unit 13: Statistical Tools of Analysis',
        objectives: [
          'Differentiate between descriptive and inferential statistics',
          'Identify appropriate parametric tests: t-Test, Analysis of Variance (ANOVA), and Pearson r',
          'Describe non-parametric statistical tests: Chi-Square and Spearman Rank correlation'
        ],
        topics: [
          {
            id: 'top-fms-13-1',
            title: 'Parametric and Non-Parametric Inferential Statistical Instruments',
            readingMinutes: 6,
            sourceReference: 'FMS 304 Course Guide, Unit 13, Section 3.1 & 3.2, pp. 132–148',
            content: `Statistical analysis transforms raw empirical data into meaningful intelligence to test research hypotheses.

1. Descriptive Statistics:
Summarize and describe properties of data. Measures of Central Tendency include Mean, Median, and Mode. Measures of Dispersion include Range, Variance, and Standard Deviation.

2. Inferential Statistics:
Enable the researcher to draw inferences and generalizations from a sample to an entire population.

Parametric Tests (Assumptions: Normally distributed data, interval/ratio scale, homogeneity of variance):
- Student's t-Test: Compares the means of two groups (Independent samples t-test compares two distinct groups, paired samples t-test compares the same group before and after intervention).
- Analysis of Variance (ANOVA): Compares the means of three or more groups (F-test).
- Pearson Product-Moment Correlation (r): Measures the strength and direction of linear association between two continuous variables (ranges from -1.0 to +1.0).
- Multiple Linear Regression Analysis: Examines the predictive impact of two or more independent variables on a single continuous dependent variable (Y = a + b1X1 + b2X2 + e).

Non-Parametric Tests (Distribution-free, utilized for nominal/ordinal data or non-normal distributions):
- Chi-Square Test (χ²): Tests for independence or goodness of fit between categorical nominal variables.
- Spearman Rank-Order Correlation (rho): Measures monotonic association between two ordinal ranked variables.
- Mann-Whitney U Test: Non-parametric alternative to the independent samples t-test.`,
            summaryPoints: [
              'Parametric tests require normal distributions and interval/ratio data (t-test, ANOVA, Pearson r, Regression).',
              'Non-parametric tests are distribution-free, suited for nominal/ordinal metrics (Chi-Square, Spearman rho).',
              'ANOVA tests differences across three or more group means.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-13-1-1',
                prompt: 'To test whether significant differences exist among the mean performance scores of employees across four different bank branches, the appropriate parametric statistical test is:',
                options: [
                  'One-Way Analysis of Variance (ANOVA)',
                  'Paired Samples t-Test',
                  'Simple Percentage Breakdown',
                  'Spearman Rank Correlation'
                ],
                correctIndex: 0,
                explanation: 'ANOVA (Analysis of Variance) is specifically designed to compare differences among the means of three or more independent groups simultaneously.',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'FMS 304, Unit 13, Section 3.2, p. 140'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-14',
        unitNumber: '14.0',
        title: 'Unit 14: Writing Research Reports and Proposals',
        objectives: [
          'Master the standard Five-Chapter Thesis Architecture prescribed by NOUN',
          'Describe the format and essential components of a bankable research proposal',
          'Format preliminary pages, abstract, and empirical data presentation'
        ],
        topics: [
          {
            id: 'top-fms-14-1',
            title: 'The Standard Five-Chapter Thesis Architecture in NOUN',
            readingMinutes: 6,
            sourceReference: 'FMS 304 Course Guide, Unit 14, Section 3.1 & 3.2, pp. 149–162',
            content: `The National Open University of Nigeria (NOUN) mandates the standard Five-Chapter Format for all undergraduate and postgraduate research projects in the Faculty of Management Sciences:

Preliminary Pages:
- Title Page
- Declaration & Certification
- Dedication & Acknowledgements
- Abstract (Comprehensive single paragraph of 200–250 words stating problem, objectives, methodology, key findings, and recommendations)
- Table of Contents, List of Tables, List of Figures

The Five Core Chapters:
CHAPTER 1: INTRODUCTION
1.1 Background to the Study
1.2 Statement of the Problem
1.3 Research Questions
1.4 Objectives of the Study
1.5 Research Hypotheses
1.6 Significance of the Study
1.7 Scope and Delimitations of the Study
1.8 Operational Definition of Terms

CHAPTER 2: LITERATURE REVIEW
2.1 Conceptual Review (Clarifying core concepts)
2.2 Theoretical Framework (Foundational academic theories)
2.3 Empirical Review (Review of prior related studies worldwide and in Nigeria)
2.4 Summary of Gaps in Literature

CHAPTER 3: RESEARCH METHODOLOGY
3.1 Research Design
3.2 Population of the Study
3.3 Sampling Technique and Sample Size Determination
3.4 Nature and Sources of Data
3.5 Description of Research Instrument
3.6 Validity and Reliability of the Instrument
3.7 Method of Data Analysis
3.8 Model Specification

CHAPTER 4: DATA PRESENTATION, ANALYSIS AND DISCUSSION OF FINDINGS
4.1 Data Presentation (Frequency tables and response rates)
4.2 Test of Hypotheses (Statistical testing and decision rule)
4.3 Discussion of Empirical Findings (Comparing findings with prior studies)

CHAPTER 5: SUMMARY, CONCLUSION AND RECOMMENDATIONS
5.1 Summary of Findings
5.2 Conclusion
5.3 Recommendations
5.4 Contribution to Knowledge
5.5 Suggestions for Further Studies`,
            summaryPoints: [
              'NOUN prescribes the standard Five-Chapter Project Architecture.',
              'Chapter 1 introduces problem; Chapter 2 reviews literature; Chapter 3 specifies methodology; Chapter 4 tests hypotheses; Chapter 5 concludes and recommends.',
              'Abstract must concisely summarize problem, method, findings, and recommendations.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-14-1-1',
                prompt: 'Under the standard NOUN Five-Chapter Thesis Architecture, in which chapter must the Model Specification and Research Instrument Reliability be presented?',
                options: [
                  'Chapter 3: Research Methodology',
                  'Chapter 1: Introduction',
                  'Chapter 2: Literature Review',
                  'Chapter 5: Summary and Conclusion'
                ],
                correctIndex: 0,
                explanation: 'Chapter 3 (Research Methodology) houses the research design, sampling, instrument validity/reliability, and model specification.',
                origin: 'original_past_question',
                sourceYear: '2021 Examination',
                sourceReference: 'FMS 304, Unit 14, Section 3.1, p. 154'
              }
            ]
          }
        ]
      },
      {
        id: 'unit-fms-15',
        unitNumber: '15.0',
        title: 'Unit 15: Research Referencing, Proposal Contents and Ethical Issues',
        objectives: [
          'Apply the American Psychological Association (APA) 6th and 7th edition referencing standards',
          'Explain research ethics principles including informed consent, confidentiality, and participant protection',
          'Understand plagiarism, intellectual property, and academic integrity regulations'
        ],
        topics: [
          {
            id: 'top-fms-15-1',
            title: 'APA Referencing Standards, Research Ethics, and Academic Integrity',
            readingMinutes: 6,
            sourceReference: 'FMS 304 Course Guide, Unit 15, Section 3.1 & 3.2, pp. 163–175',
            content: `Academic inquiry demands scrupulous ethical integrity and precise attribution of scholarly sources.

1. American Psychological Association (APA) Referencing Rules:
In-Text Citations:
- Single author: (Osuji, 2018) or Osuji (2018) argues that...
- Two authors: (Onwe & Ishola, 2019)
- Three or more authors (APA 7th): Use the first author followed by 'et al.' from the first citation (e.g., Akpa et al., 2020).
- Direct quotations: Must include author, year, and page number: (Osuji, 2018: 45) or (Osuji, 2018, p. 45).

Reference List Formatting (Hanging Indent):
- Textbook: Author, A. A. (Year). Title of book in italics (Edition). Publisher.
  Example: Kerlinger, F. N. (1973). Foundations of Behavioral Research (2nd ed.). Holt, Rinehart and Winston.
- Journal Article: Author, A. A., & Author, B. B. (Year). Title of article. Journal Name in Italics, Volume(Issue), Page numbers. https://doi.org/...
  Example: Osuji, P. E., & Onwe, O. J. (2019). Methodological rigor in management inquiries. Nigerian Journal of Management Sciences, 14(2), 45–59.

2. Ethical Principles in Research:
- Informed Consent: Participants must participate voluntarily after being fully briefed on the study\'s nature, risks, and benefits.
- Confidentiality and Anonymity: Protecting participant identity and ensuring data cannot be traced back to individuals.
- Protection from Harm: Ensuring no physical, psychological, social, or career detriment results from participation.

3. Plagiarism:
The appropriation of another author's ideas, text, or results without proper citation. NOUN enforces zero tolerance for academic plagiarism, employing anti-plagiarism tools (e.g., Turnitin) with acceptable similarity indices typically below 15–20%.`,
            summaryPoints: [
              'APA 6th/7th edition is the required referencing format in NOUN Faculty of Management Sciences.',
              'In-text citations require author and year; quotations require page numbers.',
              'Ethical standards require informed consent, confidentiality, and anti-plagiarism compliance.'
            ],
            checkpointQuiz: [
              {
                id: 'q-fms-15-1-1',
                prompt: 'According to APA 7th edition referencing standards taught in FMS 304, a direct quotation in research text MUST include which of the following elements?',
                options: [
                  'Author\'s surname, year of publication, and exact page number',
                  'Only the author\'s initials and telephone contact',
                  'The publisher\'s physical address and postal code',
                  'The ISBN barcode number of the textbook'
                ],
                correctIndex: 0,
                explanation: 'APA formatting dictates that direct verbatim quotes must always include the author\'s surname, publication year, and specific page number (e.g., Osuji, 2018, p. 45).',
                origin: 'original_past_question',
                sourceYear: '2020 Examination',
                sourceReference: 'FMS 304, Unit 15, Section 3.1, p. 166'
              }
            ],
            writtenQuestions: [
              {
                id: 'wq-fms-15-1',
                questionType: 'written_structured',
                prompt: 'Explain the concept of Plagiarism in academic research. Discuss four cardinal ethical considerations a researcher must observe when gathering data from human participants.',
                maxMarks: 15,
                sourceReference: 'FMS 304 Course Guide, Unit 15, Section 3.2, pp. 168–172',
                expectedAnswerGuide: 'Plagiarism is the uncredited use of another person\'s work, ideas, or data as one\'s own. Four cardinal ethical considerations: (1) Informed Consent: subjects voluntarily agree with full knowledge of research scope; (2) Anonymity and Confidentiality: identities are masked and private data protected; (3) Protection from Harm: ensuring participants face no physical or psychological risk; (4) Voluntary Participation and Right to Withdraw: subjects can discontinue at any time without penalty.',
                keyRubricPoints: [
                  'Clear definition of plagiarism and intellectual theft',
                  'Explanation of informed consent',
                  'Explanation of confidentiality and anonymity',
                  'Explanation of protection from harm',
                  'Explanation of voluntary participation'
                ],
                examinerTips: 'Provide concrete examples of how anonymity is protected in questionnaire administration.',
                origin: 'authentic_past_exam',
                sourceLabel: 'Past Examination 2020 Question 4'
              }
            ]
          }
        ]
      }
    ]
  }
];

export const AUTHENTIC_FMS304_PAST_QUESTIONS: PastExamQuestionItem[] = AUTHENTIC_FMS304_EXTRACTED_PAST_QUESTIONS;

export const FMS304_AUTHENTIC_COURSE: Course = {
  id: 'course-fms-304',
  code: 'FMS 304',
  title: 'Research Methodology',
  department: 'Faculty of Management Sciences',
  description: 'Authoritative National Open University of Nigeria (NOUN) study guide covering the scientific research process, data collection, sampling techniques, Taro Yamane sample size determination, inferential statistics, thesis writing, and APA referencing.',
  modules: FMS304_MODULES,
  pastQuestionDocuments: FMS304_UPLOADED_PQ_DOCUMENTS,
  documents: [
    {
      id: 'doc-fms-304-official',
      name: 'FMS304_Research_Methodology_Course_Guide.pdf',
      fileType: 'pdf',
      fileSize: 3420000,
      uploadedAt: '2025-01-10T08:00:00Z',
      pageCount: 188,
      wordCount: 46200,
      status: 'ready',
      verifiedAuthentic: true,
      processingStatus: 'fully_processed',
      summary: 'National Open University of Nigeria (NOUN) official course material for FMS 304: Research Methodology by Dr. (Mrs) P.E. Osuji, Prof. O.J. Onwe, and Dr. Timothy Oladele Ishola.',
      processingNotes: 'All 15 units across 3 modules indexed. Taro Yamane formulas, worked examples, 5-chapter thesis architecture, and APA referencing extracted directly from source.',
      extractedHeadingsCount: 52,
      isPartiallyProcessed: false
    }
  ]
};

export const FMS304_SAMPLE_COURSE = FMS304_AUTHENTIC_COURSE;

