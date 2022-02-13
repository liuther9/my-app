"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticProps = void 0;
const react_1 = require("react");
const Home_module_scss_1 = __importDefault(require("../styles/Home.module.scss"));
const supabaseClient_1 = require("../utils/supabaseClient");
const ProductComponent_1 = __importDefault(require("../components/ProductComponent"));
const Search_1 = __importDefault(require("../components/Search"));
const gi_1 = require("react-icons/gi");
const md_1 = require("react-icons/md");
const Home = ({ data, categories }) => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)('');
    const categoryList = [
        {
            name: 'Пицца',
            icon: <gi_1.GiFullPizza size={22} color='#f0be62'/>,
        },
        {
            name: 'Десерты',
            icon: <gi_1.GiCookie size={22} color='#b38c24'/>,
        },
        {
            name: 'Пироги',
            icon: <md_1.MdCake size={22} color='#f7aefa'/>,
        },
    ];
    const filterProducts = (0, react_1.useCallback)((category) => {
        setSelectedCategory(category);
        setProducts(data.filter(product => product.category === category));
    }, [data]);
    (0, react_1.useEffect)(() => filterProducts(categories[1]), [categories, filterProducts]);
    return (<main className={Home_module_scss_1.default.container}>
      <Search_1.default products={data}/>

      <div className='spacer'></div>

      <section className={Home_module_scss_1.default.top_menu}>
        <div className={Home_module_scss_1.default.categories_container}>
          {categoryList.map(category => <button key={category.name} onClick={() => filterProducts(category.name)} className={selectedCategory === category.name ? Home_module_scss_1.default.button + ' ' + Home_module_scss_1.default.active : Home_module_scss_1.default.button}>
              <span>{category.name}</span>
              {category.icon}
            </button>)}
        </div>
      </section>

      <section className={Home_module_scss_1.default.main}>
        <div className={Home_module_scss_1.default.main_container}>
          {products.map(product => <ProductComponent_1.default key={product.id} product={product}/>)}
        </div>
      </section>

    </main>);
};
const getStaticProps = async (context) => {
    const { data, status, error } = await supabaseClient_1.supabase.from('products').select('id, title, price, name, category, image');
    const categories = data && Array.from(new Set(data.map(product => product.category)));
    if (error && status !== 406)
        throw error;
    return {
        props: {
            data: data ? data : [],
            categories,
        },
    };
};
exports.getStaticProps = getStaticProps;
exports.default = Home;
//# sourceMappingURL=index.js.map