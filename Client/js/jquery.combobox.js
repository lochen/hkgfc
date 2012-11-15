
!function ($) {

  "use strict"; // jshint ;_;


 /* Selectbox CLASS DEFINITION
  * ====================== */

  var Selectbox = function (content, options) {
    this.options = options
    this.$element = $(content)
      .delegate('[data-dismiss="selectbox"]', 'click.dismiss.selectbox', $.proxy(this.hide, this))
  }

  Selectbox.prototype = {

      constructor: Selectbox

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        $('body').addClass('selectbox-open')

        this.isShown = true
		if(this.options.zIndex!=null){
			that.$element.css({'z-index':this.options.zIndex});
		}
        escape.call(this)
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        $('body').removeClass('selectbox-open')

        escape.call(this)

        this.$element.removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideSelectbox.call(this)
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideSelectbox.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideSelectbox.call(that)
    })
  }

  function hideSelectbox(that) {
    this.$element
      .hide()
      .trigger('hidden')
  }


  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.selectbox', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.selectbox')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.selectbox = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('selectbox')
        , options = $.extend({}, $.fn.selectbox.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('selectbox', (data = new Selectbox(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.selectbox.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
	, zIndex: null
  }

  $.fn.selectbox.Constructor = Selectbox


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.selectbox.data-api', '[data-toggle="selectbox"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('selectbox') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.selectbox(option)
    })
  })

}(window.jQuery);