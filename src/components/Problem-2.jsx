import React, { useState, useEffect } from 'react';
import ContactModal from './ContactModal';

const Problem2 = () => {
    const [currentModal, setCurrentModal] = useState(null);
    const [modalContent, setModalContent] = useState([]);
    const [USCountry, setUSCountry] = useState([]);
    const [showEvenIds, setShowEvenIds] = useState(false);
    const [contact, setContact] = useState(null);
    const [modalAPage, setModalAPage] = useState(1);
    const [modalBPage, setModalBPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (url, setStateFunction) => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const responseData = await response.json();
                if (responseData && responseData.results) {
                    setStateFunction(prevState => [...prevState, ...responseData.results]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchModalData = async () => {
            let url = '';
            let setStateFunction = null;

            if (currentModal === 'A') {
                url = `https://contact.mediusware.com/api/contacts/?page=${modalAPage}`;
                setStateFunction = setModalContent;
            } else if (currentModal === 'B') {
                url = `https://contact.mediusware.com/api/country-contacts/United%20States/?page=${modalBPage}`;
                setStateFunction = setUSCountry;
            }

            if (url && setStateFunction) {
                await fetchData(url, setStateFunction);
            }
        };

        if (currentModal) {
            fetchModalData();
        }
    }, [currentModal, modalAPage, modalBPage]);

    const openModal = (modal) => {
        if (modal === 'C') {
            setCurrentModal('C');
        } else {
            if (modal === 'A') {
                window.history.pushState({}, '', `${window.location.pathname}/Contacts`);
            } else if (modal === 'B') {
                window.history.pushState({}, '', `${window.location.pathname}/United-States`);
            }
            setCurrentModal(modal);
        }
    };

    const closeModal = () => {
        setCurrentModal(null);
    };

    const contactDetails = (x, y) => {
        setContact({
            name: x,
            num: y
        });
        openModal('C');
    };

    const filterModalContent = (content) => {
        return showEvenIds ? content.filter((item) => item.id % 2 === 0) : content;
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg"
                        style={{ backgroundColor: '#46139f', color: 'white' }}
                        type="button"
                        onClick={() => openModal('A')}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg"
                        style={{ backgroundColor: '#ff7f50', color: 'white' }}
                        type="button"
                        onClick={() => openModal('B')}
                    >
                        US Contacts
                    </button>
                </div>
            </div>

            {/* Modal A */}
            <ContactModal
                showModal={currentModal === 'A'}
                currentModal={currentModal}
                setModalAPage={setModalAPage}
                closeModal={closeModal}
                contacts={filterModalContent(modalContent)}
                contactDetails={contactDetails}
                openModal={openModal}
                setShowEvenIds={setShowEvenIds}
                showEvenIds={showEvenIds}
            />

            {/* Modal B */}
            <ContactModal
                showModal={currentModal === 'B'}
                currentModal={currentModal}
                setModalBPage={setModalBPage}
                closeModal={closeModal}
                contacts={filterModalContent(USCountry)}
                contactDetails={contactDetails}
                openModal={openModal}
                setShowEvenIds={setShowEvenIds}
                showEvenIds={showEvenIds}
            />

            {/* Modal C */}
            <ContactModal
                showModal={currentModal === 'C'}
                closeModal={closeModal}
                contacts={filterModalContent(USCountry)}
                contactDetails={contactDetails}
                openModal={openModal}
                setShowEvenIds={setShowEvenIds}
                showEvenIds={showEvenIds}
            />
        </div>
    );
};

export default Problem2;
