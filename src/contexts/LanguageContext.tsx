import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Hero Page
    'hero.title': 'NeuroSense',
    'hero.subtitle': '— AI —',
    'hero.arabicSubtitle': 'تحليل طبي متقدم',
    'hero.welcome': 'مرحباً بك في NeuroSense AI',
    'hero.description': 'رفيقك المتقدم للتحليل الطبي بالذكاء الاصطناعي. مدعوم بأحدث تقنيات الذكاء الاصطناعي والخبرة الطبية.',
    'hero.systemsOnline': 'أنظمة الذكاء الاصطناعي متصلة',
    'hero.startAnalysis': 'ابدأ التحليل',
    'hero.version': 'NeuroSense AI v2.1.0 • المحرك العصبي نشط',
    
    // Input Form
    'input.title': 'إدخال بيانات المريض',
    'input.subtitle': 'أدخل المعلومات الطبية للحصول على تحليل دقيق',
    'input.patientName': 'اسم المريض *',
    'input.patientNamePlaceholder': 'أدخل اسم المريض',
    'input.age': 'العمر *',
    'input.agePlaceholder': 'أدخل عمر المريض',
    'input.symptoms': 'الجنس*',
    'input.symptomsPlaceholder': 'ادخل جنس المريض',
    'input.medicalHistory': 'التاريخ المرضي',
    'input.optional': '(إن وجد)',
    'input.medicalHistoryPlaceholder': 'اكتب التاريخ المرضي للمريض (الأمراض السابقة، العمليات الجراحية، الأدوية المستمرة، الحساسية...)',
    'input.medicalHistoryNote': 'هذا الحقل اختياري لكنه يساعد في الحصول على تحليل أكثر دقة',
    'input.additionalTests': 'اختبارات إضافية',
    'input.voiceAnalysis': 'التحليل الصوتي',
    'input.imageAnalysis': 'تحليل الصور',
    'input.disabilityTest': 'اختبار الإعاقة',
    'input.earlyDetection': 'استبيان التحليل المبكر',
    'input.back': 'رجوع',
    'input.analyze': 'تحليل البيانات',
    'input.privacyNote': 'جميع البيانات محمية ومشفرة لضمان خصوصية المرضى',
    'input.errorRequired': 'الرجاء إدخال جميع البيانات المطلوبة',
    'input.analyzing': 'جاري تحليل البيانات...',

    // Voice Analysis
    'voice.title': 'التحليل الصوتي الطبي',
    'voice.subtitle': 'تحليل نبرة الصوت للكشف عن الحالة الصحية',
    'voice.analysisType': 'نوع التحليل الصوتي',
    'voice.guidedReading': 'قراءة نص محدد',
    'voice.freeSpeak': 'كلام حر',
    'voice.languageSelect': 'اختيار اللغة',
    'voice.languageDesc': 'اختر لغة التسجيل',
    'voice.sampleText': 'النص المطلوب قراءته',
    'voice.sampleDesc': 'اقرأ هذا النص بصوت واضح لتحليل نبرة الصوت:',
    'voice.sampleQuoteAr': 'أعاني من صداع وإرهاق منذ الأسبوع الماضي. الألم في معظمه في الصدغين ويزداد سوءًا في فترة ما بعد الظهر.',
    'voice.sampleQuoteEn': 'I have been experiencing headaches and fatigue for the past week. The pain is mostly in my temples and gets worse in the afternoon.',
    'voice.freeSpeakTitle': 'التحدث الحر',
    'voice.freeSpeakDesc': 'تحدث بحرية عن أعراضك أو أي شيء تريد. سيتم تحليل نبرة صوتك ومشاعرك من خلال طريقة حديثك.',
    'voice.recording': 'جاري التسجيل...',
    'voice.pressToStart': 'اضغط للبدء',
    'voice.readGuidedText': 'اقرأ النص المحدد أعلاه',
    'voice.speakFreely': 'تحدث بحرية عن أعراضك',
    'voice.pressToRecord': 'اضغط على زر الميكروفون للبدء',
    'voice.quality': 'جودة الصوت',
    'voice.qualityDesc': 'دقة تحليل الذكاء الاصطناعي',
    'voice.excellent': 'ممتاز',
    'voice.good': 'جيد',
    'voice.complete': 'إكمال التحليل',
    'voice.recordingStarted': 'بدأ التسجيل',
    'voice.recordingStopped': 'تم إيقاف التسجيل',
    'voice.errorNoRecording': 'الرجاء تسجيل صوتك أولاً',
    'voice.recordingSaved': 'تم حفظ التسجيل الصوتي',
    'voice.backToPrevious': 'رجوع للصفحة السابقة',

    // Disability Test
    'disability.title': 'اختبار قياس الإعاقة الحركية',
    'disability.subtitle': 'اختبار المشي 2 متر ',
    'disability.instructions': 'تعليمات الاختبار',
    'disability.instruction1': 'قف في نقطة البداية',
    'disability.instruction2': 'اضغط "بدء" عندما تكون جاهزاً',
    'disability.instruction3': 'امش 2 متر بأسرع ما يمكنك بشكل آمن',
    'disability.instruction4': 'اضغط "إنهاء" عند الوصول لنهاية المسافة',
    'disability.distance': 'المسافة (متر)',
    'disability.testInProgress': 'الاختبار جارٍ...',
    'disability.pressToStart': 'اضغط بدء لتشغيل المؤقت',
    'disability.startTest': 'بدء الاختبار',
    'disability.pause': 'إيقاف مؤقت',
    'disability.finish': 'إنهاء الاختبار',
    'disability.reset': 'إعادة',
    'disability.viewResults': 'عرض النتائج',
    'disability.results': 'نتائج الاختبار',
    'disability.timeTaken': 'الوقت المستغرق:',
    'disability.distanceLabel': 'المسافة:',
    'disability.meter': 'متر',
    'disability.speed': 'السرعة:',
    'disability.kmh': 'كم/ساعة',
    'disability.assessment': 'التقييم:',
    'disability.recommendations': 'التوصيات:',
    'disability.disclaimer': '* هذا الاختبار للأغراض التوجيهية فقط ولا يغني عن الاستشارة الطبية',
    'disability.testStarted': 'بدأ الاختبار! ابدأ المشي الآن',
    'disability.testPaused': 'تم إيقاف الاختبار مؤقتاً',
    'disability.testCompleted': 'تم الانتهاء من الاختبار',
    'disability.testReset': 'تم إعادة تعيين الاختبار',

    // Early Detection
    'early.title': 'استبيان التحليل المبكر',
    'early.subtitle': 'اجب على الأسئلة التالية بدقة للحصول على تقييم مبدئي',
    'early.result': 'النتيجة:',
    'early.points': 'نقطة',
    'early.highRisk': 'قد تكون لديك أعراض أولية مشابهة لمرض التصلّب المتعدد.',
    'early.consultDoctor': 'يُنصح بمراجعة طبيب أعصاب لإجراء فحوصات إضافية.',
    'early.lowRisk': 'الأعراض المذكورة ليست مؤشرًا قويًا للمرض، لكن يُنصح بمتابعة طبيب إذا تفاقمت الأعراض.',
    'early.submitForm': 'إرسال الاستبيان',
    'early.consultRecommended': 'يُنصح بمراجعة طبيب أعصاب لإجراء فحوصات إضافية',
    'early.resultsSaved': 'تم حفظ النتائج بنجاح',
    
    // Early Detection - Sections
    'early.section1': 'القسم 1: الصوت والنُطق',
    'early.section2': 'القسم 2: الحركة والإحساس',
    'early.section3': 'القسم 3: الرؤية',
    'early.section4': 'القسم 4: التركيز والطاقة',
    'early.section5': 'القسم 5: الألم والتحكم في الجسم',
    'early.section6': 'القسم 6: المزاج والنوم',
    'early.section7': 'القسم 7: التاريخ المرضي والعائلة',
    
    // Early Detection - Questions
    'early.q1': 'هل لاحظت مؤخرًا إن صوتك اتغيّر؟',
    'early.q1a': 'هل بقى صوتك أهدى أو فيه بُحّة ملحوظة؟',
    'early.q1b': 'هل بتحس إنك بتحتاج تبذل مجهود علشان تتكلم بصوت واضح؟',
    'early.q1c': 'هل في لحظات بتحس إن نطق الحروف بيتغير أو مش مضبوط زي قبل؟',
    'early.q1d': 'هل صوتك بيتغير حسب وقت اليوم (أسوأ الصبح أو بالليل)؟',
    'early.q2': 'هل لاحظت إن نغمة صوتك أو طبقة الصوت بتتهزّ أو بتتغير بشكل غير طبيعي؟',
    'early.q2a': 'هل التغيّر ده مستمر ولا بيظهر بس لما تتعب؟',
    'early.q2b': 'هل بيحصل كمان لما تتوتر أو تبذل مجهود؟',
    
    'early.q3': 'هل بيجيلك وخز أو تنميل في إيدك أو رجلك؟',
    'early.q3a': 'هل التنميل بيستمر أكتر من 24 ساعة؟',
    'early.q3b': 'هل بيتكرر في نفس المكان أو بيتنقل؟',
    'early.q3c': 'هل بيزيد مع الحرارة أو التعب؟',
    'early.q4': 'هل بتحس بضعف مفاجئ أو مؤقت في ذراعك أو رجلك؟',
    'early.q4a': 'هل الضعف بيمنعك مؤقتًا من أداء مهام بسيطة؟',
    'early.q4b': 'هل بتحس إن الإحساس بالعضلة بيرجع بعد وقت؟',
    'early.q5': 'هل حصل إنك فقدت توازنك فجأة أو حسيت إن الأرض بتلف؟',
    'early.q5a': 'هل بتحصل النوبات دي أثناء المشي أو الوقوف فقط؟',
    'early.q5b': 'هل بتحس إنك لازم تمسك حاجة علشان ما تقعش؟',
    
    'early.q6': 'هل حصل إن نظرك ضعف فجأة أو شُفت ضباب قدام عينك؟',
    'early.q6a': 'هل في عين واحدة فقط؟',
    'early.q6b': 'هل بتحس بألم في العين وقت الحركة؟',
    'early.q6c': 'هل رجع نظرك طبيعي بعد أيام أو لسه متأثر؟',
    'early.q7': 'هل بتشوف ومضات أو بقع ضوء غريبة أحيانًا؟',
    'early.q7a': 'هل بتحصل مع إجهاد العين؟',
    'early.q7b': 'هل بتيجي في نفس العين أو بتتنقل؟',
    
    'early.q8': 'هل بتنسى حاجات بسيطة أكتر من الأول؟',
    'early.q8a': 'هل النسيان بيأثر على الشغل أو الدراسة؟',
    'early.q8b': 'هل بيزيد مع التعب أو قلة النوم؟',
    'early.q9': 'هل طاقتك اليومية قلت حتى لو بتنام كويس؟',
    'early.q9a': 'هل بتحس بإرهاق ذهني (مش بس تعب جسدي)؟',
    'early.q9b': 'هل التعب بيزيد مع الجو الحار؟',
    
    'early.q10': 'هل بتحس بألم غريب (زي لسعة كهربا أو حرقان) بدون سبب واضح؟',
    'early.q10a': 'هل الألم بيظهر في نفس المنطقة؟',
    'early.q10b': 'هل بيزيد مع الحركة أو لمس الجلد؟',
    'early.q11': 'هل بتواجه صعوبة في التحكم في البول أو بتحس بحاجة مفاجئة للتبول؟',
    'early.q11a': 'هل بتحصل بشكل متكرر؟',
    'early.q11b': 'هل بتصاحبها تنميل أسفل الظهر أو البطن؟',
    
    'early.q12': 'هل مزاجك بيتغير بسرعة أو بتحس باكتئاب أو قلق مؤخرًا؟',
    'early.q12a': 'هل التغيرات دي بدأت مع الأعراض الجسدية؟',
    'early.q12b': 'هل بتحس إن نومك اتأثر؟',
    'early.q13': 'هل نومك بقى متقطع أو بتصحى أكتر من مرة في الليل بدون سبب؟',
    'early.q13a': 'هل السبب ألم أو تنميل أو تقلصات في الرجل؟',
    'early.q13b': 'هل بتحس بتعب في اليوم التالي حتى لو نمت كفاية؟',
    
    'early.q14': 'هل في حد من عيلتك مصاب بمرض التصلّب المتعدد أو أمراض مناعة؟',
    'early.q14a': 'قريب من الدرجة الأولى؟ (أب، أم، أخ، أخت)',
    'early.q14b': 'قريب من الدرجة الثانية؟ (جد، جدة، عم، عمة، خال، خالة)',
    'early.q15': 'هل سبق وعانيت من التهابات متكررة أو أمراض مناعة أخرى؟',
    'early.q15a': 'هل كانت الالتهابات في العين أو الأعصاب؟',
    'early.q15b': 'هل استمرت الأعراض لفترة طويلة أو تكررت أكثر من مرة؟',

    // Results Page
    'results.title': 'نتائج التحليل',
    'results.subtitle': 'التحليل الطبي بالذكاء الاصطناعي',
    'results.analyzing': 'جاري تحليل البيانات...',
    'results.processing': 'الذكاء الاصطناعي يقوم بمعالجة المعلومات',
    'results.noData': 'لا توجد بيانات للتحليل',
    'results.newInput': 'إدخال بيانات جديدة',
    'results.patientInfo': 'معلومات المريض',
    'results.name': 'الاسم',
    'results.ageLabel': 'العمر',
    'results.years': 'سنة',
    'results.symptomsLabel': 'الأعراض',
    'results.medicalHistoryLabel': 'التاريخ المرضي',
    'results.aiAnalysis': 'تحليل الذكاء الاصطناعي',
    'results.diagnosis': 'التشخيص المحتمل',
    'results.diagnosisText': 'بناءً على الأعراض المذكورة والتاريخ المرضي، يوصى بإجراء فحوصات إضافية لتأكيد التشخيص.',
    'results.recommendationsLabel': 'التوصيات',
    'results.recommendation1': 'استشارة طبيب متخصص في أقرب وقت',
    'results.recommendation2': 'إجراء الفحوصات المخبرية اللازمة',
    'results.recommendation3': 'متابعة الأعراض وتسجيل أي تطورات',
    'results.newAnalysis': 'تحليل جديد',
    'results.home': 'الصفحة الرئيسية',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.input': 'الإدخال',
    'nav.results': 'النتائج',
    'nav.voice': 'الصوت',
    'nav.disability': 'الإعاقة',
    'nav.notFound': 'عذراً! الصفحة غير موجودة',
    'nav.backToHome': 'العودة للصفحة الرئيسية',
  },
  en: {
    // Hero Page
    'hero.title': 'NeuroSense',
    'hero.subtitle': '— AI —',
    'hero.arabicSubtitle': 'Advanced Medical Analysis',
    'hero.welcome': 'Welcome to NeuroSense AI',
    'hero.description': 'Your advanced medical analysis companion powered by artificial intelligence. Backed by cutting-edge AI technology and medical expertise.',
    'hero.systemsOnline': 'AI Systems Online',
    'hero.startAnalysis': 'Start Analysis',
    'hero.version': 'NeuroSense AI v2.1.0 • Neural Engine Active',
    
    // Input Form
    'input.title': 'Patient Data Input',
    'input.subtitle': 'Enter medical information for accurate analysis',
    'input.patientName': 'Patient Name *',
    'input.patientNamePlaceholder': 'Enter patient name',
    'input.age': 'Age *',
    'input.agePlaceholder': 'Enter patient age',
    'input.symptoms': 'Gender *',
    'input.symptomsPlaceholder': 'Enter patient gender',
    'input.medicalHistory': 'Medical History',
    'input.optional': '(if available)',
    'input.medicalHistoryPlaceholder': 'Enter patient medical history (previous diseases, surgeries, ongoing medications, allergies...)',
    'input.medicalHistoryNote': 'This field is optional but helps provide more accurate analysis',
    'input.additionalTests': 'Additional Tests',
    'input.voiceAnalysis': 'Voice Analysis',
    'input.imageAnalysis': 'Image Analysis',
    'input.disabilityTest': 'Disability Test',
    'input.earlyDetection': 'Early Detection Survey',
    'input.back': 'Back',
    'input.analyze': 'Analyze Data',
    'input.privacyNote': 'All data is protected and encrypted to ensure patient privacy',
    'input.errorRequired': 'Please enter all required data',
    'input.analyzing': 'Analyzing data...',

    // Voice Analysis
    'voice.title': 'Medical Voice Analysis',
    'voice.subtitle': 'Voice tone analysis for health condition detection',
    'voice.analysisType': 'Voice Analysis Type',
    'voice.guidedReading': 'Read Specific Text',
    'voice.freeSpeak': 'Free Speech',
    'voice.languageSelect': 'Language Selection',
    'voice.languageDesc': 'Choose recording language',
    'voice.sampleText': 'Text to Read',
    'voice.sampleDesc': 'Read this text clearly for voice tone analysis:',
    'voice.sampleQuoteAr': 'أعاني من صداع وإرهاق منذ الأسبوع الماضي. الألم في معظمه في الصدغين ويزداد سوءًا في فترة ما بعد الظهر.',
    'voice.sampleQuoteEn': 'I have been experiencing headaches and fatigue for the past week. The pain is mostly in my temples and gets worse in the afternoon.',
    'voice.freeSpeakTitle': 'Free Speech',
    'voice.freeSpeakDesc': 'Speak freely about your symptoms or anything you want. Your voice tone and emotions will be analyzed through your speech.',
    'voice.recording': 'Recording...',
    'voice.pressToStart': 'Press to Start',
    'voice.readGuidedText': 'Read the text above',
    'voice.speakFreely': 'Speak freely about your symptoms',
    'voice.pressToRecord': 'Press the microphone button to start',
    'voice.quality': 'Voice Quality',
    'voice.qualityDesc': 'AI analysis accuracy',
    'voice.excellent': 'Excellent',
    'voice.good': 'Good',
    'voice.complete': 'Complete Analysis',
    'voice.recordingStarted': 'Recording started',
    'voice.recordingStopped': 'Recording stopped',
    'voice.errorNoRecording': 'Please record your voice first',
    'voice.recordingSaved': 'Voice recording saved',
    'voice.backToPrevious': 'Back to Previous Page',

    // Disability Test
    'disability.title': 'Mobility Disability Test',
    'disability.subtitle': '2-Meter Walk Test',
    'disability.instructions': 'Test Instructions',
    'disability.instruction1': 'Stand at the starting point',
    'disability.instruction2': 'Press "Start" when ready',
    'disability.instruction3': 'Walk 2 meters as fast as safely possible',
    'disability.instruction4': 'Press "Finish" upon reaching the end',
    'disability.distance': 'Distance (meters)',
    'disability.testInProgress': 'Test in progress...',
    'disability.pressToStart': 'Press start to begin timer',
    'disability.startTest': 'Start Test',
    'disability.pause': 'Pause',
    'disability.finish': 'Finish Test',
    'disability.reset': 'Reset',
    'disability.viewResults': 'View Results',
    'disability.results': 'Test Results',
    'disability.timeTaken': 'Time Taken:',
    'disability.distanceLabel': 'Distance:',
    'disability.meter': 'meters',
    'disability.speed': 'Speed:',
    'disability.kmh': 'km/h',
    'disability.assessment': 'Assessment:',
    'disability.recommendations': 'Recommendations:',
    'disability.disclaimer': '* This test is for guidance purposes only and does not replace medical consultation',
    'disability.testStarted': 'Test started! Begin walking now',
    'disability.testPaused': 'Test paused',
    'disability.testCompleted': 'Test completed',
    'disability.testReset': 'Test reset',

    // Early Detection
    'early.title': 'Early Detection Survey',
    'early.subtitle': 'Answer the following questions accurately for preliminary assessment',
    'early.result': 'Result:',
    'early.points': 'points',
    'early.highRisk': 'You may have early symptoms similar to Multiple Sclerosis.',
    'early.consultDoctor': 'It is recommended to consult a neurologist for additional tests.',
    'early.lowRisk': 'The mentioned symptoms are not a strong indicator of the disease, but it is advised to follow up with a doctor if symptoms worsen.',
    'early.submitForm': 'Submit Survey',
    'early.consultRecommended': 'It is recommended to consult a neurologist for additional tests',
    'early.resultsSaved': 'Results saved successfully',
    
    // Early Detection - Sections
    'early.section1': 'Section 1: Voice and Speech',
    'early.section2': 'Section 2: Movement and Sensation',
    'early.section3': 'Section 3: Vision',
    'early.section4': 'Section 4: Focus and Energy',
    'early.section5': 'Section 5: Pain and Body Control',
    'early.section6': 'Section 6: Mood and Sleep',
    'early.section7': 'Section 7: Medical and Family History',
    
    // Early Detection - Questions
    'early.q1': 'Have you recently noticed a change in your voice?',
    'early.q1a': 'Has your voice become quieter or noticeably hoarse?',
    'early.q1b': 'Do you feel you need to exert effort to speak clearly?',
    'early.q1c': 'Are there moments when your pronunciation changes or isn\'t as precise as before?',
    'early.q1d': 'Does your voice change depending on the time of day (worse in morning or night)?',
    'early.q2': 'Have you noticed that your voice tone or pitch shakes or changes abnormally?',
    'early.q2a': 'Is this change constant or does it only appear when you\'re tired?',
    'early.q2b': 'Does it also happen when you\'re stressed or exerting effort?',
    
    'early.q3': 'Do you experience tingling or numbness in your hands or feet?',
    'early.q3a': 'Does the numbness last more than 24 hours?',
    'early.q3b': 'Does it recur in the same place or move around?',
    'early.q3c': 'Does it increase with heat or fatigue?',
    'early.q4': 'Do you feel sudden or temporary weakness in your arm or leg?',
    'early.q4a': 'Does the weakness temporarily prevent you from performing simple tasks?',
    'early.q4b': 'Do you feel that muscle sensation returns after a while?',
    'early.q5': 'Have you suddenly lost your balance or felt the ground spinning?',
    'early.q5a': 'Do these episodes occur only while walking or standing?',
    'early.q5b': 'Do you feel you need to hold onto something to avoid falling?',
    
    'early.q6': 'Has your vision suddenly weakened or have you seen fog in front of your eyes?',
    'early.q6a': 'Is it in one eye only?',
    'early.q6b': 'Do you feel pain in the eye when moving?',
    'early.q6c': 'Has your vision returned to normal after a few days or is it still affected?',
    'early.q7': 'Do you see flashes or strange light spots sometimes?',
    'early.q7a': 'Does it happen with eye strain?',
    'early.q7b': 'Does it occur in the same eye or move around?',
    
    'early.q8': 'Do you forget simple things more than before?',
    'early.q8a': 'Does forgetfulness affect work or study?',
    'early.q8b': 'Does it increase with fatigue or lack of sleep?',
    'early.q9': 'Has your daily energy decreased even if you sleep well?',
    'early.q9a': 'Do you feel mental exhaustion (not just physical fatigue)?',
    'early.q9b': 'Does fatigue increase in hot weather?',
    
    'early.q10': 'Do you feel strange pain (like electric shock or burning) without clear reason?',
    'early.q10a': 'Does the pain appear in the same area?',
    'early.q10b': 'Does it increase with movement or touching the skin?',
    'early.q11': 'Do you have difficulty controlling urination or feel a sudden need to urinate?',
    'early.q11a': 'Does it happen frequently?',
    'early.q11b': 'Is it accompanied by numbness in the lower back or abdomen?',
    
    'early.q12': 'Does your mood change quickly or do you feel depressed or anxious lately?',
    'early.q12a': 'Did these changes start with physical symptoms?',
    'early.q12b': 'Do you feel your sleep has been affected?',
    'early.q13': 'Has your sleep become interrupted or do you wake up several times at night without reason?',
    'early.q13a': 'Is the reason pain, numbness, or leg cramps?',
    'early.q13b': 'Do you feel tired the next day even if you slept enough?',
    
    'early.q14': 'Is anyone in your family diagnosed with Multiple Sclerosis or autoimmune diseases?',
    'early.q14a': 'First-degree relative? (father, mother, brother, sister)',
    'early.q14b': 'Second-degree relative? (grandfather, grandmother, uncle, aunt)',
    'early.q15': 'Have you previously suffered from recurrent infections or other autoimmune diseases?',
    'early.q15a': 'Were the infections in the eye or nerves?',
    'early.q15b': 'Did the symptoms persist for a long time or recur more than once?',

    // Results Page
    'results.title': 'Analysis Results',
    'results.subtitle': 'AI Medical Analysis',
    'results.analyzing': 'Analyzing data...',
    'results.processing': 'AI is processing information',
    'results.noData': 'No data available for analysis',
    'results.newInput': 'Enter New Data',
    'results.patientInfo': 'Patient Information',
    'results.name': 'Name',
    'results.ageLabel': 'Age',
    'results.years': 'years',
    'results.symptomsLabel': 'Symptoms',
    'results.medicalHistoryLabel': 'Medical History',
    'results.aiAnalysis': 'AI Analysis',
    'results.diagnosis': 'Possible Diagnosis',
    'results.diagnosisText': 'Based on the mentioned symptoms and medical history, additional tests are recommended to confirm the diagnosis.',
    'results.recommendationsLabel': 'Recommendations',
    'results.recommendation1': 'Consult a specialist as soon as possible',
    'results.recommendation2': 'Perform necessary laboratory tests',
    'results.recommendation3': 'Monitor symptoms and record any developments',
    'results.newAnalysis': 'New Analysis',
    'results.home': 'Home',
    
    // Navigation
    'nav.home': 'Home',
    'nav.input': 'Input',
    'nav.results': 'Results',
    'nav.voice': 'Voice',
    'nav.disability': 'Disability',
    'nav.notFound': 'Sorry! Page not found',
    'nav.backToHome': 'Back to Home',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    document.body.dir = language === 'ar' ? 'ltr' : 'rtl';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
