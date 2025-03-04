import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  containerClassName?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  containerClassName = 'container mx-auto px-4 py-6',
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-bgLight">
      <Header />
      <main className={`flex-grow ${containerClassName}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
