import React, { useRef } from 'react';
import '../assets/scss/ContactModal.scss';
import debounce from '../Utils/debounce';

export default function ContactModal({ showModal, closeModal, contacts, contactDetails, showEvenIds, openModal, setShowEvenIds, setModalAPage, setModalBPage, currentModal }) {
    const ref = useRef();

    const handleScroll = () => {
        if (Math.abs(ref.current.scrollTop + ref.current.clientHeight - ref.current.scrollHeight) < 3) {
            debounce(() => {
                if (currentModal === 'A') {
                    setModalAPage(prevPage => prevPage + 1);
                } else if (currentModal === 'B') {
                    setModalBPage(prevPage => prevPage + 1);
                }
            }, 500);
        }
    };

    const filteredModalContent = showEvenIds ? contacts.filter((item) => item.id % 2 === 0) : contacts;

    return (
        <div onScroll={handleScroll} ref={ref} className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <h2 className='text-center'>Contacts</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Phone</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredModalContent.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary m-1"
                                            onClick={() => contactDetails(item.country.name, item.phone)}
                                        >
                                            {item.phone}
                                        </button>
                                    </td>
                                    <td>{item.country.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex">
                        <button
                            className="btn btn-primary m-1"
                            onClick={() => openModal('A')}
                        >
                            All Contacts
                        </button>
                        <button
                            className="btn btn-secondary m-1"
                            onClick={() => openModal('B')}
                        >
                            US Contacts
                        </button>
                        <button
                            className="btn btn-closes m-1"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                    <div className="ms-2">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={showEvenIds}
                                onChange={() => setShowEvenIds(!showEvenIds)}
                            />{' '}
                            Show Even IDs
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
