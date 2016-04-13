var app = angular.module('app', ['ngRoute', 'ngSanitize']);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/presentacion.html',
        controller: 'principal'
    }).when('/sidebar', {
        templateUrl: 'views/sidebar.html',
        controller: 'sidebar'
    });

});

// Begin: controlador principal
app.controller('principal', function ($scope, $http, $rootScope) {
    $scope.mostrar_sub_categoria = function (idCategoria_pais) {
        for (var i = 0; i < $scope.categorias.length; i++) {
            if (idCategoria_pais == $scope.categorias[i].idCategoria_pais) {
                if ($scope.categorias[i].categoria_switch == 0) {
                    $scope.categorias[i].categoria_switch = 1;
                    $('.subcategoria_' + idCategoria_pais).show();
                } else {
                    $scope.categorias[i].categoria_switch = 0;
                    $('.subcategoria_' + idCategoria_pais).hide();
                }
            }
        }
    };
  

    $scope.listado_producto = function () {
        for (var i = 0; i < $scope.sub_categorias.length; i++) {
            var data = {
                idSub_categoria: $scope.sub_categorias[i].idSub_categoria

            };
            $http.post('server/producto/listado_producto.php', {'data': data}).success(
                    function (data) {

                        for (var j = 0; j < data.length; j++) {
                            var producto = {
                                class: 'cbp-item ',
                                href: 'images/productos/' + data[j].imgProducto,
                                imgProducto: 'images/productos/' + data[j].imgProducto,
                                titulo: data[j].descProducto
                            }
                            $scope.productos.push(producto);
                        }
                    });
        }
    };

    $scope.listado_subcategoria = function () {
        for (var i = 0; i < $scope.categorias.length; i++) {
            var data = {
                idCategoria_pais: $scope.categorias[i].idCategoria_pais
            };
            $http.post('server/subcategoria/listado_subcategoria.php', {'data': data}).success(
                    function (data) {
                        $scope.sub_categorias = [];
                        for (var j = 0; j < data.length; j++) {
                            var sub_categoria = {
                                idCategoria_pais: data[j].idCategoria_pais,
                                data_filter: '.' + data[j].nombreSub_categoria,
                                nombreSub_categoria: data[j].nombreSub_categoria,
                                class: 'cbp-filter-item',
                                categoria: data[j].nombreSub_categoria,
                                idSub_categoria: data[j].idSub_categoria
                            }
                            $scope.sub_categorias.push(sub_categoria);
                        }
                        $scope.listado_producto();
                    });
        }
    };

    $scope.seleccionar_pais = function (jnPais) {
        $scope.productos = [];
        $scope.jnPais = jnPais;
        var data = {
            idPais: $scope.jnPais.idPais
        };
        $http.post('server/categoria/listado_categoria.php', {'data': data}).success(
                function (data) {
                    $scope.categorias = [];
                    for (var i = 0; i < data.length; i++) {
                        var categoria = {
                            data_filter: '.' + data[i].nombreCategoria,
                            class: 'cbp-filter-item2',
                            categoria: data[i].nombreCategoria,
                            idCategoria_pais: data[i].idCategoria_pais,
                            categoria_switch: 0
                        }
                        $scope.categorias.push(categoria);
                    }
                    $scope.listado_subcategoria();
                })
    };



    $http.post('server/pais/listado_pais.php').success(
            function (data) {
                $scope.paises = data;
                $scope.seleccionar_pais($scope.paises[0]);
            });


    // Begin: Menu
    $scope.jnMenu = {
        item1: 'Inicio',
        item2: 'Nosotros',
        item3: 'Productos',
        item4: 'Servicios',
        item5: 'Precios',
        item6: 'Blog',
        item7: 'Contacto'
    };
    // End: Menu
    // Begin: Nosotros
    $scope.nosotros = {
        titulo: 'Asturias y Aragón mayorista especialista en juguetes',
        descripcion: '<h5><b>Juguetes didácticos y puzzles. Mas de 15 años llevando diversión y educación a los niños y familias  con productos de calidad, entretenidos y que ayudan al desarrollo de lo niños. </b><h5>',
        circulos: [
            {
                nombre: 'Ejemplo2',
                icono: 'images/asturias/logo-welly.png',
                delay_animation: 1000,
                descripcion: 'Ejemplo de descripcion2'
            },
            {
                nombre: 'Ejemplo2',
                icono: 'images/asturias/logo-disney1.png',
                delay_animation: 1000,
                descripcion: 'Ejemplo de descripcion2'
            },
            {
                nombre: 'Ejemplo2',
                icono: 'images/asturias/logo-marvel1.png',
                delay_animation: 1000,
                descripcion: 'Ejemplo de descripcion2'
            },
            {
                nombre: 'Ejemplo2',
                icono: 'images/asturias/logo1.png',
                delay_animation: 1000,
                descripcion: 'Ejemplo de descripcion2'
            }
        ]
    };
    // End: Nosotros
    // Begin: Portafolio
    $scope.portafolio = {
        titulo: 'Productos',
        descripcion: '<h5><b class="white">El especialista en juegos, juguetes didácticos y puzzles. Mas de 15 años llevando diversión y educación a los niños y familias  con productos de calidad, entretenidos y que ayudan al desarrollo de lo niños. </b><h5>',
        catalogo: 'Catálogo'
    }

    setTimeout(function () {
        (function ($) {
            "use strict";

            (function ($, window, document, undefined) {

                var gridContainer = $('#grid-container'),
                        filtersContainer = $('#filters-container');

                // init cubeportfolio
                gridContainer.cubeportfolio({
                    defaultFilter: '*',
                    animationType: 'fadeOutTop',
                    gapHorizontal: 0,
                    gapVertical: 0,
                    gridAdjustment: 'responsive',
                    caption: 'zoom',
                    displayType: 'lazyLoading',
                    displayTypeSpeed: 100,
                    // lightbox
                    lightboxDelegate: '.cbp-lightbox',
                    lightboxGallery: true,
                    lightboxTitleSrc: 'data-title',
                    lightboxShowCounter: true,
                    // singlePage popup
                    singlePageDelegate: '.cbp-singlePage',
                    singlePageDeeplinking: true,
                    singlePageStickyNavigation: true,
                    singlePageShowCounter: true,
                    singlePageCallback: function (url, element) {
                        // to update singlePage content use the following method: this.updateSinglePage(yourContent)
                    },
                    // singlePageInline
                    singlePageInlineDelegate: '.cbp-singlePageInline',
                    singlePageInlinePosition: 'above',
                    singlePageInlineShowCounter: true,
                    singlePageInlineInFocus: true,
                    singlePageInlineCallback: function (url, element) {
                        // to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
                    }
                });

                // add listener for filters click
                filtersContainer.on('click', '.cbp-filter-item', function (e) {

                    var me = $(this), wrap;

                    // get cubeportfolio data and check if is still animating (reposition) the items.
                    if (!$.data(gridContainer[0], 'cubeportfolio').isAnimating) {

                        if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
                            wrap = $('.cbp-l-filters-dropdownWrap');

                            wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');

                            wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());

                            me.addClass('cbp-filter-item-active');
                        } else {
                            me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
                        }

                    }

                    // filter the items
                    gridContainer.cubeportfolio('filter', me.data('filter'), function () {});

                });

                // activate counter for filters
                gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'));


                /* LOAD MORE START */
                var loadMoreObject = {
                    init: function () {

                        var t = this;

                        // the job inactive
                        t.isActive = false;

                        t.numberOfClicks = 0;

                        // cache link selector
                        t.loadMore = $('.cbp-l-loadMore-text-link');

                        // cache window selector
                        t.window = $(window);

                        // add events for scroll
                        t.addEvents();

                        // trigger method on init
                        t.getNewItems();

                    },
                    addEvents: function () {

                        var t = this;

                        t.window.on("scroll.loadMoreObject", function () {
                            // get new items on scroll
                            t.getNewItems();
                        });
                    },
                    getNewItems: function () {

                        var t = this, topLoadMore, topWindow, clicks;

                        if (t.isActive || t.loadMore.hasClass('cbp-l-loadMore-text-stop'))
                            return;

                        topLoadMore = t.loadMore.offset().top;
                        topWindow = t.window.scrollTop() + t.window.height();

                        if (topLoadMore > topWindow)
                            return;

                        // this job is now busy
                        t.isActive = true;

                        // increment number of clicks
                        t.numberOfClicks++;

                        // perform ajax request
                        $.ajax({
                            url: t.loadMore.attr('data-href'),
                            type: 'GET',
                            dataType: 'HTML',
                            cache: true
                        })
                                .done(function (result) {
                                    var items, itemsNext;

                                    // find current container
                                    items = $(result).filter(function () {
                                        return $(this).is('div' + '.cbp-loadMore-block' + t.numberOfClicks);
                                    });

                                    gridContainer.cubeportfolio('appendItems', items.html(),
                                            function () {

                                                // check if we have more works
                                                itemsNext = $(result).filter(function () {
                                                    return $(this).is('div' + '.cbp-loadMore-block' + (t.numberOfClicks + 1));
                                                });

                                                if (itemsNext.length === 0) {

                                                    t.loadMore.text('');
                                                    t.loadMore.addClass('cbp-l-loadMore-text-stop');

                                                    t.window.off("scroll.loadMoreObject");

                                                } else {
                                                    // make the job inactive
                                                    t.isActive = false;

                                                    topLoadMore = t.loadMore.offset().top;
                                                    topWindow = t.window.scrollTop() + t.window.height();

                                                    if (topLoadMore <= topWindow) {
                                                        t.getNewItems();
                                                    }
                                                }

                                            });

                                })
                                .fail(function () {
                                    // make the job inactive
                                    t.isActive = false;
                                });
                    }
                },
                loadMore = Object.create(loadMoreObject);

                // Cube Portfolio is an event emitter. You can bind listeners to events with the on and off methods. The supported events are: 'initComplete', 'filterComplete'

                // when the plugin is completed
                gridContainer.on('initComplete', function () {
                    loadMore.init();
                });

                // when the height of grid is changed
                gridContainer.on('filterComplete', function () {
                    loadMore.window.trigger('scroll.loadMoreObject');
                });


                /* LOAD MORE END */


            })(jQuery, window, document);


        })(jQuery);
    },
            1000);
    // End: Portafolio

    // Begin: Parallax
    $scope.parallax = {
        img1: 'imagenes/',
        img2: 'Nosotros'
    };
    // End: Menu


});
// End: controlador principal

