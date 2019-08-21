import Main from '@/view/Main/index'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */



export default
  [
    // 刚进来页面重定向到home主页面
    {
      path: '/',
      name: '_Main',
      redirect: '/home',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'home',
          meta:{
            title:'header.home',
          },
          component: () => import('@/view/home/home')
        },
      ]
    },
    // 六艺之礼
    {
      path: '/rites',
      name: 'rites',
      component: Main,
      meta:{
        title:'header.rites',
      },
      children: [
        // 六艺之礼 吉
        {
          path: 'rites-ji',
          name: 'rites-ji',
          meta:{
            title:'header.rites_ji',
          },
          component: () => import('@/view/rites/rites-ji')
        },
        // 六艺之礼 凶
        {
          path: 'rites-xie',
          name: 'rites-xie',
          meta:{
            title:'header.rites_xie',
          },
          component: () => import('@/view/rites/rites-xie')
        },
        // 六艺之礼 军
        {
          path: 'rites-army',
          name: 'rites-army',
          meta:{
            title:'header.rites_army',
          },
          component: () => import('@/view/rites/rites-army')
        },
        // 六艺之礼 宾
        {
          path: 'rites-guest',
          name: 'rites-guest',
          meta:{
            title:'header.rites_guest',
          },
          component: () => import('@/view/rites/rites-guest')
        },
        // 六艺之礼 嘉
        {
          path: 'rites-jia',
          name: 'rites-jia',
          meta:{
            title:'header.rites_jia',
          },
          component: () => import('@/view/rites/rites-jia')
        },
      ]
    },
    // 六艺之乐
    {
      path: '/home/music',
      name: 'music',
      component: Main,
      meta:{
        title:'header.music',
      },
      children: [
        // 六艺之乐 云门
        {
          path: '/home/music-yunmen',
          name: 'music-yunmen',
          meta:{
            title:'header.music_yunmen',
          },
          component: () => import('@/view/music/music-yunmen')
        },
        // 六艺之乐 大咸
        {
          path: '/home/music-daxian',
          name: 'music-daxian',
          meta:{
            title:'header.music_daxian',
          },
          component: () => import('@/view/music/music-daxian')
        },
        // 六艺之乐 大韶
        {
          path: '/home/music-dashao',
          name: 'music-dashao',
          meta:{
            title:'header.music_dashao',
          },
          component: () => import('@/view/music/music-dashao')
        },
        // 六艺之乐 大夏
        {
          path: '/home/music-daxia',
          name: 'music-daxia',
          meta:{
            title:'header.music_daxia',
          },
          component: () => import('@/view/music/music-daxia')
        },
        // 六艺之乐 大濩
        {
          path: '/home/music-dahao',
          name: 'music-dahao',
          meta:{
            title:'header.music_dahao',
          },
          component: () => import('@/view/music/music-dahao')
        },
        // 六艺之乐 大武
        {
          path: '/home/music-dawu',
          name: 'music-dawu',
          meta:{
            title:'header.music_dawu',
          },
          component: () => import('@/view/music/music-dawu')
        },
      ]
    },

    // 六艺之射
    {
      path: '/home/shooting',
      name: 'shooting',
      component: Main,
      meta:{
        title:'header.shooting',
      },
      children: [
        // 六艺之射 白矢
        {
          path: '/home/shooting-baiyao',
          name: 'shooting-baiyao',
          meta:{
            title:'header.shooting_baiyao',
          },
          component: () => import('@/view/shooting/shooting-baiyao')
        },
        // 六艺之射 参连
        {
          path: '/home/shooting-shenlian',
          name: 'shooting-shenlian',
          meta:{
            title:'header.shooting_shenlian',
          },
          component: () => import('@/view/shooting/shooting-shenlian')
        },
        // 六艺之射 剡注
        {
          path: '/home/shooting-injection',
          name: 'shooting-injection',
          meta:{
            title:'header.shooting_injection',
          },
          component: () => import('@/view/shooting/shooting-injection')
        },
        // 六艺之射 襄尺
        {
          path: '/home/shooting-taper',
          name: 'shooting-taper',
          meta:{
            title:'header.shooting_taper',
          },
          component: () => import('@/view/shooting/shooting-taper')
        },
        // 六艺之射 井仪
        {
          path: '/home/shooting-wellgauge',
          name: 'shooting-wellgauge',
          meta:{
            title:'header.shooting_wellgauge',
          },
          component: () => import('@/view/shooting/shooting-wellgauge')
        },
      ]
    },
    // 六艺之御
    {
      path: '/home/royal',
      name: 'royal',
      component: Main,
      meta:{
        title:'header.royal',
      },
      children: [
        // 六艺之御 鸣和鸾
        {
          path: '/home/royal-singingluan',
          name: 'royal-singingluan',
          meta:{
            title:'header.royal_singingluan',
          },
          component: () => import('@/view/royal/royal-singingluan')
        },
        // 六艺之御 逐水车
        {
          path: '/home/royal-waterwheel',
          name: 'royal-waterwheel',
          meta:{
            title:'header.royal_waterwheel',
          },
          component: () => import('@/view/royal/royal-waterwheel')
        },
        // 六艺之御 过君表
        {
          path: '/home/royal-guojunwatch',
          name: 'royal-guojunwatch',
          meta:{
            title:'header.royal_guojunwatch',
          },
          component: () => import('@/view/royal/royal-guojunwatch')
        },
        // 六艺之御 舞交衢
        {
          path: '/home/royal-dancing',
          name: 'royal-dancing',
          meta:{
            title:'header.royal_dancing',
          },
          component: () => import('@/view/royal/royal-dancing')
        },
        // 六艺之御 逐禽左
        {
          path: '/home/royal-chasingleft',
          name: 'royal-chasingleft',
          meta:{
            title:'header.royal_chasingleft',
          },
          component: () => import('@/view/royal/royal-chasingleft')
        },
      ]
    },
    // 六艺之书
    {
      path: '/home/books',
      name: 'books',
      component: Main,
      meta:{
        title:'header.books',
      },
      children: [
        // 六艺之书 象形
        {
          path: '/home/books-hieroglyphic',
          name: 'books-hieroglyphic',
          meta:{
            title:'header.books_hieroglyphic',
          },
          component: () => import('@/view/books/books-hieroglyphic')
        },
        // 六艺之书 指事
        {
          path: '/home/books-referential',
          name: 'books-referential',
          meta:{
            title:'header.books_referential',
          },
          component: () => import('@/view/books/books-referential')
        },
        // 六艺之书 会意
        {
          path: '/home/books-understanding',
          name: 'books-understanding',
          meta:{
            title:'header.books_understanding',
          },
          component: () => import('@/view/books/books-understanding')
        },
        // 六艺之书 形声
        {
          path: '/home/books-phonetic',
          name: 'books-phonetic',
          meta:{
            title:'header.books_phonetic',
          },
          component: () => import('@/view/books/books-phonetic')
        },
        // 六艺之书 转注
        {
          path: '/home/books',
          name: 'books-transliteration',
          meta:{
            title:'header.books_transliteration',
          },
          component: () => import('@/view/books/books-transliteration')
        },
        // 六艺之书 假借
        {
          path: '/home/books-borrowing',
          name: 'books-borrowing',
          meta:{
            title:'header.books_borrowing',
          },
          component: () => import('@/view/books/books-borrowing')
        },
      ]
    },
    // 六艺之数
    {
      path: '/home/numbers',
      name: 'numbers',
      component: Main,
      meta:{
        title:'header.numbers',
      },
      children: [
        // 六艺之数 计算
        {
          path: '/home/numbers-computation',
          name: 'numbers-computation',
          meta:{
            title:'header.numbers_computation',
          },
          component: () => import('@/view/numbers/numbers-computation')
        },
        // 六艺之数 数学
        {
          path: '/home/numbers-mathematics',
          name: 'numbers-mathematics',
          meta:{
            title:'header.numbers_mathematics',
          },
          component: () => import('@/view/numbers/numbers-mathematics')
        },
      ]
    },
    // Login页面
    {
      path: '/login',
      name: 'login',
      meta:{
        title:'header.rites_jia',
        hideInBread:true
      },
      component: () => import('@/view/login/index')
    },

  ]