import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiExternalLink, FiBookOpen, FiImage, FiPackage, FiCode } from 'react-icons/fi';

import './References.css';

function References() {
  const [activeTab, setActiveTab] = useState('documentation');

  const tabVariants = {
    inactive: { opacity: 0.6, y: 0 },
    active: { opacity: 1, y: 0 },
    hover: { opacity: 0.8, y: -2 }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className="references-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="references-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        References
      </motion.h1>

      <motion.div
        className="references-tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className={`tab-button ${activeTab === 'documentation' ? 'active' : ''}`}
          onClick={() => setActiveTab('documentation')}
          variants={tabVariants}
          initial="inactive"
          animate={activeTab === 'documentation' ? 'active' : 'inactive'}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <FiBookOpen className="tab-icon" />
          <span className="tab-text">Documentation</span>
        </motion.button>

        <motion.button
          className={`tab-button ${activeTab === 'site' ? 'active' : ''}`}
          onClick={() => setActiveTab('site')}
          variants={tabVariants}
          initial="inactive"
          animate={activeTab === 'site' ? 'active' : 'inactive'}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <FiCode className="tab-icon" />
          <span className="tab-text">How Our Site Works</span>
        </motion.button>

        <motion.button
          className={`tab-button ${activeTab === 'libraries' ? 'active' : ''}`}
          onClick={() => setActiveTab('libraries')}
          variants={tabVariants}
          initial="inactive"
          animate={activeTab === 'libraries' ? 'active' : 'inactive'}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <FiPackage className="tab-icon" />
          <span className="tab-text">Libraries</span>
        </motion.button>

        <motion.button
          className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
          variants={tabVariants}
          initial="inactive"
          animate={activeTab === 'images' ? 'active' : 'inactive'}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <FiImage className="tab-icon" />
          <span className="tab-text">Image References</span>
        </motion.button>
      </motion.div>

      <div className="references-content-wrapper">
        <AnimatePresence mode="wait">
          {activeTab === 'documentation' && (
            <motion.div
              key="documentation"
              className="references-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: 20 }}
            >
              <motion.h2 variants={itemVariants}>Documentation</motion.h2>

              <motion.div className="documentation-links" variants={itemVariants}>
                <motion.div
                  className="doc-card"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <h3>Copyright Checklist</h3>
                  <motion.a
                    href="/assets/user-manual.pdf"
                    className="doc-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink className="link-icon" />
                    Open PDF
                  </motion.a>
                </motion.div>

                <motion.div
                  className="doc-card"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <h3>Work Log</h3>
                  <motion.a
                    href="/assets/technical-documentation.pdf"
                    className="doc-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink className="link-icon" />
                    Open PDF
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'site' && (
            <motion.div
              key="site"
              className="references-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: 20 }}
            >
              <motion.h2 variants={itemVariants}>How Our Site Works</motion.h2>

              <motion.div className="site-explanation" variants={itemVariants}>
                <motion.div className="info-card">
                  <h3>Architecture Overview</h3>
                  <p>Our site is built on a standard CRA setup, leveraging only plain JSX and CSS for its presentation. The architecture is designed with simplicity and maintainability in mind, relying on well-established React patterns, best practices, and libraries. The frontend is deployed via Next.js on Vercel.</p>
                </motion.div>

                <motion.div className="info-card">
                  <h3>Key Features</h3>
                  <ul className="feature-list">
                    {[
                      'We follow React\'s component-based paradigm, where each UI element is encapsulated within its own component.',
                      'Instead of complex state management libraries, we rely on React\'s Context API to manage global state, keeping the app lightweight and avoiding additional dependencies.',
                      'Navigation throughout the app is handled using react-router-dom, allowing for seamless, client-side routing.',
                      'We follow WCAGG AA guidelines to ensure our site is accessible to a wide range of users, including those who rely on assistive technologies.'
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'libraries' && (
            <motion.div
              key="libraries"
              className="references-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: 20 }}
            >
              <motion.h2 variants={itemVariants}>Libraries</motion.h2>

              <motion.div className="libraries-table-wrapper" variants={itemVariants}>
                <table className="libraries-table">
                  <thead>
                    <tr>
                      <th>Library</th>
                      <th>Version</th>
                      <th>Purpose</th>
                      <th>License</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'React', version: '18.3.1', purpose: 'UI library', license: 'MIT' },
                      { name: 'Framer Motion', version: '12.0.6', purpose: 'Animation library', license: 'MIT' },
                      { name: 'React Icons', version: '5.5.0', purpose: 'Icon components', license: 'MIT' },
                      { name: 'React Router DOM', version: '7.0.2', purpose: 'Client-side routing', license: 'MIT' },
                      { name: 'Lucide React', version: '0.468.0', purpose: 'Alternative icon library', license: 'MIT' },
                      { name: 'Prettier', version: '3.4.2', purpose: 'Code formatter', license: 'MIT' },
                      { name: 'Stylelint', version: '16.11.0', purpose: 'CSS linter', license: 'MIT' },
                    ].map((lib, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <td className="code-font">{lib.name}</td>
                        <td>{lib.version}</td>
                        <td>{lib.purpose}</td>
                        <td>{lib.license}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'images' && (
            <motion.div
              key="images"
              className="references-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: 20 }}
            >
              <motion.h2 variants={itemVariants}>Image References</motion.h2>

              <motion.div className="image-credits" variants={itemVariants}>
                <motion.div className="info-card">
                  <h3>Landing Page Photography</h3>
                  <p>Images used on the landing page:</p>
                  <div className="credit-list-container">
                    <ul className="credit-list">
                      {[
                        'istockphoto.com/photo/olive-trees-on-sunset',
                        'istockphoto.com/photo/farmers-market-interaction',
                        'istockphoto.com/photo/food-background-with-assortment-of-fresh-organic-fruits-and-vegetables',
                        'istockphoto.com/photo/variety-of-vegan-plant-based-protein-food',
                        'istockphoto.com/photo/a-view-up-into-the-trees-direction-sky'
                      ].map((credit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {credit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div className="info-card">
                  <h3>Values Photography</h3>
                  <p>Images representing our core values:</p>
                  <div className="credit-list-container">
                    <ul className="credit-list">
                      {[
                        'istockphoto.com/photo/farmer-examining-sunflower-seedlings-at-sunset',
                        'istockphoto.com/photo/blurred-picture-of-a-weekend-festival',
                        'istockphoto.com/photo/hand-holding-drawing-virtual-lightbulb-with-brain-on-bokeh-background'
                      ].map((credit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {credit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div className="info-card">
                  <h3>Menu Photography</h3>
                  <p>Images used in the menu section:</p>
                  <div className="credit-list-container">
                    <ul className="credit-list">
                      {[
                        'istockphoto.com/photo/vegan-tacos-and-guacamole-served-in-tulum-mexico-closeup',
                        'istockphoto.com/photo/vegan-tortilla-wraps-with-tofu-cucumber-carrots-and-avocado',
                        'istockphoto.com/photo/colourful-vegan-bowl-with-quinoa-and-sweet-potato',
                        'istockphoto.com/photo/close-up-of-a-veggie-burger-with-copy-space',
                        'istockphoto.com/photo/homemade-vegan-cauliflower-crust-pizza',
                        'istockphoto.com/photo/parmesan-spinach-macaroni-and-cheese',
                        'istockphoto.com/photo/italian-lasagna-with-tomato-sauce-and-cheese',
                        'istockphoto.com/photo/sweet-potato-and-cauliflower-curry-made-with-coconut-milk',
                        'istockphoto.com/photo/southwest-burrito-bowl',
                        'istockphoto.com/photo/vegetarian-skewers-with-organic-vegetables-on-a-white-plate'
                      ].map((credit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {credit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div className="info-card">
                  <h3>Process Photography</h3>
                  <p>Images documenting our process:</p>
                  <div className="credit-list-container">
                    <ul className="credit-list">
                      {[
                        'istockphoto.com/photo/open-soybean-field-at-sunset',
                        'istockphoto.com/photo/variety-of-fresh-organic-vegetables-and-fruits-in-the-garden',
                        'istockphoto.com/photo/last-straw',
                        'istockphoto.com/photo/a-set-of-round-paper-containers-for-food',
                        'istockphoto.com/photo/vegan-lunch-chocolate-smoothie-bowl'
                      ].map((credit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {credit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default References;