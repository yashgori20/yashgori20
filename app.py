import streamlit as st

# Page configuration
st.set_page_config(
    page_title="Yash Gori",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS with improved styling
st.markdown("""
<style>
    /* Hide the default Streamlit sidebar */
    [data-testid="stSidebar"] {
        display: none;
    }
    
    /* Main container styling */
    .main {
        background-color: #1a1a1a;
    }
    
    /* Updated profile card with proper vertical alignment */
    .profile-card {
        background-color: #242424;
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
        width: 85%;
        margin: 2rem auto;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        border: 1px solid rgba(255,233,75,0.1);
        position: relative;
        top: 50%;
        transform: none;
    }
    
    .profile-card h1 {
        color: #fff;
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }
    
    .profile-card p {
        color: #ccc;
        margin: 0.3rem 0;
    }
    
    /* Updated navigation buttons with equal spacing */
    .nav-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 0 1rem;
    }
    
    .profile-title {
        color: #ffe94b !important;
        font-size: 1.1rem;
        margin: 0.5rem 0;
    }
    
    .profile-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: 1rem auto;
        border: 3px solid #ffe94b;
    }
    
    /* Service cards */
    .service-card {
        background-color: #2d2d2d;
        border-radius: 15px;
        padding: 2rem;
        margin-bottom: 1.5rem;
        border: 1px solid rgba(255,233,75,0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .service-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(255,233,75,0.1);
    }
    
    .service-card h3 {
        color: #ffe94b;
        margin-bottom: 1rem;
    }
    
    /* Navigation buttons */
    .nav-buttons {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1rem;
    }
    
    .stButton button {
        background-color: transparent !important;
        color: #ffe94b !important;
        border: 2px solid #ffe94b !important;
        padding: 0.6rem 1rem !important;
        width: 120px !important;  /* Fixed width for all buttons */
        height: auto;
        font-size: 1rem !important;
        font-weight: 500 !important;
        border-radius: 25px !important;
        transition: all 0.3s ease !important;
        margin: 0 !important;
    }
    
    .stButton button:hover {
        background-color: #ffe94b !important;
        color: black !important;
        transform: translateY(-2px);
    }
    
    /* Section headers */
    h1, h2, h3 {
        color: #fff;
    }
    
    .section-header {
        color: #ffe94b;
        font-size: 2rem;
        margin: 2rem 0;
        border-bottom: 2px solid rgba(255,233,75,0.2);
        padding-bottom: 0.5rem;
    }
    
    /* Social icons */
    .social-icons {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .social-icons a {
        color: #fff;
        font-size: 1.5rem;
        transition: color 0.3s ease;
    }
    
    .social-icons a:hover {
        color: #ffe94b;
    }
    
    /* Hide Streamlit components */
    footer {
        visibility: hidden;
    }
    
    /* Custom divider */
    .divider {
        height: 1px;
        background: linear-gradient(90deg, rgba(255,233,75,0), rgba(255,233,75,0.3), rgba(255,233,75,0));
        margin: 2rem 0;
    }
    
    /* Input section styling */
    .input-section {
        margin-bottom: 1rem;
    }
</style>
""", unsafe_allow_html=True)

# Add Font Awesome for icons
st.markdown("""
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
""", unsafe_allow_html=True)

# Initialize session state
if 'page' not in st.session_state:
    st.session_state.page = 'about'

# Layout with adjusted proportions
left, right = st.columns([0.8, 2])

# Left Column - Profile
with left:
    st.markdown("""
    <div class="profile-card">
        <img src="https://avatars.githubusercontent.com/u/your_username" class="profile-image">
        <h1>Yash Gori</h1>
        <p class="profile-title">Full Stack Developer</p>
        <p class="profile-title">AI/ML Engineer</p>
        <div class="divider"></div>
        <p style="color: #ffe94b;">📧 EMAIL</p>
        <p>yashnileshgori@gmail.com</p>
        <div class="divider"></div>
        <p style="color: #ffe94b;">📍 LOCATION</p>
        <p>Mumbai, IN</p>
        <div class="divider"></div>
        <div class="social-icons">
            <a href="https://linkedin.com/in/yashgori20" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="https://github.com/yashgori20" target="_blank"><i class="fab fa-github"></i></a>
            <a href="https://kaggle.com/yashgori20" target="_blank"><i class="fab fa-kaggle"></i></a>
        </div>
    </div>
    """, unsafe_allow_html=True)

# Right Column - Navigation and Content
with right:
    # Input section
    st.markdown('<div class="input-section">', unsafe_allow_html=True)
    user_input = st.text_input(" ", placeholder="Anything you would like to ask about me?")
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Navigation buttons in a row with spacing
    st.markdown('<div class="nav-buttons">', unsafe_allow_html=True)
    cols = st.columns(5)
    with cols[0]:
        if st.button("About"):
            st.session_state.page = 'about'
    with cols[1]:
        if st.button("Experience"):
            st.session_state.page = 'experience'
    with cols[2]:
        if st.button("Projects"):
            st.session_state.page = 'projects'
    with cols[3]:
        if st.button("Contact"):
            st.session_state.page = 'contact'
    with cols[4]:
        if st.button("Resume"):
            st.session_state.page = 'resume'
    st.markdown('</div>', unsafe_allow_html=True)

    
    st.markdown('<div class="divider"></div>', unsafe_allow_html=True)
    
    # Content based on selected page
    if st.session_state.page == 'about':
        st.markdown('<h2 class="section-header">About Me</h2>', unsafe_allow_html=True)
        st.markdown("""
        <div class="service-card">
            I'm a BTech IT student at KJ Somaiya College of Engineering, passionate about building AI-powered solutions that make a difference. 
            My focus lies in developing intelligent systems that solve real-world problems through innovative approaches and cutting-edge technology.
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown('<h2 class="section-header">What I\'m Doing</h2>', unsafe_allow_html=True)
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("""
            <div class="service-card">
                <h3>🤖 AI Development</h3>
                <p>Building intelligent systems using LLMs and advanced ML techniques, focusing on natural language processing and computer vision applications.</p>
            </div>
            
            <div class="service-card">
                <h3>📱 Full Stack Development</h3>
                <p>Creating responsive and dynamic web applications with modern frameworks and best practices in software development.</p>
            </div>
            """, unsafe_allow_html=True)
            
        with col2:
            st.markdown("""
            <div class="service-card">
                <h3>🔍 Machine Learning</h3>
                <p>Implementing sophisticated ML models for real-world applications, with expertise in deep learning and data analysis.</p>
            </div>
            
            <div class="service-card">
                <h3>💻 API Development</h3>
                <p>Designing and implementing robust backend systems with focus on scalability, security, and performance.</p>
            </div>
            """, unsafe_allow_html=True)
            
    elif st.session_state.page == 'experience':
        st.markdown('<h2 class="section-header">Experience</h2>', unsafe_allow_html=True)
        st.markdown("""
        <div class="service-card">
            <h3>Business Analyst @ N.K. Engineering</h3>
            <p style="color: #ffe94b;">May 2024 – July 2024</p>
            <ul>
                <li>Led data-driven strategies to identify growth opportunities</li>
                <li>Secured financial support and attracted new investors</li>
                <li>Achieved 12% expansion in market share</li>
            </ul>
        </div>
        
        <div class="service-card">
            <h3>Front-End Development @ MetaRizz</h3>
            <p style="color: #ffe94b;">Sept 2023 – Oct 2023</p>
            <ul>
                <li>Led front-end development for Medinobel healthcare app</li>
                <li>Designed and implemented UI/UX</li>
                <li>Ensured seamless user experience</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
        
    elif st.session_state.page == 'projects':
        st.markdown('<h2 class="section-header">Projects</h2>', unsafe_allow_html=True)
        st.markdown("""
        <div class="service-card">
            <h3>🤖 DocuTalk</h3>
            <p>AI-powered document interaction system using Flutter, Flask, and Gemini LLM. 
            Leverages FAISS for semantic search and LangChain for contextual understanding.</p>
        </div>
        
        <div class="service-card">
            <h3>💼 Inhance</h3>
            <p>LinkedIn Profile Optimizer powered by Mixtral LLM and GROQ Cloud. 
            Multi-agent system providing personalized profile enhancement suggestions.</p>
        </div>
        
        <div class="service-card">
            <h3>📊 Customer Churn Predictor</h3>
            <p>94% accurate ML model for predicting customer churn, 
            visualized through interactive Power BI dashboards.</p>
        </div>
        """, unsafe_allow_html=True)
        
    elif st.session_state.page == 'contact':
        st.markdown('<h2 class="section-header">Contact</h2>', unsafe_allow_html=True)
        st.markdown("""
        <div class="service-card">
            <h3>Get in Touch</h3>
            <div class="social-icons">
                <a href="mailto:yashnileshgori@gmail.com" target="_blank" title="Email"><i class="fas fa-envelope"></i></a>
                <a href="tel:+917718081766" target="_blank" title="Phone"><i class="fas fa-phone"></i></a>
                <a href="https://instagram.com/yashgori20" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://twitter.com/yashgori20" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="https://kaggle.com/yashgori20" target="_blank" title="Kaggle"><i class="fab fa-kaggle"></i></a>
                <a href="https://huggingface.co/yashgori20" target="_blank" title="Hugging Face"><i class="fas fa-robot"></i></a>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
    elif st.session_state.page == 'resume':
        st.markdown('<h2 class="section-header">Resume</h2>', unsafe_allow_html=True)
        st.markdown("""
        <div class="service-card">
            <h3>Download My Resume</h3>
            <p>You can download my resume by clicking the button below:</p>
        </div>
        """, unsafe_allow_html=True)
        # Replace 'Yash_Gori_Resume.pdf' with the path to your actual resume file
        with open('Yash_Gori_Resume.pdf', 'rb') as f:
            resume_data = f.read()
        st.download_button(label='Download Resume', data=resume_data, file_name='Yash_Gori_Resume.pdf', mime='application/pdf')
