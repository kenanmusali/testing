import React, { useState, useEffect } from 'react';
import ArrayData1Img from '../../../assets/svg/person.2.svg';
import ArrayData1Svg from '../../../assets/svg/calendar.svg';
import ArrayData0Svg from '../../../assets/svg/clock.svg';
import ArrayData2Svg from '../../../assets/svg/location.svg';
import SortColumnImage from '../../../assets/svg/slider.horizontal.below.rectangle.svg';
import SortRowImage from '../../../assets/svg/slider.horizontal.below.square.fill.and.square.svg';
import ClockImage from '../../../assets/svg/clock.arrow.circlepath.svg';
import CloseImage from '../../../assets/svg/close.bubble.svg';
import EyeImage from '../../../assets/svg/eye.svg';


const Vacancies = () => {
    const [isColumnLayout, setIsColumnLayout] = useState(true);
    const [animationKey, setAnimationKey] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        profession: '',
        mobile: '',
        email: '',
        cv: null,
        cvText: ''
    });

    const [isSortedByDate, setIsSortedByDate] = useState(false);
    const [displayedData, setDisplayedData] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(10);
    const [jobDescriptions, setJobDescriptions] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const originalArrayData = [
        { id: 0,  image: ArrayData1Img,  title: 'Abşeron Logistika Mərkəzi Ümumi CV bazasına müraciət', descriptionKey: 'ResumeDatabase' },
        { id: 1, EyeImage:EyeImage, view: '480', image: ArrayData1Img, title: 'IT Helpdesk (Texnik)', expireDateImage: ArrayData0Svg, expireDate: 'Oktyabr 1, 2026', dateImage: ArrayData1Svg, date: 'Sentyabr 1, 2024', locationImage: ArrayData2Svg, location: 'Baku, Azerbaijan', link: 'https://jobs.glorri.az/vacancies/absheronport/absheronport-inzibatilesdirme-uzre-kicik-mutexessis-43581?isLocal=true', descriptionKey: 'ITHelpdesk' },
        { id: 2, EyeImage:EyeImage, view: '530', image: ArrayData1Img, title: 'Kran operatoru', expireDateImage: ArrayData0Svg, expireDate: 'Oktyabr 1, 2026', dateImage: ArrayData1Svg, date: 'Sentyabr 1, 2023', locationImage: ArrayData2Svg, location: 'Baku, Azerbaijan', link: 'https://www.jobsearch.az/vacancies/abseron-logistika-merkezi-marketinq-ve-ictimaiyyetle-elaqeler-uzre-aparici-mutexessis-116325', descriptionKey: 'CraneOperator' },
        { id: 3, EyeImage:EyeImage, view: '390', image: ArrayData1Img, title: 'Sistem əməliyyatlarına nəzarət üzrə mütəxəssis', expireDateImage: ArrayData1Svg, expireDate: 'Oktyabr 1, 2026', dateImage: ArrayData1Svg, date: 'Sentyabr 1, 2024', locationImage: ArrayData2Svg, location: 'Baku, Azerbaijan', link: 'https://jobs.glorri.az/vacancies/absheronport/absheronport-hesabatliq-uzre-mutexessis-26775?isLocal=true', descriptionKey: 'ControlSpecialist' },
        { id: 4, EyeImage:EyeImage, view: '296', image: ArrayData1Img, title: 'Tır sürücüsü', expireDateImage: ArrayData0Svg, expireDate: 'Oktyabr 1, 2026', dateImage: ArrayData1Svg, date: 'Sentyabr 1, 2024', locationImage: ArrayData2Svg, location: 'Baku, Azerbaijan', link: 'https://jobs.glorri.az/vacancies/absheronport/absheronport-maliyyə-uzre-mutexessis-26775?isLocal=true', descriptionKey: 'TruckDriver' },
        { id: 5, EyeImage:EyeImage, view: '489', image: ArrayData1Img, title: 'Analitik təhlil üzrə mütəxəssis', expireDateImage: ArrayData0Svg, expireDate: 'Oktyabr 1, 2026', dateImage: ArrayData1Svg, date: 'Sentyabr 1, 2024', locationImage: ArrayData2Svg, location: 'Baku, Azerbaijan', link: 'https://jobs.glorri.az/vacancies/absheronport/absheronport-it-uzre-mutexessis-26775?isLocal=true', descriptionKey: 'AnalysisSpecialist' },
        { id: 6, EyeImage:EyeImage, view: '449', image: ArrayData1Img, title: 'Avtoyükləyici (avtokar, elektrokar) ', expireDateImage: ArrayData0Svg, expireDate: 'Oktyabr 1, 2026', dateImage: ArrayData1Svg, date: 'Sentyabr 1, 2024', locationImage: ArrayData2Svg, location: 'Baku, Azerbaijan', link: 'https://jobs.glorri.az/vacancies/absheronport/absheronport-huquqshunas-26775?isLocal=true', descriptionKey: 'CarCharger' },
        { id: 7, EyeImage:EyeImage, view: '308', image: ArrayData1Img, title: 'Beynəlxalq daşıma əməliyyatları üzrə mütəxəssis', expireDateImage: ArrayData0Svg, expireDate: 'Oktyabr 1, 2026', dateImage: ArrayData1Svg, date: 'Sentyabr 1, 2025', locationImage: ArrayData2Svg, location: 'Baku, Azerbaijan', link: 'https://jobs.glorri.az/vacancies/absheronport/absheronport-kadrlarr-uzre-mutexessis-26775?isLocal=true', descriptionKey: 'TransportSpecialist' },
        { id: 8, EyeImage:EyeImage, view: '487', image: ArrayData1Img, title: 'Elektrik montyoru', dateImage: ArrayData1Svg, expireDateImage: ArrayData0Svg, date: 'Sentyabr 1, 2025', expireDate: 'Oktyabr 1, 2026', locationImage: ArrayData2Svg, location: 'Baku, Azerbaijan', link: 'https://jobs.glorri.az/vacancies/absheronport/absheronport-is-tklif-uzre-mutexessis-26775?isLocal=true', descriptionKey: 'Electrician' },
        { id: 9, EyeImage:EyeImage, view: '286', image: ArrayData1Img, title: 'Hesabatlıq üzrə mütəxəssis', dateImage: ArrayData1Svg, expireDateImage: ArrayData0Svg, date: 'Sentyabr 1, 2025', expireDate: 'Oktyabr 1, 2026', locationImage: ArrayData2Svg, location: 'Baku, Azerbaijan', link: 'https://jobs.glorri.az/vacancies/absheronport/absheronport-is-tklif-uzre-mutexessis-26775?isLocal=true', descriptionKey: 'ReportingSpecialist' },
        { id: 10, EyeImage:EyeImage, view: '374', image: ArrayData1Img, title: 'İnzibatiləşdirmə üzrə kiçik mütəxəssis', dateImage: ArrayData1Svg, expireDateImage: ArrayData0Svg, date: 'Sentyabr 1, 2025', expireDate: 'Oktyabr 1, 2026', locationImage: ArrayData2Svg, location: 'Baku, Azerbaijan', link: 'https://jobs.glorri.az/vacancies/absheronport/absheronport-is-tklif-uzre-mutexessis-26775?isLocal=true', descriptionKey: 'JRAdministrativeSpecialist' }

    ];

    useEffect(() => {
        const loadJobDescriptions = async () => {
            try {
                const descriptions = {};

                for (const job of originalArrayData) {
                    try {
                        const response = await import(`../../../assets/docs/${job.descriptionKey}.txt`);
                        const text = await fetch(response.default).then(res => res.text());
                        descriptions[job.id] = text;
                    } catch (error) {
                        console.error(`Error loading description for ${job.descriptionKey}:`, error);
                        descriptions[job.id] = "Description not available.";
                    }
                }

                setJobDescriptions(descriptions);
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading job descriptions:", error);
                setIsLoading(false);
            }
        };

        loadJobDescriptions();
    }, []);

    // Function to check if a job is expired
    const isJobExpired = (job) => {
        if (!job.expireDate) return false;

        const monthNames = {
            'Yanvar': 1, 'Fevral': 2, 'Mart': 3, 'Aprel': 4, 'May': 5, 'Iyun': 6,
            'Iyul': 7, 'Avqust': 8, 'Sentyabr': 9, 'Oktyabr': 10, 'Noyabr': 11, 'Dekabr': 12,
            'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
            'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
        };

        const parseDate = (dateStr) => {
            const [monthStr, day, year] = dateStr.replace(',', '').split(' ');
            const month = monthNames[monthStr];
            return new Date(year, month - 1, day);
        };

        const expireDate = parseDate(job.expireDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return expireDate < today;
    };

    useEffect(() => {
        // Initialize displayed data with limited items
        setDisplayedData(originalArrayData.slice(0, itemsToShow));
    }, []);

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showPopup]);

    const toggleLayout = () => {
        setIsColumnLayout(!isColumnLayout);
        setAnimationKey(prevKey => prevKey + 1);
    };

    const toggleSortByDate = () => {
        if (isSortedByDate) {
            setDisplayedData(originalArrayData.slice(0, itemsToShow));
            setIsSortedByDate(false);
        } else {
            const firstItem = originalArrayData[0]; // The item with id: 0
            const otherItems = originalArrayData.slice(1); // All other items

            // Convert dates to a sortable format
            const monthNames = {
                'Yanvar': 1, 'Fevral': 2, 'Mart': 3, 'Aprel': 4, 'May': 5, 'Iyun': 6,
                'Iyul': 7, 'Avqust': 8, 'Sentyabr': 9, 'Oktyabr': 10, 'Noyabr': 11, 'Dekabr': 12,
                'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
                'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
            };

            const sortedItems = [...otherItems].sort((a, b) => {
                if (!a.date || !b.date) return 0;

                const parseDate = (dateStr) => {
                    const [monthStr, day, year] = dateStr.replace(',', '').split(' ');
                    const month = monthNames[monthStr];
                    return new Date(year, month - 1, day);
                };

                return parseDate(b.date) - parseDate(a.date);
            });

            const limitedSortedItems = showAll ? sortedItems : sortedItems.slice(0, itemsToShow - 1);
            setDisplayedData([firstItem, ...limitedSortedItems]);
            setIsSortedByDate(true);
        }
        setAnimationKey(prevKey => prevKey + 1);
    };

    const toggleShowAll = () => {
        if (showAll) {
            setDisplayedData(isSortedByDate ?
                [originalArrayData[0], ...originalArrayData.slice(1).sort((a, b) => {
                    if (!isSortedByDate) return 0;

                    const monthNames = {
                        'Yanvar': 1, 'Fevral': 2, 'Mart': 3, 'Aprel': 4, 'May': 5, 'Iyun': 6,
                        'Iyul': 7, 'Avqust': 8, 'Sentyabr': 9, 'Oktyabr': 10, 'Noyabr': 11, 'Dekabr': 12,
                        'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
                        'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
                    };

                    const parseDate = (dateStr) => {
                        const [monthStr, day, year] = dateStr.replace(',', '').split(' ');
                        const month = monthNames[monthStr];
                        return new Date(year, month - 1, day);
                    };

                    return parseDate(b.date) - parseDate(a.date);
                }).slice(0, itemsToShow - 1)] :
                originalArrayData.slice(0, itemsToShow)
            );
        } else {
            // Show all items
            setDisplayedData(isSortedByDate ?
                [originalArrayData[0], ...originalArrayData.slice(1).sort((a, b) => {
                    if (!isSortedByDate) return 0;

                    const monthNames = {
                        'Yanvar': 1, 'Fevral': 2, 'Mart': 3, 'Aprel': 4, 'May': 5, 'Iyun': 6,
                        'Iyul': 7, 'Avqust': 8, 'Sentyabr': 9, 'Oktyabr': 10, 'Noyabr': 11, 'Dekabr': 12,
                        'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
                        'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
                    };

                    const parseDate = (dateStr) => {
                        const [monthStr, day, year] = dateStr.replace(',', '').split(' ');
                        const month = monthNames[monthStr];
                        return new Date(year, month - 1, day);
                    };

                    return parseDate(b.date) - parseDate(a.date);
                })] :
                originalArrayData
            );
        }
        setShowAll(!showAll);
        setAnimationKey(prevKey => prevKey + 1);
    };

    const handleApplyClick = (job) => {
        // Don't open popup if job is expired
        if (isJobExpired(job)) return;

        setSelectedJob(job);
        setShowPopup(true);
        setFormData({
            firstName: '',
            profession: '',
            mobile: '',
            email: '',
            cv: null,
            cvText: '' // Reset text area when opening popup
        });
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedJob(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            cv: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('jobId', selectedJob.id);
            formDataToSend.append('jobTitle', selectedJob.title);
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('profession', formData.profession);
            formDataToSend.append('mobile', formData.mobile);
            formDataToSend.append('email', formData.email);

            if (selectedJob.id === 0 && formData.cvText) {
                formDataToSend.append('cvText', formData.cvText);
            }

            if (formData.cv) {
                formDataToSend.append('cv', formData.cv);
            }

            const response = await fetch('http://localhost:5000/api/applications/submit', {
                method: 'POST',
                body: formDataToSend
            });

            const result = await response.json();

            if (result.success) {
                alert('Application submitted successfully!');
                handleClosePopup();
            } else {
                alert('Failed to submit application: ' + result.error);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred while submitting your application');
        }
    };

    if (isLoading) {
        return <div className="section-column">Loading job descriptions...</div>;
    }

    return (
        <div className="section-column">
            <p className='Title-Header'>Karyera imkanları</p>
            <div className="Section-Sort-Group">

                <div className="Section-Sort-Left">
                    <div className="Sorts animated-1" onClick={toggleLayout}>
                        {isColumnLayout ? (
                            <img src={SortColumnImage} className='No-Select' alt="Column layout" />
                        ) : (
                            <img src={SortRowImage} className='No-Select' alt="Row layout" />
                        )}
                    </div>
                    <div
                        className={`Sorts animated-2 ${isSortedByDate ? 'active' : ''}`}
                        onClick={toggleSortByDate}
                    >
                        <img src={ClockImage} className='No-Select' alt="Sort by time" />
                    </div>
                </div>
                <div className="Section-Sort-Right">
                    <div className="Sorts animated-2" onClick={toggleShowAll}>
                        <a>
                            <p>{showAll ? 'Daha az' : 'Daha çox'}</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* Hide main content when popup is open */}
            {!showPopup && (
                <div className={`Section-Card-Grid-container ${isColumnLayout ? 'column-layout' : 'row-layout'}`}
                    key={animationKey} >
                    {displayedData.map((item) => {
                        const expired = isJobExpired(item);
                        return (
                            <div className={`Cards-grid Main-Button-Style Main-Card-grid ${isColumnLayout ? 'column-Cards-grid' : 'row-Cards-grid'} animated-${item.id + 1} ${expired ? 'expired-job' : ''}`}
                                key={`${item.id}-${animationKey}`} >
                                <div className={`Cards-Item-grid ${expired ? 'expired' : ''}`}>
                                    <span className='Cards-Item-Folder'>
                                        <p className='card-title-grid'>{item.title}</p>
                                        {item.date && (
                                            <div className="Cards-Item-Bio">
                                                <img src={item.dateImage} className='No-Select' alt="Date" />
                                                <p>{item.date}</p>
                                            </div>
                                        )}
                                        {item.location && (
                                            <div className="Cards-Item-Bio">
                                                <img src={item.locationImage} className='No-Select' alt="Location" />
                                                <p>{item.location}</p>
                                            </div>
                                        )}
                                        {item.location && (
                                            <div className="Cards-Item-Bio">
                                                <img src={item.EyeImage} className='No-Select' alt="Location" />
                                                <p>{item.view}</p>
                                            </div>
                                        )}

                                    </span>
                                    <div className="Classic-Button">
                                        <a
                                            onClick={() => handleApplyClick(item)}
                                            className={expired ? 'expired-button' : ''}
                                        >
                                            {expired ? 'Müraciət dayandırılıb' : 'Müraciət et'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Popup Form */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-button" onClick={handleClosePopup}>
                            <img src={CloseImage} alt="Close" />
                        </button>
                        <div className="popup-container">
                            {/* Left side content */}
                            <div className="job-details">
                                {selectedJob.id === 0 ? (
                                    <>
                                        <h2>{selectedJob.title}</h2>
                                        <div className="general-cv-text" >
                                            <p style={{ whiteSpace: 'pre-line' }}>{jobDescriptions[selectedJob.id]}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2>{selectedJob.title}</h2>
                                        <div className="job-info">
                                            {selectedJob.expireDate && (
                                                <div className="info-item info-item-expire">
                                                    <img src={selectedJob.expireDateImage} alt="Expire Date" />
                                                    <span>Son tarix: {selectedJob.expireDate}</span>
                                                </div>
                                            )}
                                            <div className="info-item">
                                                <img src={selectedJob.dateImage} alt="Date" />
                                                <span>{selectedJob.date}</span>
                                            </div>

                                            <div className="info-item">
                                                <img src={selectedJob.locationImage} alt="Location" />
                                                <span>{selectedJob.location}</span>
                                            </div>
                                        </div>
                                        <div className="job-description">
                                            <p style={{ whiteSpace: 'pre-line' }}>{jobDescriptions[selectedJob.id]}</p>
                                            {/* <a href={selectedJob.link} target="_blank" rel="noopener noreferrer">Tam vakansiya təsvirinə bax</a> */}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Right side form */}
                            <div className="application-form">
                                <h3>Müraciət Formu</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder='Adı, Soyadı'
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            placeholder='Mobil nömrə (+994 00 000 00 00)'
                                            id="mobile"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {selectedJob.id === 0 ? (
                                        <>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    placeholder='Müraciət etmək istədiyiniz peşə və ya sahə'
                                                    id="profession"
                                                    name="profession"
                                                    value={formData.profession}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                        </>
                                    ) : null}

                                    <div className="form-group">
                                        <input
                                            type="email"
                                            placeholder='E-mail'
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cv">{selectedJob.id === 0 ? '' : ''}</label>
                                        <input
                                            type="file"
                                            id="cv"
                                            name="cv"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx"
                                            required={selectedJob.id !== 0}
                                        />
                                        {selectedJob.id === 0 && (
                                            <p className="optional-text"></p>
                                        )}
                                    </div>

                                    {/* Text area for CV specifically for id:0 */}
                                    {selectedJob.id === 0 && (
                                        <div className="form-group">
                                            <textarea
                                                id="cvText"
                                                placeholder="Qeyd etmək istədiyiniz digər məlumatlar:"
                                                name="cvText"
                                                value={formData.cvText}
                                                onChange={handleInputChange}
                                                rows={5}

                                            />
                                        </div>

                                    )}

                                    <button type="submit" className="Main-Button">Müraciəti göndər</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Vacancies;