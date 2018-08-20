module.exports = {
    base: '/beanstalkd-docs/',
    title: 'beanstalkd',
    description: 'Simple and fast general purpose work queue',
    serviceWorker: true,
    themeConfig: {
        repo: 'beanstalkd/beanstalkd',
        docsRepo: 'pmatseykanets/beanstalkd-docs',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: 'Help us improve this page!',
        sidebarDepth: 2,
        nav: [
            {
                text: 'Guide',
                link: '/guide/',
            },
            {
                text: 'Releases',
                link: 'https://github.com/beanstalkd/beanstalkd/releases/',
            },
        ],
        sidebar: {
            '/': [
                {
                    title: 'Guide',
                    collapsable: false,
                    children: prefix('guide', [
                        '',
                        'installation',
                        'configuration',
                    ]),
                },
                {
                    title: 'Resources',
                    collapsable: false,
                    children: prefix('resources', [
                        'libraries',
                        'tools',
                        'faq',
                    ]),
                },
                {
                    title: 'Internals',
                    collapsable: false,
                    children: prefix('protocol', [
                        '',
                    ]),
                },
            ],
        },
    },
}

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
