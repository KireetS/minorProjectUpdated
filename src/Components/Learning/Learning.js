import React from "react";
import {
  FaBookOpen,
  FaYoutube,
  FaGlobe,
  FaRegCreditCard,
} from "react-icons/fa";

const Learning = () => {
  // Expanded list of learning resources
  const videoRecommendations = [
    {
      title: "How to Invest For Beginners",
      creator: "Graham Stephan",
      videoId: "2KgH0UpiRiw",
    },
    {
      title: "How To Budget For Financial Success",
      creator: "The Financial Diet",
      videoId: "7GSGA8SVsOs",
    },
    {
      title: "How to Invest for Beginners (2025)",
      creator: "Ali Abdaal",
      videoId: "lNdOtlpmH5U",
    },
    {
      title: "The Chinese Secret to Saving Money Revealed",
      creator: "WhiteBoard Finance",
      videoId: "ms1nTeFO7ps",
    },
  ];

  const learningResources = [
    {
      title: "Graham Stephan - YouTube",
      description:
        "A YouTube channel dedicated to personal finance, investing, and money management. Graham Stephan offers tips on budgeting, real estate, and passive income strategies.",
      url: "https://www.youtube.com/c/GrahamStephan",
      icon: <FaYoutube />,
      goal: "Learn personal finance, investing basics, and real estate strategies to increase savings and make smarter money decisions.",
    },
    {
      title: "The Financial Diet - YouTube",
      description:
        "A YouTube channel offering personal finance advice, budgeting tips, and career advice. It focuses on practical financial habits and wealth-building tips for beginners.",
      url: "https://www.youtube.com/c/TheFinancialDiet",
      icon: <FaYoutube />,
      goal: "Understand budgeting, debt management, and how to save money while making smart financial decisions.",
    },
    {
      title: "Investopedia",
      description:
        "A well-known financial site with articles, tutorials, and resources on finance and investing. Investopedia offers clear and concise explanations of financial terms, investment strategies, and market trends.",
      url: "https://www.investopedia.com/",
      icon: <FaGlobe />,
      goal: "Gain in-depth knowledge of financial terminology, stock market investing, and advanced financial concepts to make smarter investment decisions.",
    },
    {
      title: "NerdWallet",
      description:
        "A personal finance website offering advice on credit cards, loans, investing, and more. NerdWallet helps you compare financial products to get the best deals and manage your money better.",
      url: "https://www.nerdwallet.com/",
      icon: <FaGlobe />,
      goal: "Improve credit scores, choose the right credit cards, loans, and savings accounts, and make better financial choices.",
    },
    {
      title: "Mint - Budgeting & Finance Tracker",
      description:
        "A free budgeting tool that helps you track your spending, categorize your expenses, and monitor your financial goals. It also provides recommendations on how to save more and invest better.",
      url: "https://www.mint.com/",
      icon: <FaRegCreditCard />,
      goal: "Track your spending habits, create a budget, and improve your savings rate to better manage personal finances.",
    },
    {
      title: "Acorns - Invest Your Spare Change",
      description:
        "Acorns helps users automatically invest spare change from their everyday purchases. It rounds up purchases to the nearest dollar and invests the difference in a diversified portfolio.",
      url: "https://www.acorns.com/",
      icon: <FaGlobe />,
      goal: "Make investing automatic and accessible for beginners with a small amount of money to grow their savings and wealth.",
    },
    {
      title: "Robinhood - Stock Trading App",
      description:
        "Robinhood is a commission-free trading platform that allows users to buy and sell stocks, options, and cryptocurrencies. It's designed for beginners looking to enter the stock market with no upfront costs.",
      url: "https://www.robinhood.com/",
      icon: <FaGlobe />,
      goal: "Get started with stock trading, diversify investments, and grow wealth through stock market investments without paying commissions.",
    },
    {
      title: "Personal Capital",
      description:
        "Personal Capital is a free tool that helps users manage their wealth, track their spending, and invest for retirement. It provides a holistic view of your finances, helping you make informed decisions.",
      url: "https://www.personalcapital.com/",
      icon: <FaGlobe />,
      goal: "Track your net worth, analyze your investment portfolio, and plan for retirement with a focus on long-term wealth-building.",
    },
    {
      title: "The Motley Fool - Stock Advice and Investment News",
      description:
        "The Motley Fool provides expert stock recommendations, investing news, and personal finance tips. The platform aims to help users make better investment choices by offering professional advice and in-depth analysis.",
      url: "https://www.fool.com/",
      icon: <FaGlobe />,
      goal: "Learn about stock market trends, get expert recommendations, and grow your investment portfolio with better decision-making.",
    },
    {
      title: "Dave Ramsey - Financial Advice and Budgeting",
      description:
        "Dave Ramsey is a well-known financial advisor who offers advice on debt management, budgeting, and building wealth. His principles are widely used by individuals looking to achieve financial freedom.",
      url: "https://www.daveramsey.com/",
      icon: <FaBookOpen />,
      goal: "Get practical advice on budgeting, paying off debt, and managing your money to achieve financial independence and wealth.",
    },
  ];

  return (
    <div className="bg-primary-color flex-1 h-screen p-5 md:p-10 overflow-y-scroll vscrollbar">
      {/* Heading */}
      <div className="w-full flex items-center justify-between space-x-4 py-3 px-0">
        <h1 className="text-white text-2xl font-semibold">
          Learn About Finances
        </h1>
        <a
          href="https://www.investopedia.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 text-white font-bold rounded-lg py-2 px-3 inline-flex items-center"
        >
          See More
          <FaGlobe className="ml-2" />
        </a>
      </div>

      {/* Suggested Videos Section */}
      <div className="mt-6 bg-secondary-color p-6 rounded-lg shadow-md">
        <h2 className="text-white text-xl font-semibold mb-4">
          Suggested Videos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          {videoRecommendations.map((video, index) => (
            <div
              key={index}
              className="bg-primary-color p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-yellow-500 font-semibold mb-1">
                {video.title}
              </h3>
              <p className="text-gray-300 text-sm mb-2">By {video.creator}</p>
              <iframe
                width="100%"
                height="300"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Resources Table */}
      <div className="mt-6 overflow-x-scroll rounded-lg shadow-md max-w-full vscrollbar lg:overflow-hidden">
        <table className="w-full text-white border-separate border-spacing-0 bg-secondary-color rounded-lg">
          <thead>
            <tr className="bg-secondary-color text-left rounded-t-lg">
              <th className="p-4">Resource</th>
              <th className="p-4">Description</th>
              <th className="p-4">Link</th>
              <th className="p-4">Goal</th>
            </tr>
          </thead>
          <tbody>
            {learningResources.map((resource, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="p-4 flex items-center space-x-2">
                  {resource.icon}
                  <span>{resource.title}</span>
                </td>
                <td className="p-4">{resource.description}</td>
                <td className="p-4">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    Visit
                  </a>
                </td>
                <td className="p-4">{resource.goal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Learning;
