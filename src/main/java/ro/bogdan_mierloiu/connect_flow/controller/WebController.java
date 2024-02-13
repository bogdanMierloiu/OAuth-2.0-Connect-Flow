package ro.bogdan_mierloiu.connect_flow.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WebController {

    /**
     * This method is used to display the sign-in page.
     *
     * @return the sign-in page
     */
    @GetMapping
    public String signInPage() {
        return "sign-in";
    }

    @GetMapping("/authorized/**")
    public String authorizedPage(@RequestParam(name = "code", required = false) String code,
                                 @RequestParam(name = "scope", required = false) String scope,
                                 Model model) {
        model.addAttribute("code", code);
        model.addAttribute("scope", scope);
        return "authorized";
    }

    @GetMapping("/home")
    public String homePage(@CookieValue(name = "access_token", required = false) String accessToken, Model model) {
        model.addAttribute("access_token", accessToken);
        return "home";
    }
}
