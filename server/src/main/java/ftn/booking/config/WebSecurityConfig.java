package ftn.booking.config;

import ftn.booking.auth.RestAuthenticationEntryPoint;
import ftn.booking.auth.TokenAuthenticationFilter;
import ftn.booking.service.impl.UserServiceImpl;
import ftn.booking.utils.TokenUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@AllArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private PasswordEncoder passwordEncoder;

    private UserServiceImpl userServiceImpl;

    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    private TokenUtils tokenUtils;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userServiceImpl).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint).and()
                .authorizeRequests()
                .antMatchers("/auth/login").permitAll()
                .antMatchers("/auth/signup").permitAll()
                .antMatchers("/auth/check-username/**").permitAll()
                .antMatchers("/auth/role").permitAll()
                .antMatchers("/boats/findAll").permitAll()
                .antMatchers("/boats/findOne/**").permitAll()
                .antMatchers("/instructors/findAll").permitAll()
                .antMatchers("/instructors/findOne/**").permitAll()
                .antMatchers("/cottages/findAll").permitAll()
                .antMatchers("/cottages/findOne/**").permitAll()
                .antMatchers("/boats/findFree/**").permitAll()
                .antMatchers("/reservations/findByPeriod/**").permitAll()
                .antMatchers("/users/unverified").permitAll()
                .antMatchers("/users/verified").permitAll()
                .antMatchers("/users/verify/**").permitAll()
                .antMatchers("/emails/send-mail-simplified/**").permitAll()
                .antMatchers("/instructors/add-adventure/**").permitAll()
                .antMatchers("/instructors/all-adventures/**").permitAll()
                .antMatchers("/uploads/add-adventure-picture/**").permitAll()
                .antMatchers("/uploads/get-adventure-pictures/**").permitAll()
                .antMatchers("/instructors/one-adventure/**").permitAll()
                .antMatchers("/instructors/findInstructorByUsername/**").permitAll()
                .antMatchers("/uploads/delete-adventure-picture/**").permitAll()
                .antMatchers("/instructors/change-one-adventure").permitAll()
                .antMatchers("/instructors/add-new-action/adventureId/**").permitAll()
                .antMatchers("/instructors/add-additional-services-adventure-reservation/**").permitAll()
                .antMatchers("/instructors/get-all-actions/adventureId/**").permitAll()
                .antMatchers("/instructors/get-all-additional-services/adventureReservationId/**").permitAll()
                .antMatchers("/instructors/delete-action-for-adventure/adventureReservationId/**").permitAll()
                .anyRequest().authenticated().and()
                .cors().and()
                .addFilterBefore(new TokenAuthenticationFilter(tokenUtils, userServiceImpl), BasicAuthenticationFilter.class);
        http.csrf().disable();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
