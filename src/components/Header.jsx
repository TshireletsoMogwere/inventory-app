function Header({ activeTab, setActiveTab }) {
    return (
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Inventory Manager</h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <button 
                    className={`${activeTab === 'products' ? 'text-blue-300 font-bold' : 'text-gray-300'} hover:text-white`}
                    onClick={() => setActiveTab('products')}
                  >
                    Products
                  </button>
                </li>
                <li>
                  <button 
                    className={`${activeTab === 'sales' ? 'text-blue-300 font-bold' : 'text-gray-300'} hover:text-white`}
                    onClick={() => setActiveTab('sales')}
                  >
                    Sales Report
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;