import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdmissionsPage from './pages/AdmissionsPage';
import FeesPage from './pages/FeesPage';
import AcademicsPage from './pages/AcademicsPage';
import BooklistsPage from './pages/BooklistsPage';
import GoodieChat from './components/GoodieChat';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');

  const renderPage = () => {
    let pageComponent;
    switch (currentPage) {
      case 'Admissions':
        pageComponent = <AdmissionsPage />;
        break;
      case 'Fees':
        pageComponent = <FeesPage />;
        break;
      case 'Academics':
        pageComponent = <AcademicsPage />;
        break;
      case 'Booklists':
        pageComponent = <BooklistsPage />;
        break;
      case 'Home':
      default:
        pageComponent = <HomePage />;
        break;
    }
    return <div className="opacity-0 animate-fade-in">{pageComponent}</div>
  };

  return (
    <div className="bg-brand-background min-h-screen flex flex-col font-body text-brand-text">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <GoodieChat />
    </div>
  );
};

export default App;